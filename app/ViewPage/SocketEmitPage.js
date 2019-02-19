import { Component } from 'react'
import DefaultPreference from 'react-native-default-preference'
import {
  syncData,
  syncRltData, updateControl,
  updateHistoryTransaction, updateLoadingSpinner,
  updateMessageSocket,
  updatePendingTransaction,
  updateScreenApp,
  updateSocketsAddress,
  updateSocketStatus, updateVisibleSignWriting
} from '../reducer/action'
import { connect } from 'react-redux'
import { ActivityIndicator, Alert, Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import {
  formatDate,
  formatMoney,
  formatStatuses,
  formatTransactionSign, formatType
} from '../Common/helpers'
import { RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc'
import { Text } from 'react-native-elements'
import { INITIAL_STATE_RELATIVE_INFO, INITIAL_STATE_USER_INFO } from '../Common/constants'

type Props = {}
type State = {}

class SocketEmitPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    const {updateSocketStatus, updateSocketsAddress} = this.props
    this.onReceivedMessage = this.onReceivedMessage.bind(this)
    DefaultPreference.get('ListAddressConnected').then(function (value) {
      if (value === undefined || value === null) {
      } else {
        const list = JSON.parse(value)
        updateSocketsAddress(list)
      }
    })
    if (this.props.socket) {
      const socket = this.props.socket
      socket.on('connect', () => {
        this.props.updateLoadingSpinner(false)
        const object = {id: socket.id, hostname: socket.io.engine.hostname, port: socket.io.engine.port}
        updateSocketStatus(true)
        socket.emit('check_sockets_connected', (countIp) => {
          if (countIp.length > 2) {
            socket.disconnect()
          }
        })
        socket.on('web_wallet_emit', this.onReceivedMessage)
        socket.emit('init', {init: true})
        DefaultPreference.get('ListAddressConnected').then(function (value) {
          if (!value) {
            const firstList = [object]
            updateSocketsAddress(firstList)
            DefaultPreference.set('ListAddressConnected', JSON.stringify(firstList)).then(() => {console.log('doneFirst')})
          } else {
            const list = JSON.parse(value)
            const newList = list.filter(sk => sk.hostname !== object.hostname)
            newList.unshift(object)
            DefaultPreference.set('ListAddressConnected', JSON.stringify(newList)).then(() => {console.log('done')})
            updateSocketsAddress(newList)
          }
        })
        socket.on('open_sign_writing', (data) => {
          this.props.updateVisibleSignWriting(data)
        })
        const self = this
        socket.on('exchange', (data) => {
          self.exchange(data)
        })
        if (this.props.messageSocketStatus) {
          this.props.updateMessageSocket(false)
          setTimeout(() => {
            Alert.alert(
              'Thông báo',
              'Kết nối thành công',
              [
                {text: 'Ok', onPress: () => {}, style: 'cancel'},
              ],
              {cancelable: false}
            )
          }, 50)
        }
      })
      socket.on('disconnect', () => {
        updateSocketStatus(false)
      })
    }
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

  onReceivedMessage (state) {
    const {
      updateControl, updateScreenApp, syncData, syncRltData,
      updatePendingTransaction, updateHistoryTransaction, screen
    } = this.props
    if (state.control) {
      updateControl('none')
      setTimeout(() => {updateControl(state.control)}, 200)
    }
    if (state.screen) {
      if (screen !== state.screen) {
        updateScreenApp(state.screen)
      }
      updateHistoryTransaction([])
      updatePendingTransaction([])
    }
    if (state.userInfo) {
      const userInfo = {...INITIAL_STATE_USER_INFO, ...state.userInfo}
      syncData(userInfo)
    }
    if (state.rltInfo) {
      const rltInfo = {...INITIAL_STATE_RELATIVE_INFO, ...state.rltInfo}
      syncRltData(rltInfo)
    }
    if (state.pendingTransactions) {
      let pendingTransactions = state.pendingTransactions.map((data, index) => this.toPending(data, index))
      updatePendingTransaction(pendingTransactions)
    }
    if (state.historyTransactions) {
      let historyTransactions = state.historyTransactions.map((data, index) => this.toHistory(data, index))
      updateHistoryTransaction(historyTransactions)
    }
  }

  toHistory (data, index) {
    const sign = formatTransactionSign(this.props.userWalletId, data)
    return {
      stt: index + 1,
      created_at: formatDate(data.created_at),
      id: data.id,
      status: formatStatuses(data.status)[0],
      ref_id: data.ref_id,
      amount: `${sign}${formatMoney(data.amount)}`,
      memo: data.memo,
      type: formatType(data.type)
    }
  }

  toPending (data, index) {
    const sign = formatTransactionSign(this.props.userWalletId, data)
    return {
      stt: index + 1,
      created_at: formatDate(data.created_at),
      id: data.id,
      ref_id: data.ref_id,
      amount: `${sign}${formatMoney(data.amount)}`,
      memo: data.memo
    }
  }

  render () {
    return (
      <View>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.props.loadingSpinner}
          onRequestClose={() => {}}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.settingReducer.socket,
  screen: state.settingReducer.screen,
  loadingSpinner: state.settingReducer.loadingSpinner,
  messageSocketStatus: state.settingReducer.messageSocketStatus,
  userWalletId: state.userInfoReducer.userWalletId,
  peerConnection: state.settingReducer.peerConnection
})

export default connect(
  mapStateToProps, {
    syncData,
    syncRltData,
    updateSocketStatus,
    updateSocketsAddress,
    updateScreenApp,
    updatePendingTransaction,
    updateHistoryTransaction,
    updateControl,
    updateMessageSocket,
    updateVisibleSignWriting,
    updateLoadingSpinner
  }
)(SocketEmitPage)
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
