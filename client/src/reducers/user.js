function user (state = null, action) {
  if (action.type === 'LOAD_USER') {
    return action.payload
  }
  return state
}

export default user
