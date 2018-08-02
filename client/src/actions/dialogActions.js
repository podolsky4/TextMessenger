import {LOAD_DIALOGS} from "./types";

export const loadDialog = id => dispatch => {
  fetch(`/api/dialogs/${id}`)
      .then(res => res.json())
      .then(data => dispatch({type:LOAD_DIALOGS, payload:data}))
}

export const createDialog = id => dispatch => {

}

export const loadMessages = dialog_id => dispatch => {

}

export const createMessage = dialog_id => dispatch => {

}