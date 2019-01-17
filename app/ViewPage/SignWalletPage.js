import React, { Component } from 'react'
import { ScrollView, View, Modal, Text,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import UserSignComponent from './CustomView/UserInfo/UserSignComponent'
import SmartCardSignComponent from './CustomView/SmartCardComponent/SmartCardSignComponent'
import UserRelativeSignComponent from './CustomView/UserInfo/UserRelativeSignComponent'

type Props = {
  navigation: any
}
type State = {

}

class SignWalletPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
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
        <HeaderCustom title={'Đăng ký SmartCard'}
                      leftView={(<Icon name='bars' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}/>
        <View style={styles.content}>
          <ScrollView style={{flex: 1}} horizontal={true}
                      bounces={false}>
            <ScrollView style={{flex: 1, width: 1024, paddingBottom: 0}}
                        contentContainerStyle={{paddingBottom: 300}}
                        bounces={false}>
              <UserSignComponent/>
              <View style={{width: '100%', height: 1, backgroundColor: '#000'}}/>
              <UserRelativeSignComponent/>
              <View style={{width: '100%', height: 1, backgroundColor: '#000'}}/>
              <SmartCardSignComponent/>
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
  mapStateToProps, {}
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
