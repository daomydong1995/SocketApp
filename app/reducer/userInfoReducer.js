import {
  SYN_DATA, SUCSSES_EVENT, ERROR_EVENT, SHOW_LOADING, UPDATE_ACCES_RULES,
  UPDATE_SIGNATURE
} from './action/Constants'

const INITIAL_STATE = {
  userName: '',
  userGender: undefined,
  userAddress: '',
  userDistrict: '',
  userWards: '',
  userProvince: '',
  userNation: '',
  userID: '',
  userJob: '',
  userCountry: '',
  userBirthday: '01/01/2010',
  userBHY: '',
  userPhone: '',
  userIssuedDay: '01/01/2005',
  userIssuedPlace: '',
  loading: false,
  isAccessRules: false,
  existSignature: false
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYN_DATA:
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
    case UPDATE_SIGNATURE:
      return { ...state, existSignature: action.payload }
    default:
      return state
  }
}
