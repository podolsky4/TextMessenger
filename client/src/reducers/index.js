import { combineReducers } from 'redux'
import user from './user'
import posts from './posts'
import favorites from './favorites'
import dialogs from './dialogs'
import loader from './loader'
import messages from './messages'
import searchUser from './searchUser'

export default combineReducers({
  user,
  posts,
  dialogs,
  favorites,
  loader,
  messages,
  searchUser
})
