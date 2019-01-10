import {
  SYN_U_DATA, SUCSSES_EVENT, ERROR_EVENT, SHOW_LOADING, UPDATE_ACCES_RULES,
  UPDATE_SIGNATURE_EXIST, UPDATE_SIGNATURE, UPDATE_AVATAR
} from './action/Constants'

const INITIAL_STATE = {
  userName: '',
  userBirth: '',
  userOld: '',
  //
  userGender: false,
  userJob: '',
  //
  userEmail: '',
  userPhone: '',
  //
  userCMT: '',
  userCMTDay: '',
  userCMTPlace: '',
  //
  userPassport: '',
  userPassportDate: '',
  userPassportPlace: '',
  //
  userCountry: '',
  userNation: '',
  userTBH: '',
  //
  userAddress: '',
  //
  userDistrict: '',
  userWards: '',
  userProvince: '',
  //
  userId: '',
  userWalletId: '',
  userCardId: '',
  userHospital: '',
  userMoneyTotal: '0',
  userNameCard: 'Dao my dong',
  userCodeCard: '0000-0000-0000-0000',
  //
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
