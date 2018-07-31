import {LOAD_POSTS} from './types'

export const createLoadPosts = (id, content) => dispatch => {
  fetch(`/user/${id}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'content': content})
    })
    .then(() => dispatch(loadPosts()))
}

export const loadPosts = () => dispatch => {
  fetch(`/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
}
