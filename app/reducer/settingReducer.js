import {
  CONNECTION_STATUS, UPDATE_SOCKETS_ADDRESS
} from './action/Constants'
import io from 'socket.io-client'
const INITIAL_STATE = {
  socket: io('http://localhost:4000', {
    transports: ['websocket']
  }),
  socketsAddress: [],
  connected: false
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SOCKETS_ADDRESS:
      return { ...state, socketsAddress: action.payload }
    case CONNECTION_STATUS:
      return { ...state, connected: action.payload }
    default:
      return state
  }
}
