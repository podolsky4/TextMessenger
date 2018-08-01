import { combineReducers } from 'redux'
import user from './user'
import posts from './posts'
import favorites from './favorites'

export default combineReducers({
  user,
  posts,
  favorites
})
