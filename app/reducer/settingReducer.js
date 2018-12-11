import {
  CONNECTION_STATUS, UPDATE_SOCKET
} from './action/Constants'
import io from 'socket.io-client'
const INITIAL_STATE = {
  socket: io('http://localhost:3000', {
    transports: ['websocket']
  }),
  socketsAddress: undefined,
  connected: false
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SOCKET:
      return { ...state, socket: action.payload }
    case CONNECTION_STATUS:
      return { ...state, connected: action.payload }
    default:
      return state
  }
}
