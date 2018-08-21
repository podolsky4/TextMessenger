function following (state = [], action) {
  if (action.type === 'LOAD_FOLLOWING') {
    return action.payload
  }
  return state
}

export default following