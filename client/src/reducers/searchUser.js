function searchUser (state = [], action) {
  if (action.type === 'FIND_USERS') {
    return action.payload
  } else if (action.type === 'CLEAN_USERSEARCH') {
    return action.payload
  }
  return state
}

export default searchUser
