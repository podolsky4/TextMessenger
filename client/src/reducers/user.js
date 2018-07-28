function user (state = [], action) {
  if (action.type === 'CREATE_USER') {
    return action.payload;
  }
  return state
}

export default user;
