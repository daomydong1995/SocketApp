import {
  SYN_DATA,
  SUCSSES_EVENT,
  ERROR_EVENT,
  SHOW_LOADING,
  UPDATE_ACCES_RULES,
  UPDATE_SIGNATURE,
  UPDATE_IP, UPDATE_SOCKET, CONNECTION_STATUS
} from './Constants'

// UserInfo
export const syncData = (props) => {
  return {
    type: SYN_DATA,
    payload: props
  }
}

export const updateAccessRules = (isAcces) => {
  return {
    type: UPDATE_ACCES_RULES,
    payload: isAcces
  }
}

export const updateSignature = (isAcces) => {
  return {
    type: UPDATE_SIGNATURE,
    payload: isAcces
  }
}

export const syncSuccess = () => {
  const token = 5
  return {
    type: SUCSSES_EVENT,
    payload: token
  }
}

export const syncError = () => {
  const token = 5
  return {
    type: ERROR_EVENT,
    payload: token
  }
}

export const showLoading = (isShow) => {
  return {
    type: SHOW_LOADING,
    payload: isShow
  }
}

// SettingAction
export const updateSocket = (socket) => {
  return {
    type: UPDATE_SOCKET,
    payload: socket
  }
}
export const updateSocketStatus = (connect) => {
  return {
    type: CONNECTION_STATUS,
    payload: connect
  }
}
