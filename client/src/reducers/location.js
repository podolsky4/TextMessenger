const initialState = {
  location: 'home',
};

function location (state = initialState, action) {
  if (action.type === 'LOCATION') {
    return action.payload
  }
  return state
}

export default location