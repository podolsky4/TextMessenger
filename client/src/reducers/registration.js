function registration (state = {}, action) {
  if (action.type === 'REGISTRATED_MESSAGE') {
    return action.payload
  }
  return state
}

export default registration