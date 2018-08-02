import {LOAD_DIALOGS} from "./types";

export const loadDialog = id => dispatch => {
  fetch(`/dialogs/${id}`)
      .then(res => res.json())
      .then(data => dispatch({type:LOAD_DIALOGS, payload:data}))
};