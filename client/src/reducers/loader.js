
const initialState = {
    fetching: false
}

function loader (state = initialState, action) {
    switch (action.type) {
        case 'START_LOADER':
            return {...state, fetching: action.payload}
        case 'STOP_LOADER':
            return {...state, fetching: action.payload}
        default:
            return state;
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