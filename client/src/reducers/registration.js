const initialState = {
  createForm: [],
  forgotPassword: []
}
function registration (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_USER_FORM_MESSAGE':
      return {...state, createForm: action.payload}
    case 'FORGOT_PASSWORD_MESSAGE':
      return {...state, forgotPassword: action.payload}

    default:
      return state
  }
}

export default registration