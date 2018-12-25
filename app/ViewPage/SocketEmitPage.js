import { Component } from 'react'
import DefaultPreference from 'react-native-default-preference'
import { syncData, syncRltData, updateSocketsAddress, updateSocketStatus } from '../reducer/action'
import { connect } from 'react-redux'
import { View } from 'react-native'
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
        if (value === undefined || value === null) {
          const firstList = [object]
          updateSocketsAddress(firstList)
          DefaultPreference.set('ListAddressConnected', JSON.stringify(firstList)).then(function () {console.log('doneFirst')})
        } else {
          const list = JSON.parse(value)
          const va = list.some(sk => sk.hostname === object.hostname)
          if (!va) {
            list.push(object)
            DefaultPreference.set('ListAddressConnected', JSON.stringify(list)).then(function () {console.log('done')})
          }
          updateSocketsAddress(list)
        }
      })
    })
    socket.on('disconnect', () => {
      updateSocketStatus(false)
    })
  }

  onReceivedMessage (state) {
    if (state.screen === 'SIGN_WALLET_USER_INFO' && (state.userInfo !== null || state.userInfo !== undefined)) {
      this.props.syncData(state.userInfo)
    }
    if (state.screen === 'SIGN_WALLET_RLT_INFO' && (state.rltInfo !== null || state.rltInfo !== undefined)) {
      this.props.syncRltData(state.rltInfo)
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
    updateSocketsAddress
  }
)(SocketEmitPage)
