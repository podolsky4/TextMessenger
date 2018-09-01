function user (state = [], action) {
  if (action.type === 'CREATE_USER_IN_REDUX') {
    console.log("action :", action)
    return action.payload
  }
  return state
}

export default user
