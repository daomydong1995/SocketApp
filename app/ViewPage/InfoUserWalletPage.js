import React, { Component } from 'react'
import { ScrollView, View, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SmartCartTable from './CustomView/SmartCardComponent/SmartCartTable'
import UserInfoComponent from './CustomView/UserInfo/UserInfoComponent'
import SmartCardLogoComponent from './CustomView/SmartCardComponent/SmartCardLogoComponent'

type Props = {
  navigation: any
}
type State = {}

class InfoUserWalletPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
  }

  onReceivedMessage (state) {
    this.props.syncData(state)
  }

  eventLeftHeader () {
    this.props.navigation.openDrawer()
  }

  render () {
    return (
      <View sytle={{flex: 1}}>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}/>
        <HeaderCustom title={'Thông tin SmartCard'}
                      leftView={(<Icon name='bars' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}/>
        <View style={styles.content}>
          <ScrollView style={{flex: 1}} horizontal={true}>
            <ScrollView style={{flex: 1, width: 1024, paddingBottom: 0}}
                        contentContainerStyle={{paddingBottom: 300}}>
              <UserInfoComponent/>
              <View style={{width: '100%', height: 1,backgroundColor: 'black', margin: 10}}/>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.infoSmartCard}>
                  <SmartCardLogoComponent userCode={this.props.userInfo.userCodeCard} userName={this.props.userInfo.userNameCard}/>
                  <View style={{height: '90%', width: 1, backgroundColor: '#000'}}/>
                  <View style={{ width: 406 * 0.8, height: 239 *0.8, justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Text style={styles.textTileStyle}>Số dư tài khoản</Text>
                    <View style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 32}}>{this.props.userInfo.userMoneyTotal}</Text><Text style={{color: '#b3b3b3', marginLeft: 10, marginBottom: 5}}>VNĐ</Text>
                    </View>
                  </View>
                </View>
              </View>
              <SmartCartTable/>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer,
  socket: state.settingReducer.socket
})

export default connect(
  mapStateToProps, {}
)(InfoUserWalletPage)

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
  textTileStyle: {
    fontSize: 20,
    margin: 20,

  },
  buttonStyle: {
    backgroundColor: '#ff3a44',
    width: '90%',
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  infoSmartCard: {
    padding: 10,
    paddingLeft:40,
    paddingRight: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}