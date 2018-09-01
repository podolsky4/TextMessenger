import {LOAD_COMMENTS, LOAD_FAVORITES, LOAD_POSTS, LOADING_COMMENTS} from './types'
import {endReLoader, startLoader, startReLoader, stopLoader} from './loaderActions'
import FetchData from './serviceAction'
export const createLoadPosts = (id, content) => dispatch => {
  dispatch(startReLoader())
  FetchData.post(`/api/posts/user/${id}`, {'content': content})
    .then(() => dispatch(loadPosts()))
    .then(() => dispatch(endReLoader()))
}
export const createComment = (postId, userId, content) => dispatch => {
  dispatch(startLoader(LOADING_COMMENTS))
  FetchData.post(`/api/comments/post/${postId}/user/${userId}`, {'content': content})
    .then(() => dispatch(loadPosts()))
    .then(() => dispatch(stopLoader(LOADING_COMMENTS)))
}
export const retweet = (id, postId) => dispatch => {
  FetchData.post(`/api/posts/user/${id}/post/${postId}`, {})
    .then(() => dispatch(loadPosts()))
}
export const unRetweet = (postId) => dispatch => {
  FetchData.deleteApi(`/api/posts/${postId}`)
    .then(() => dispatch(loadPosts()))
}

export const addedLikers = (id, user) => dispatch => {
  FetchData.put(`/api/users/like/${id}`, user)
    .then(() => dispatch(loadFavorites(user.id)))
}
export const deleteLikers = (id, user) => dispatch => {
  fetch(`/api/users/like/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadFavorites(user.id)))
}
export const loadFavorites = (id) => dispatch => {
  dispatch(startLoader('LOADING_FAVORITES'))
  FetchData.get(`/api/users/favorites/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_FAVORITES')))
}
export const loadFavoritesByLogin = (login) => dispatch => {
  FetchData.get(`/api/users/favorites/login/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
}

export const loadPosts = () => dispatch => {
  dispatch(startLoader('LOADING_POST'))
  FetchData.get(`/api/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_POST')))
}

export const loadComments = (id) => dispatch => {
  dispatch(startLoader('LOADING_COMMENTS'))
  FetchData.get(`/api/comments/post/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_COMMENTS, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_COMMENTS')))
}