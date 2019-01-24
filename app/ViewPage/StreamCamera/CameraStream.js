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
import { updateLoadingSpinner } from '../../reducer/action'
const configuration = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]}

const pcPeers = {}
let localStream

function logError (error) {
  console.log('logError', error)
}

function getStats () {
  const pc = pcPeers[Object.keys(pcPeers)[0]]
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0]
    pc.getStats(track, function (report) {
    }, logError)
  }
}

type Props = {}
type State = {}

function getLocalStream (isFront, callback) {
  let videoSourceId
  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i]
        if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
          videoSourceId = sourceInfo.id
        }
      }
    })
  }
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
    callback(stream)
  }, logError)
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
    this.exchange = this.exchange.bind(this)
  }

  componentDidMount () {
    let self = this
    const {updateLoadingSpinner} = this.props
    if (this.props.socket.connected) {
      self.props.socket.on('exchange', function (data) {
        self.exchange(data)
      })
      getLocalStream(self.state.isFront, (stream) => {
        self.setState({selfViewSrc: stream.toURL()})
        self.props.socket.emit('join', self.state.roomID, (socketIds) => {
          socketIds.forEach((socketId) => {
            localStream = stream
            self.joinPC(socketId, stream)
          })
        })
      })
    }
  }

  componentWillUnmount () {
    this.props.socket.emit('leave', this.props.socket.io.engine.id)
    if (localStream !== undefined) {
      localStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  exchange (data) {
    const fromId = data.from
    let pc = pcPeers[fromId]
    if (data.sdp) {
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
        if (pc.remoteDescription.type === 'offer') {
          pc.createAnswer(function (desc) {
            pc.setLocalDescription(desc, function () {
              this.props.socket.emit('exchange', {'toIp: -exchange': fromId, 'sdp': pc.localDescription})
            }, logError)
          }, logError)
        }
      }, logError)
    } else {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }

  joinPC (socketId, stream) {
    let self = this
    const pc = new RTCPeerConnection(configuration)
    pcPeers[socketId] = pc
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        self.props.socket.emit('exchange', {'toIp': socketId, 'candidate': event.candidate})
      }
    }
    pc.onnegotiationneeded = function () {
      pc.createOffer(function (desc) {
        pc.setLocalDescription(desc, function () {
          self.props.socket.emit('exchange', {'toIp': socketId, 'sdp': pc.localDescription})
        }, logError)
      }, logError)
    }
    pc.oniceconnectionstatechange = function (event) {
      if (event.target.iceConnectionState === 'completed') {
        setTimeout(() => {
          getStats()
        }, 1000)
      }
      if (event.target.iceConnectionState === 'connected') {
        if (pc.textDataChannel) {
          return
        }
        const dataChannel = pc.createDataChannel('text')

        dataChannel.onerror = function (error) {
        }

        dataChannel.onmessage = function (event) {
          // self.receiveTextData({user: socketId, message: event.data})
        }

        dataChannel.onopen = function () {
          self.setState({textRoomConnected: true})
        }

        dataChannel.onclose = function () {
        }

        pc.textDataChannel = dataChannel
      }
    }
    pc.onsignalingstatechange = function (event) {
    }

    pc.onaddstream = function (event) {
      self.setState({info: 'One peer join!'})
      const remoteList = self.state.remoteList
      remoteList[socketId] = event.stream.toURL()
      self.setState({remoteList: remoteList})
    }
    pc.onremovestream = function (event) {
    }
    pc.addStream(stream)
    return pc
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
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
    updateLoadingSpinner
  }
)(CameraStream)
