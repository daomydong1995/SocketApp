import {
  SYN_U_DATA,
  SUCSSES_EVENT,
  ERROR_EVENT,
  SHOW_LOADING,
  UPDATE_ACCES_RULES,
  UPDATE_SIGNATURE_EXIST,
  UPDATE_SOCKETS_ADDRESS,
  CONNECTION_STATUS,
  UPDATE_SIGNATURE,
  UPDATE_AVATAR,
  SYS_RLT_DATA,
  UPDATE_RLT_AVATAR,
  UPDATE_MOMMENT_SCREEN,
  UPDATE_PENDING_TRANSACTION,
  UPDATE_HISTORY_TRANSACTION,
  UPDATE_SOCKETS,
  UPDATE_CONTROL, UPDATE_VISIBLE_SIGNWRITING
} from './Constants'

// UserInfo
export const syncData = (props) => {
  return {
    type: SYN_U_DATA,
    payload: props
  }
}

export const updateAccessRules = (isAcces) => {
  return {
    type: UPDATE_ACCES_RULES,
    payload: isAcces
  }
}

export const updateSignatureExits = (isAcces) => {
  return {
    type: UPDATE_SIGNATURE_EXIST,
    payload: isAcces
  }
}
export const updateSignature = (image64) => {
  return {
    type: UPDATE_SIGNATURE,
    payload: image64
  }
}

export const updateAvatarBase64 = (image) => {
  return {
    type: UPDATE_AVATAR,
    payload: image
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
// RelativeUser
export const syncRltData = (props) => {
  return {
    type: SYS_RLT_DATA,
    payload: props
  }
}

export const updateAvatarRltBase64 = (image) => {
  return {
    type: UPDATE_RLT_AVATAR,
    payload: image
  }
}
// SettingAction
export const updateSocketsAddress = (socketAddress) => {
  return {
    type: UPDATE_SOCKETS_ADDRESS,
    payload: socketAddress
  }
}
export const updateSocketStatus = (connect) => {
  return {
    type: CONNECTION_STATUS,
    payload: connect
  }
}

export const updateVisibleSignWriting = (visibleSignWriting) => {
  return {
    type: UPDATE_VISIBLE_SIGNWRITING,
    payload: visibleSignWriting
  }
}

export const updateScreenApp = (connect) => {
  return {
    type: UPDATE_MOMMENT_SCREEN,
    payload: connect
  }
}

export const updateSocket = (socket) => {
  return {
    type: UPDATE_SOCKETS,
    payload: socket
  }
}

export const updateControl = (socket) => {
  return {
    type: UPDATE_CONTROL,
    payload: socket
  }
}

// Table

export const updatePendingTransaction = (connect) => {
  return {
    type: UPDATE_PENDING_TRANSACTION,
    payload: connect
  }
}
export const updateHistoryTransaction = (connect) => {
  return {
    type: UPDATE_HISTORY_TRANSACTION,
    payload: connect
  }
}
