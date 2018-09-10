function messages (state = [], action) {
  if (action.type === 'LOAD_MESSAGES') {
    return action.payload
  }else if (action.type === 'NEW_MESSAGE') {
    return [...state, action.payload]
  }
  return state
}

export default messages