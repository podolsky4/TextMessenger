function reloadLoader (state = false, action) {
  if (action.type === 'START_RELOADED') {
    return action.payload
  }
  if (action.type === 'STOP_RELOADED') {
    return action.payload
  }
  return state
}

export default reloadLoader