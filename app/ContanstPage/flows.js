import {
  createAppContainer, createDrawerNavigator,
  createStackNavigator
} from 'react-navigation'
import SCREENS from './SCREENS'
import SettingPage from '../ViewPage/SettingPage'
import CustomDrawerMenu from '../ViewPage/CustomView/CustomDrawersComponent'
import React from 'react'
import SCREENSTITLE from './SCREENSTITLE'
import TakeQRCodePage from '../ViewPage/TakeQRCodePage'
import SelectPage from '../ViewPage/SelectPage'

const SettingFlow = createStackNavigator({
  [SCREENS.SETTING_PAGE]: { screen: SettingPage, navigationOptions: () => ({ title: SCREENSTITLE.SETTING_PAGE }) },
  [SCREENS.TAKE_QR_CODE_PAGE]: { screen: TakeQRCodePage, navigationOptions: () => ({ title: SCREENSTITLE.TAKE_QR_CODE_PAGE }) }
},
{
  headerMode: 'none'
})
const DrawerMenu = createDrawerNavigator({
  [SCREENS.SELECT_SCREEN_PAGE]: { screen: SelectPage, navigationOptions: () => ({ title: 'Trang chủ' }) },
  [SCREENS.SETTING_STACK]: { screen: SettingFlow, navigationOptions: () => ({ title: SCREENSTITLE.SETTING_STACK }) }
}, {
  contentComponent: CustomDrawerMenu,
  contentOptions: {
    activeTintColor: '#6589db'
  }
})
export default createAppContainer(DrawerMenu)
