function notification (state = [], action) {
  if (action.type === 'LOAD_NOTIFICATION') {
    return action.payload
  }else if (action.type === 'ADD_NOTIFICATION'){
    return[...state, action.payload]
  }
  return state
}

export default notification