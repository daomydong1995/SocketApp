'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Platform, Alert
} from 'react-native'

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices
} from 'react-native-webrtc'
import connect from 'react-redux/es/connect/connect'
import {
  updateAvatarBase64,
  updateAvatarRltBase64, updateControl, updateLoadingSpinner,
  updatePeerConnection
} from '../../reducer/action'
import ViewShot from 'react-native-view-shot'
import { createFormData, timeout } from '../../Common/helpers'
import { UPLOAD_IMAGE } from '../../Common/ApiConstants'

const RNFS = require('react-native-fs')

const configuration = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]}

let localStream

function logError (error, location) {
  console.log('logError  : ' + location, error)
}

function getStats (pc) {
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0]
    pc.getStats(track,
      function (report) {
      },
      (error) => logError(error, 'getStats')
    )
  }
}

type Props = {}
type State = {
  viewShot: Object
}

function getLocalStream (isFront, callback) {
  let videoSourceId
  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  mediaDevices.enumerateDevices().then(sourceInfos => {
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if(sourceInfo.kind === "video" && sourceInfo.facing === (isFront ? "front" : "back")) {
        videoSourceId = sourceInfo.id;
      }
    }
    mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          width: {min: 1024, ideal: 1280, max: 1920},
          height: {min: 776, ideal: 720, max: 1080},
          minFrameRate: 30
        },
        facingMode: (isFront ? 'user' : 'environment'),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
      }
    }).then(stream => {
      stream.stop = () => {
        stream.getTracks().forEach((track) => {
          track.stop()
          stream.removeTrack(track)
        })
        stream.getAudioTracks().forEach(function (track) {
          track.stop()
          stream.removeTrack(track)
        })
        stream.getVideoTracks().forEach(function (track) {
          track.stop()
          stream.removeTrack(track)
        })
        stream.release()
      }
      callback(stream)
      }).catch(error => {
        console.log(error)
      });
  });


}

class CameraStream extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      roomID: 'default',
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      textRoomConnected: false,
      textRoomData: [],
      textRoomValue: '',
      viewShot: null
    }
  }

  componentDidMount () {
    this.setState({
      viewShot: this.refs.viewShot
    })
    let self = this

    if (this.props.socket.connected) {
      this.props.socket.on('take_picture', (msg) => {
        if (self.state.viewShot) {
          self.state.viewShot.capture().then((uri) => {
            self.props.updateLoadingSpinner(true)
            timeout(10000,
              fetch(UPLOAD_IMAGE, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: createFormData(uri)
              }).then(response => {
                self.props.updateLoadingSpinner(false)
                return response.json()
              }).then(response => {
                  console.log(response)
                  if (response.status && response.status === 'success') {
                    let resUri = response.data.uri
                    if (msg === 'USER_AVATAR') {
                      self.props.updateAvatarBase64(resUri)
                    } else if (msg === 'RELATIVE_USER_AVATAR') {
                      self.props.updateAvatarRltBase64(resUri)
                    }
                    self.props.socket.emit('web_wallet_on', {type: msg, data: response.data}, () => {
                    })
                  } else {
                    self.props.socket.emit('web_wallet_on', {type: 'Error', message: response}, () => {
                    })
                  }
                  RNFS.exists(uri).then((result) => {
                    if (result) {
                      return RNFS.unlink(uri)
                    }
                  })
                })).catch((error) => {
              self.props.updateLoadingSpinner(false)
              setTimeout(() => {
                Alert.alert(
                  'Thông báo',
                  error.toLocaleString(),
                  [
                    {text: 'Ok', onPress: () => {}, style: 'cancel'},
                  ],
                  {cancelable: false}
                )
              }, 100)
            }).finally(() => {
              self.props.updateControl('none')
            })

          })
        }
      })
    }
    getLocalStream(this.state.isFront, (stream) => {
      this.setState({selfViewSrc: stream.toURL()})
      this.props.socket.emit('join', this.state.roomID, (socketIds) => {
        socketIds.forEach((socketId) => {
          localStream = stream
          self.joinOnPc(socketId, stream)
        })
      })
    })
  }

  componentWillUnmount () {
    if (localStream) {
      localStream.stop()
    }
    if (this.props.peerConnection) {
      this.props.peerConnection.close()
      this.props.updatePeerConnection(null)
    }
    this.props.socket.emit('leave', this.props.socket.io.engine.id)
  }

  joinOnPc (socketId, stream) {
    let self = this
    if (this.props.peerConnection) {
      return this.props.peerConnection
    } else {
      const peerConnection = new RTCPeerConnection(configuration)
      peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
          self.props.socket.emit('exchange', {'toIp': socketId, 'candidate': event.candidate})
        }
      }

      // noinspection JSAnnotator
      function createOffer () {
        peerConnection.createOffer().then(function (desc) {
          peerConnection.setLocalDescription(desc).then( () => {
            self.props.socket.emit('exchange', {'toIp': socketId, 'sdp': peerConnection.localDescription})
          }, (error) => logError(error, 'createOffer0'))
        }, (error) => logError(error, 'createOffer1'))
      }

      peerConnection.onnegotiationneeded = function () {
        createOffer()
      }

      peerConnection.oniceconnectionstatechange = function (event) {
        if (event.target.iceConnectionState === 'completed') {
          setTimeout(() => {
            getStats(peerConnection)
          }, 500)
        }
        if (event.target.iceConnectionState === 'connected') {
          createDataChannel()
        }
      }
      peerConnection.onsignalingstatechange = function (event) {
      }

      peerConnection.onremovestream = function (event) {
      }

      // noinspection JSAnnotator
      function createDataChannel () {
        if (peerConnection.textDataChannel) {
          return
        }
        const dataChannel = peerConnection.createDataChannel('text')

        dataChannel.onerror = function (error) {
        }

        dataChannel.onmessage = function (event) {
        }

        dataChannel.onopen = function () {
        }

        dataChannel.onclose = function () {
        }

        peerConnection.textDataChannel = dataChannel
      }

      peerConnection.addStream(stream)
      this.props.updatePeerConnection(peerConnection)
      return peerConnection
    }
  }

  render () {
    return (
      <ViewShot ref="viewShot" options={{format: 'png', quality: 1.0}}>
        <RTCView mirror={true} streamURL={this.state.selfViewSrc} style={styles.selfView}/>
      </ViewShot>
    )
  }
}

const styles = StyleSheet.create({
  selfView: {
    width: '100%',
    height: '100%'
  },
  remoteView: {
    width: 200,
    height: 150
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  listViewContainer: {
    height: 150
  }
})

const mapStateToProps = state => ({
  socket: state.settingReducer.socket,
  peerConnection: state.settingReducer.peerConnection,
  baseUrl : state.settingReducer.baseUrl
})
export default connect(
  mapStateToProps, {
    updateLoadingSpinner,
    updatePeerConnection,
    updateAvatarBase64,
    updateAvatarRltBase64,
    updateControl
  }
)(CameraStream)
