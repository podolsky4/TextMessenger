import {LOAD_USER_PROFILE} from "./types";

export const readUserProfile = userId => dispatch => {
  fetch(`http://localhost:9000/user/${userId}`)
      .then(res => res.json())
      .then(data => dispatch({type:LOAD_USER_PROFILE, payload: data}))
};