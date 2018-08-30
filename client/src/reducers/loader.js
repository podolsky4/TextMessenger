const initialState = {
  fetching: false,
  loadingPost: false,
  commentReload: false,
  loadingUser: false,
  loadingFavorites: false
}

function loader (state = initialState, action) {
  switch (action.type) {
    case 'START_LOADER':
      return {...state, fetching: action.payload}
    case 'STOP_LOADER':
      return {...state, fetching: action.payload}
    case 'LOADING_USER':
      return {...state, loadingUser: action.payload}
    case 'LOADING_FAVORITES':
      return {...state, loadingFavorites: action.payload}
    case 'START_LOADER_COMMENT':
      return {...state, commentReload: action.payload}
    case 'STOP_LOADER_COMMENT':
      return {...state, commentReload: action.payload}
    case 'LOADING_POST':
      return {...state, loadingPost: action.payload}

    default:
      return state
  }
}

export default loader