import {
  CONNECTION_STATUS, UPDATE_MOMMENT_SCREEN, UPDATE_SOCKETS_ADDRESS, UPDATE_SOCKETS, UPDATE_CONTROL
} from './action/Constants'
import io from 'socket.io-client'
import SCREENS from '../ContanstPage/SCREENS'
const INITIAL_STATE = {
  socket: io('http://172.16.20.61:4000', {
    transports: ['websocket']
  }),
  socketsAddress: [],
  connected: false,
  screen: SCREENS.SIGN_WALLETS_SUBMIT,
  control: 'none'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SOCKETS_ADDRESS:
      return { ...state, socketsAddress: action.payload }
    case CONNECTION_STATUS:
      return { ...state, connected: action.payload }
    case UPDATE_MOMMENT_SCREEN:
      return { ...state, screen: action.payload }
    case UPDATE_SOCKETS:
      return { ...state, socket: action.payload }
    case UPDATE_CONTROL:
      return { ...state, control: action.payload }
    default:
      return state
  }
}
