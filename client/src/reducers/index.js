import {combineReducers} from 'redux'
import user from './user'
import posts from './posts'
import favorites from './favorites'
import dialogs from './dialogs'
import loader from './loader'
import messages from './messages'
import searchUser from './searchUser'
import following from './following'
import reloadLoader from './reloadLoader'
import notification from './notification'
import location from './location'
import comments from './comments'
import registration from './registration'
import able from './able'
import currentPost from './currentPost'

export default combineReducers({
  user,
  posts,
  dialogs,
  favorites,
  loader,
  messages,
  searchUser,
  following,
  reloadLoader,
  notification,
  location,
  comments,
  registration,
  able,
  currentPost
})
