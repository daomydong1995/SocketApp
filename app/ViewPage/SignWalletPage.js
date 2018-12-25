import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import UserInfoComponent from './CustomView/UserInfo/UserInfoComponent'
import SmartCardSignComponent from './CustomView/SmartCardComponent/SmartCardSignComponent'
import SmartCartTable from './CustomView/SmartCardComponent/SmartCartTable'
import SCREENSTITLE from '../ContanstPage/SCREENSTITLE'
import SCREENS from '../ContanstPage/SCREENS'
import UserRelativeInfoComponent from './CustomView/UserInfo/UserRelativeInfoComponent'

type Props = {}
type State = {}

class SignWalletPage extends Component<Props, State> {
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
        <HeaderCustom title={SCREENSTITLE[this.props.navigation.state.routeName]}
                      leftView={(<Icon name='bars' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}/>
        <View style={styles.content}>
          <ScrollView style={{flex: 1}} horizontal={true}>
            <ScrollView style={{flex: 1, width: 1024, paddingBottom: 0}}
                        contentContainerStyle={{paddingBottom: 300}}>
              <UserInfoComponent/>
              <View style={{width: '100%', height: 1, backgroundColor: '#000', margin: 10}}/>
              <UserRelativeInfoComponent/>
              <SmartCardSignComponent navigate={this.props.navigation.navigate}/>
              {/*<SmartCartTable/>*/}
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
