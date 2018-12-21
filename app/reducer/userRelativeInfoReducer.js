import {
  SYS_REU_DATA
} from './action/Constants'

const INITIAL_STATE = {
  rltName: '',
  rltPhone: '',
  rltInfo: ''
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYS_REU_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
