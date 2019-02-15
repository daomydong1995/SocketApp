import React, { Component } from 'react'
import { View} from 'react-native'
import { connect } from 'react-redux'
import InfoUserWalletPage from './InfoUserWalletPage'
import SignWalletPage from './SignWalletPage'
import SCREENS from '../ContanstPage/SCREENS'

type Props = {
}
type State = {}

class SelectPage extends Component<Props, State> {
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
        {
          this.props.screen === SCREENS.SIGN_WALLETS_SUBMIT
          && <SignWalletPage navigation={this.props.navigation}/>
        }
        {
          this.props.screen === SCREENS.USER_INFO_PAGE
          && <InfoUserWalletPage navigation={this.props.navigation}/>
        }


      </View>
    )
  }
}

const mapStateToProps = state => ({
  screen: state.settingReducer.screen
})

export default connect(
  mapStateToProps, {}
)(SelectPage)

const styles = {
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
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
