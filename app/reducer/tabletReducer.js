import {
  UPDATE_HISTORY_TRANSACTION, UPDATE_PENDING_TRANSACTION
} from './action/Constants'
const INITIAL_STATE = {
  pendingTransactions: [],
  historyTransactions: []
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_HISTORY_TRANSACTION:
      return { ...state, historyTransactions: action.payload }
    case UPDATE_PENDING_TRANSACTION:
      return { ...state, pendingTransactions: action.payload }
    default:
      return state
  }
}
