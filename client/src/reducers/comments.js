function comments (state = [], action) {
  if (action.type === 'LOAD_COMMENTS') {
    return action.payload
  }
  return state
}

export default comments