import {LOAD_POSTS} from './types'

export const createLoadPosts = (id, content) => dispatch => {
  fetch(`/api/posts/user/${id}`,
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
  fetch(`/api/users/post/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadPosts()))
}
export const deleteLikers = (id, user) => dispatch => {
  fetch(`/api/users/post/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadPosts()))
}

export const loadPosts = () => dispatch => {
  fetch(`/api/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
}
