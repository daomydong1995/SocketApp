import { SYS_HIS_DATA } from './action/Constants'

const INITIAL_STATE = [{
  htDate: '01/01/2005',
  htID: '',
  htChanged: '',
  htNumber: 0,
  htPlaceRequire: '',
  htInfo: ''
}]

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYS_HIS_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
