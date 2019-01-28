'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Platform
} from 'react-native'

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia
} from 'react-native-webrtc'
import connect from 'react-redux/es/connect/connect'
import { updateLoadingSpinner, updatePeerConnection } from '../../reducer/action'

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
type State = {}

function getLocalStream (isFront, callback) {
  let videoSourceId
  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  console.log('getLocalStream')
  MediaStreamTrack.getSources(sourceInfos => {
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i]
      if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
        videoSourceId = sourceInfo.id
        console.log('sourceInfos')
      }
    }
  })

  getUserMedia({
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
  }, function (stream) {
    console.log('getUserMedia')
    stream.stop = () => {
      stream.getTracks().forEach((track) => {
        console.log('getTracks.stop()')
        track.stop()
        stream.removeTrack(track)
      })
      stream.getAudioTracks().forEach(function (track) {
        console.log('getAudioTracks.stop()')
        track.stop()
        stream.removeTrack(track)
      })
      stream.getVideoTracks().forEach(function (track) {
        console.log('getVideoTracks.stop()')
        track.stop()
        stream.removeTrack(track)
      })
      stream.release();
    }
    callback(stream)
  }, (error) => logError(error, 'getUserMedia'))
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
      textRoomValue: ''
    }
  }



  componentDidMount () {
    let self = this
    if (this.props.socket.connected) {
      self.props.socket.on('exchange', function (data) {
        self.exchange(data)
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

  exchange (data) {
    const fromId = data.from
    if (this.props.peerConnection) {
      let pc = this.props.peerConnection
      if (data.sdp) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
          if (pc.remoteDescription.type === 'offer') {
            pc.createAnswer(function (desc) {
              pc.setLocalDescription(desc, function () {
                this.props.socket.emit('exchange', {'toIp: -exchange': fromId, 'sdp': pc.localDescription})
              }, (error) => logError(error, 'setRemoteDescription0'))
            }, (error) => logError(error, 'setRemoteDescription1'))
          }
        }, (error) => logError(error, 'setRemoteDescription2'))
      } else {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
    }

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
        peerConnection.createOffer(function (desc) {
          peerConnection.setLocalDescription(desc, function () {
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
      <RTCView mirror={true} streamURL={this.state.selfViewSrc} style={styles.selfView}/>
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
  peerConnection: state.settingReducer.peerConnection
})
export default connect(
  mapStateToProps, {
    updateLoadingSpinner,
    updatePeerConnection
  }
)(CameraStream)
