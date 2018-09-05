function posts (state = [], action) {
  // if (action.type === 'LOAD_POSTS') {
  //   return action.payload
  // }
  // return state
  switch (action.type) {
    case 'LOAD_POSTS':
      return action.payload
    case 'ADD_TO_POSTS_PAGE':
      return [...state, ...action.payload]

    default:
      return state
  }
}

export default posts