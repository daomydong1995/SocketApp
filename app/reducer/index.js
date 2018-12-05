import { combineReducers } from 'redux'
import userInfoReducer from './userInfoReducer'
import settingReducer from './settingReducer'

export default combineReducers({
  userInfoReducer,
  settingReducer
})
