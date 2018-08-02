function favorites (state = [], action) {
  if (action.type === 'LOAD_FAVORITES') {
    return action.payload
  }
  return state
}

export default favorites