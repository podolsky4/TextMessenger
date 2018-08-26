const initialState = {
  fetching: false,
  loadingPost: false,
  commentReload: false
}

function loader (state = initialState, action) {
  switch (action.type) {
    case 'START_LOADER':
      return {...state, fetching: action.payload}
    case 'STOP_LOADER':
      return {...state, fetching: action.payload}
    case 'START_LOADER_COMMENT':
      return {...state, commentReload: action.payload}
    case 'STOP_LOADER_COMMENT':
      return {...state, commentReload: action.payload}
    case 'LOADING_POST':
      console.log('Loader action received:', action)
      return {...state, loadingPost: action.payload}

    default:
      return state
  }
  // if (action.type === 'START_LOADER') {
  //     return { ...state, fetching: action.payload}
  // }
  // if (action.type === 'STOP_LOADER') {
  //     return { ...state, fetching: action.payload}
  // }
  // return state
}

export default loader