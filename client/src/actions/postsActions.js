import {LOAD_COMMENTS, ADD_CURRENT, LOAD_FAVORITES, LOAD_POSTS, LOADING_COMMENTS, ADD_TO_POSTS_PAGE, NO_FETCH_LIST_IS_EMPTY} from './types'
import {endReLoader, startLoader, startReLoader, stopLoader} from './loaderActions'
import FetchData from './serviceAction'

export const createPostWithOrWithOutImage = (data) => dispatch => {
  dispatch(startReLoader())
  fetch(`/api/posts/user`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: data
  })
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
export const loadPagePost = (page, size, callback) => dispatch => {
  dispatch(startLoader('LOADING_POST'))
  FetchData.get(`/api/posts/${page}/${size}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        dispatch({type: NO_FETCH_LIST_IS_EMPTY, payload: false})
        dispatch(stopLoader('LOADING_POST'))
      } else {
        dispatch({type: ADD_TO_POSTS_PAGE, payload: data})
        dispatch(stopLoader('LOADING_POST'))
        callback && callback()
      }
    })
}

export const currentPost = (id) => dispatch =>{
  FetchData.get(`/api/posts/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: ADD_CURRENT , payload: data}))
}
export const loadComments = (id) => dispatch => {
  dispatch(startLoader('LOADING_COMMENTS'))
  FetchData.get(`/api/comments/post/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_COMMENTS, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_COMMENTS')))
}