function dialogs (state = null, action) {
  if (action.type === 'LOAD_DIALOGS') {
    return action.payload
  } else if (action.type === 'NEW_DIALOG') {
    return [...state, action.payload]
  }
  return state
}

export default dialogs