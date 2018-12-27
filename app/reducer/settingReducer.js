import {
  CONNECTION_STATUS, UPDATE_MOMMENT_SCREEN, UPDATE_SOCKETS_ADDRESS
} from './action/Constants'
import io from 'socket.io-client'
import SCREENS from '../ContanstPage/SCREENS'
const INITIAL_STATE = {
  socket: io('http://localhost:4000', {
    transports: ['websocket']
  }),
  socketsAddress: [],
  connected: false,
  screen: SCREENS.SIGN_WALLETS_SUBMIT
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SOCKETS_ADDRESS:
      return { ...state, socketsAddress: action.payload }
    case CONNECTION_STATUS:
      return { ...state, connected: action.payload }
    case UPDATE_MOMMENT_SCREEN:
      return { ...state, screen: action.payload }
    default:
      return state
  }
}
