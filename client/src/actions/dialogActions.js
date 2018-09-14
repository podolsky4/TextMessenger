import {CLEAN_USERSEARCH, LOAD_DIALOGS, LOAD_MESSAGES} from './types'
import {toggleLoader} from './loaderActions'
import FetchData from './serviceAction'

export const loadDialog = id => dispatch => {
  FetchData.get(`/api/dialogs/user/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        dispatch({type: LOAD_DIALOGS, payload: []})
      } else {
        dispatch({type: LOAD_DIALOGS, payload: data})
      }
    })
}

export const createDialog = (user, secondUser) => dispatch => {
  FetchData.post(`/api/dialogs/user/${secondUser}`, user)
    .then(() => dispatch(loadDialog(user.id)))
}

export const loadMessages = dialogId => dispatch => {
  dispatch(toggleLoader())
  FetchData.get(`/api/messages/dialog/${dialogId}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_MESSAGES, payload: data}))
}

export const createMessage = (dialogId, userId, message) => dispatch => {
  dispatch(toggleLoader())
  FetchData.post(`/api/messages/user/${userId}/dialog/${dialogId}`, {message: message})
    .then(() => dispatch(loadMessages(dialogId)))
}

export const addUserToExistDialog = (dialogId, userId, newUser) => dispatch => {
  FetchData.get(`/api/dialogs/user/${newUser}/dialog/${dialogId}`)
    .then(() => dispatch(loadDialog(userId)))
}

export const cleanUserSearch = () => dispatch => {
  dispatch({type: CLEAN_USERSEARCH, payload: []})
}