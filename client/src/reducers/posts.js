function posts (state = [], action) {
  if (action.type === 'LOAD_POSTS') {
    return action.payload
  }
  return state
}

export default posts