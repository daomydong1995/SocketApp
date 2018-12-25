import {
  SYS_RLT_DATA, UPDATE_RLT_AVATAR
} from './action/Constants'

const INITIAL_STATE = {
  rltName: '',
  rltInfo: '',
  rltEmail: '',
  rltPhone: '',
  rltCMT: '',
  rltCMTDay: '01/01/2005',
  rltCMTPlace: '',
  rltPassport: '',
  rltPassportDate: '01/01/2005',
  rltPassportPlace: '',
  rltAddress: '',
  imageRltAvatarBase64: ''
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYS_RLT_DATA:
      return { ...state, ...action.payload }
    case UPDATE_RLT_AVATAR:
      return { ...state, imageRltAvatarBase64: action.payload }
    default:
      return state
  }
}
