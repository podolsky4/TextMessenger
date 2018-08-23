import {LOAD_FAVORITES, LOAD_POSTS, START_LOADER_COMMENT, STOP_LOADER_COMMENT} from './types'
import {endReLoader, startLoader, startReLoader, stopLoader} from './loaderActions'

export const createLoadPosts = (id, content) => dispatch => {
  dispatch(startReLoader());
  fetch(`/api/posts/user/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'content': content})
    })
    .then(() => dispatch(loadPosts()))
    .then(()=>dispatch(endReLoader()))
};
export const createComment = (postId, userId, content) => dispatch => {
  dispatch(startLoader(START_LOADER_COMMENT));
  fetch(`/api/comments/post/${postId}/user/${userId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'content': content})
    })
    .then(() => dispatch(loadPosts()))
    .then(()=> dispatch(stopLoader(STOP_LOADER_COMMENT)))
};
export const retweet = (id, postId) => dispatch => {
  fetch(`/api/posts/user/${id}/post/${postId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch(loadPosts()))
};
export const unRetweet = (postId) => dispatch => {
  fetch(`/api/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch(loadPosts()))
};

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
};
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
};
export const loadFavorites = (id) => dispatch => {
  fetch(`/api/users/favorites/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
};
export const loadFavoritesByLogin = (login) => dispatch => {
  fetch(`/api/users/favorites/login/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FAVORITES, payload: data}))
};

export const loadPosts = () => dispatch => {
  dispatch(startLoader('LOADING_POST'));
  fetch(`/api/posts`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_POSTS, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_POST')))
};
