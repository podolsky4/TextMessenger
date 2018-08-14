function searchUser (state = [], action) {
  if (action.type === 'FIND_USERS') {
    return action.payload
  }
  return state
}

export default searchUser
