import {
  CONNECTION_STATUS, UPDATE_MOMMENT_SCREEN, UPDATE_SOCKETS_ADDRESS,
  UPDATE_SOCKETS, UPDATE_CONTROL, UPDATE_VISIBLE_SIGNWRITING,
  UPDATE_LOADING_SPINNER, UPDATE_MESSAGE_SOCKET, UPDATE_PEER_CONNECTION
} from './action/Constants'
import io from 'socket.io-client'
import SCREENS from '../ContanstPage/SCREENS'
const INITIAL_STATE = {
  socket: io.connect('http://172.16.20.61:4000', { 'timeout': 5000, 'connect_timeout': 5000 }),
  socketsAddress: [],
  connected: false,
  screen: SCREENS.SIGN_WALLETS_SUBMIT,
  visibleSignWriting: false,
  control: 'none',
  loadingSpinner: false,
  messageSocketStatus: false,
  peerConnection: null
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
    case UPDATE_VISIBLE_SIGNWRITING:
      return { ...state, visibleSignWriting: action.payload }
    case UPDATE_LOADING_SPINNER:
      return { ...state, loadingSpinner: action.payload }
    case UPDATE_MESSAGE_SOCKET:
      return { ...state, messageSocketStatus: action.payload }
    case UPDATE_PEER_CONNECTION:
      return {...state, peerConnection: action.payload}
    default:
      return state
  }
}
