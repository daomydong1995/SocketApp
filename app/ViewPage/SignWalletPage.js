import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import UserInfoComponent from './CustomView/UserInfo/UserInfoComponent'
import SmartCardSignComponent from './CustomView/SmartCardComponent/SmartCardSignComponent'
import { syncData, updateSocket, updateSocketStatus } from '../reducer/action'
import SmartCartTable from './CustomView/SmartCardComponent/SmartCartTable'
import SCREENSTITLE from '../ContanstPage/SCREENSTITLE'
import SCREENS from '../ContanstPage/SCREENS'
import DefaultPreference from 'react-native-default-preference'

type Props = {}
type State = {}

class SignWalletPage extends Component<Props, State> {
  SocketAddress () {
    this.id = ''
  }

  constructor (props: Props) {
    super(props)
    const {socket, updateSocketStatus} = this.props
    this.onReceivedMessage = this.onReceivedMessage.bind(this)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
    this.navigateScreenCamera = this.navigateScreenCamera.bind(this)
    socket.disconnect()
    socket.connect()
    socket.on('connect', () => {
      const object = {id: socket.id, hostname: socket.io.engine.hostname, port: socket.io.engine.port}
      updateSocketStatus(true)
      DefaultPreference.get('ListAddressConnected').then(function (value) {
        if (value === undefined) {
          const firstList = [object]
        } else {
          const  list = JSON.parse(value)
          const va = list.some(sk => sk.hostname === socket.io.engine.hostname)
          if (!va) {
            list.push(object)
            console.log(list)
            DefaultPreference.set('ListAddressConnected',JSON.stringify(list)).then(function () {console.log('done')})
          }
        }
      })

      socket.on('sign_wallet', this.onReceivedMessage)
      socket.emit('init', {init: true})
    })
    socket.on('disconnect', () => {
      updateSocketStatus(false)
    })
  }

  navigateScreenCamera () {
    this.props.navigation.navigate(SCREENS.SIGNSUBMIT_PAGE)
  }

  onReceivedMessage (state) {
    this.props.syncData(state)
  }

  eventLeftHeader () {
    this.props.navigation.openDrawer()
  }

  render () {
    const {height, width} = Dimensions.get('window')
    return (
      <View sytle={{flex: 1}}>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}/>
        <HeaderCustom title={SCREENSTITLE[this.props.navigation.state.routeName]}
                      leftView={(<Icon name='bars' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}/>
        <View style={styles.content}>
          <ScrollView style={{flex: 1}} horizontal={true}>
            <ScrollView style={{flex: 1, width: 1024, paddingBottom: 0}}
                        contentContainerStyle={{paddingBottom: 300}}>
              <UserInfoComponent/>
              <SmartCardSignComponent navigate={this.navigateScreenCamera}/>
              <SmartCartTable/>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.userInfoReducer.loading,
  socket: state.settingReducer.socket
})

export default connect(
  mapStateToProps, {
    syncData,
    updateSocket,
    updateSocketStatus
  }
)(SignWalletPage)

const styles = {
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f6f6f6',
    justifyContent: 'center'
  },
  itemStyle: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    width: '80%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  buttonStyle: {
    backgroundColor: '#ff3a44',
    width: '80%',
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
}
