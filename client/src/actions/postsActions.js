import {LOAD_POSTS} from './types'

export const createLoadPosts = (id, content) => dispatch => {
  fetch(`/posts/user/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'content': content})
    })
    .then(() => dispatch(loadPosts()))
}

export const addedLikers = (id, user) => dispatch => {
  fetch(`/users/post/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadPosts()))
}

export const loadPosts = () => dispatch => {
  fetch(`/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
}
