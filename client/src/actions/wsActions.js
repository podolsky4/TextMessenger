import { NEW_MESSAGE, ADD_NOTIFICATION, NEW_DIALOG } from './types'

export const addMessageFromWs = (message) => dispatch => {
   dispatch({type: NEW_MESSAGE, payload: message})
}

export const addDialogFromWs = (message) => dispatch => {
  dispatch({type: NEW_DIALOG, payload: message})
}

export const addNotificationFromWs = (message) => dispatch => {
  dispatch({type: ADD_NOTIFICATION, payload: message})
}