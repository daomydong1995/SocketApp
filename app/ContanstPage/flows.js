import {
  createAppContainer, createDrawerNavigator,
  createStackNavigator
} from 'react-navigation'
import SignWalletPage from '../ViewPage/SignWalletPage'
import SCREENS from './SCREENS'
import SettingPage from '../ViewPage/SettingPage'
import CustomDrawerMenu from '../ViewPage/CustomView/CustomDrawersComponent'
import React from 'react'
import SCREENSTITLE from './SCREENSTITLE'
import TakePhotoPage from '../ViewPage/TakePhotoPage'
import InfoUserWalletPage from '../ViewPage/InfoUserWalletPage'
import SelectPage from '../ViewPage/SelectPage'
const DashboardFlow = createStackNavigator({
  [SCREENS.SELECT_SCREEN_PAGE]: { screen: SelectPage, navigationOptions: () => ({ title: '' }) },
  [SCREENS.TAKE_PHOTO_PAGE]: { screen: TakePhotoPage, navigationOptions: () => ({ title: SCREENSTITLE.TAKE_PHOTO_PAGE }) }
},
{
  headerMode: 'none'
})
const DrawerMenu = createDrawerNavigator({
  [SCREENS.DASHBOARD_STACK]: { screen: DashboardFlow, navigationOptions: () => ({ title: SCREENSTITLE.DASHBOARD_STACK }) },
  [SCREENS.SETTING_PAGE]: { screen: SettingPage, navigationOptions: () => ({ title: SCREENSTITLE.SETTING_PAGE }) }
}, {
  contentComponent: CustomDrawerMenu,
  contentOptions: {
    activeTintColor: '#ffdc6a'
  }
})
export default createAppContainer(DrawerMenu)
