import { combineReducers } from 'redux'
import user from './user'
import posts from './posts'
import favorites from './favorites'
import loader from './loader'

export default combineReducers({
  user,
  posts,
  favorites,
  loader
})
