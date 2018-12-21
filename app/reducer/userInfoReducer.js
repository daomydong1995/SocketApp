import {
  SYN_U_DATA, SUCSSES_EVENT, ERROR_EVENT, SHOW_LOADING, UPDATE_ACCES_RULES,
  UPDATE_SIGNATURE_EXIST, UPDATE_SIGNATURE, UPDATE_AVATAR
} from './action/Constants'

const INITIAL_STATE = {
  userID: '',
  userName: '',
  userGender: false,
  userAddress: '',
  userDistrict: '',
  userNation: '',
  userCMT: '',
  walletId: '',
  userBirth: '01/01/2010',
  userJob: '',
  userWards: '',
  userCountry: '',
  userIssuedDay: '01/01/2005',
  userPhone: '',
  userProvince: '',
  userBHY: '',
  userIssuedPlace: '',
  isAccessRules: false,
  existSignature: false,
  signatureBase64: '',
  imageAvatarBase64: ''
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYN_U_DATA:
      return { ...state, ...action.payload }
    case SUCSSES_EVENT:
      return { ...state, loading: false }
    case ERROR_EVENT:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      }
    case SHOW_LOADING:
      return { ...state, loading: action.payload }
    case UPDATE_ACCES_RULES:
      return { ...state, isAccessRules: action.payload }
    case UPDATE_SIGNATURE_EXIST:
      return { ...state, existSignature: action.payload }
    case UPDATE_SIGNATURE:
      return { ...state, signatureBase64: action.payload }
    case UPDATE_AVATAR:
      return { ...state, imageAvatarBase64: action.payload }
    default:
      return state
  }
}
