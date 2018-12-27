import { combineReducers } from 'redux'
import userInfoReducer from './userInfoReducer'
import settingReducer from './settingReducer'
import userRelativeInfoReducer from './userRelativeInfoReducer'
import tabletReducer from './tabletReducer'

export default combineReducers({
  userInfoReducer,
  userRelativeInfoReducer,
  settingReducer,
  tabletReducer
})
