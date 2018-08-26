function notification (state = [], action) {
  if (action.type === 'LOAD_NOTIFICATION') {
    return action.payload
  }
  return state
}

export default notification