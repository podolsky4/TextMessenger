import {LOAD_POSTS} from './types'

export const loadPosts = () => dispatch => {
  fetch(`http://localhost:9000/posts`)
      .then(res => res.json())
      .then(data => dispatch({type:LOAD_POSTS, payload: data}))
};