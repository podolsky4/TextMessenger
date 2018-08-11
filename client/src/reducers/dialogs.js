function dialogs (state = [], action) {
  if (action.type === 'LOAD_DIALOGS') {
    return action.payload
  }
  return state
}

export default dialogs