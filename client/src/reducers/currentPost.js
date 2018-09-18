function currentPost (state = {}, action) {
  if (action.type === 'ADD_CURRENT') {
    return action.payload
  }
  return state
}

export default currentPost