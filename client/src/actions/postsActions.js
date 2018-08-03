import {LOAD_POSTS, LOAD_FAVORITES} from './types'

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
export const retweet = (id, postId) => dispatch => {
  fetch(`/api/posts/user/${id}/post/${postId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch(loadPosts()))
}
export const unRetweet = (id, postId) => dispatch => {
  fetch(`/api/posts/user/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
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
    .then(() => dispatch(loadFavorites(user.id)))
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
    .then(() => dispatch(loadFavorites(user.id)))
}
export const loadFavorites = (id) => dispatch => {
  fetch(`/api/users/favorites/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
}
export const loadFavoritesByLogin = (login) => dispatch => {
  fetch(`/api/users/favorites/login/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
}

export const loadPosts = () => dispatch => {
  fetch(`/api/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
}
