function user (state = null, action) {
  if (action.type === 'CREATE_USER_IN_REDUX') {
    if (action.payload === undefined){
      return []
    } else{
      return action.payload
    }
  }
  return state
}

export default user
