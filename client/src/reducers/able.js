const initialState = {
  postAble: true
}

function able (state = initialState, action) {
  switch (action.type) {
    case 'NO_FETCH_LIST_IS_EMPTY':
      return {...state, postAble: action.payload}
    default:
      return state
  }
}

export default able