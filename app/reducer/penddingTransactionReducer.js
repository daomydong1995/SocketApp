import { SYS_PEN_DATA } from './action/Constants'

const INITIAL_STATE = [{
  pdtDate: '01/01/2005',
  pdtID: '',
  pdtInfo: '',
  pdtPlaceRequire: '',
  pdtPrice: 0
}]

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYS_PEN_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
