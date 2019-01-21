import { Component } from 'react'
import DefaultPreference from 'react-native-default-preference'
import {
  syncData,
  syncRltData, updateControl, updateHistoryTransaction,
  updatePendingTransaction,
  updateScreenApp,
  updateSocketsAddress,
  updateSocketStatus
} from '../reducer/action'
import { connect } from 'react-redux'
import { View } from 'react-native'
import React from 'react'
import SCREENS from '../ContanstPage/SCREENS'

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
      socket.on('connect_timeout', (timeout) => {
        console.log('connect_timeout', timeout)
      })
      socket.on('error', (error) => {
        console.log('error', error)
      })
      socket.on('connect_error', (error) => {
        console.log('connect_error', error)
      })
      socket.on('disconnect', () => {
        updateSocketStatus(false)
      })
    })
  }

  onReceivedMessage (state) {
    if (state.control) {
      this.props.updateControl(state.control)
    }
    if (state.screen) {
      this.props.updateScreenApp(state.screen)
    }
    if (state.userInfo) {
      this.props.syncData(state.userInfo)
    }
    if (state.rltInfo) {
      this.props.syncRltData(state.rltInfo)
    }
    if (state.pendingTransactions) {
      this.props.updatePendingTransaction(state.pendingTransactions)
    }
    if (state.historyTransactions) {
      this.props.updateHistoryTransaction(state.historyTransactions)
    }
  }

  render () {
    return (<View/>)
  }
}

const mapStateToProps = state => ({
  socket: state.settingReducer.socket
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
    updateControl
  }
)(SocketEmitPage)
