import { Component } from 'react'
import DefaultPreference from 'react-native-default-preference'
import {
  syncData,
  syncRltData, updateControl, updateHistoryTransaction, updateLoadingSpinner, updateMessageSocket,
  updatePendingTransaction,
  updateScreenApp,
  updateSocketsAddress,
  updateSocketStatus
} from '../reducer/action'
import { connect } from 'react-redux'
import { ActivityIndicator, Alert, Modal, StyleSheet, View } from 'react-native'
import React from 'react'

type Props = {}
type State = {}

class SocketEmitPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    const {socket, updateSocketStatus, updateSocketsAddress} = this.props
    this.onReceivedMessage = this.onReceivedMessage.bind(this)
    socket.disconnect()
    socket.connect()
    DefaultPreference.get('ListAddressConnected').then(function (value) {
      if (value === undefined || value === null) {
      } else {
        const list = JSON.parse(value)
        updateSocketsAddress(list)
      }
    })
    socket.on('connect', () => {
      const object = {id: socket.id, hostname: socket.io.engine.hostname, port: socket.io.engine.port}
      updateSocketStatus(true)
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
      if (this.props.messageSocketStatus) {
        this.props.updateMessageSocket(false)
        Alert.alert(
          'Thông báo',
          `Kết nối thành công`,
          [
            {text: 'Ok', onPress: () => {}, style: 'cancel'},
          ],
          {cancelable: false}
        )
      }
    })
    socket.on('disconnect', () => {
      updateSocketStatus(false)
    })
  }

  onReceivedMessage (state) {
    const {updateControl, updateScreenApp, syncData, syncRltData,
      updatePendingTransaction, updateHistoryTransaction,updateLoadingSpinner} = this.props
    if (state.control) {
      // updateLoadingSpinner(true)
      updateControl(state.control)
    }
    if (state.screen) {
      updateScreenApp(state.screen)
      updateLoadingSpinner(false)
    }
    if (state.userInfo) {
      syncData(state.userInfo)
    }
    if (state.rltInfo) {
      syncRltData(state.rltInfo)
    }
    if (state.pendingTransactions) {
      updatePendingTransaction(state.pendingTransactions)
    }
    if (state.historyTransactions) {
      updateHistoryTransaction(state.historyTransactions)
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
  loadingSpinner: state.settingReducer.loadingSpinner,
  messageSocketStatus: state.settingReducer.messageSocketStatus
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
    updateLoadingSpinner,
    updateMessageSocket
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
