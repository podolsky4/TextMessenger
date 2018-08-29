function messages (state = [], action) {
  if (action.type === 'LOAD_MESSAGES') {
    return action.payload
  }
  return state
}

export default messages