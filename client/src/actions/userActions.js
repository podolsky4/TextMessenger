import {CREATE_USER} from './types.js';

export const createUser = (login) => dispatch => {
  fetch(`http://localhost:9000/users/bylogin/${login}`)
      .then(res => res.json())
      .then(data => dispatch({type:CREATE_USER, payload: data}))
};
