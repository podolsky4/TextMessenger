import { combineReducers } from 'redux'
import user from './user'
import posts from './posts'
import dialogs from './dialogs';
import favorites from './favorites'

export default combineReducers({
  user,
  posts,
  dialogs,
  favorites
})
