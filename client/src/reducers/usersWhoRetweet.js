function usersWhoRetweet (state = [], action) {
  if (action.type === 'LOAD_USERS_FROM_PARENT') {
    return action.payload
  }
  return state
}

export default usersWhoRetweet








