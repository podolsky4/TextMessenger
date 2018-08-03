import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites} from '../actions/postsActions'
import {connect} from 'react-redux'
import Avatar from './Avatar'
import UserInfo from './UserInfo'
import DataInfo from './DataInfo'
import PostContent from './PostContent'
import Like from './Like'
import PostComment from './PostComment'
import PostRetwite from './PostRetwite'

class Post extends Component {
  componentWillMount () {
    const {favorites, user, loadFavorites} = this.props
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
  }
  handleLike = e => {
    const {post, user, addedLiker, deleteLiker} = this.props
    if (e.target.className === 'like') {
      addedLiker(post.id, user)
    } else {
      deleteLiker(post.id, user)
    }
  }

  render () {
    const {favorites, post} = this.props

    return (
      <div className="post"
        key={post.id}>
        <header>
          <Avatar/>
          <UserInfo user={post.user}/>
          <DataInfo user={post.user}/>
        </header>
        <PostContent content={post.content}/>
        <footer>
          <Like favorites={favorites} post={post} handleLike={this.handleLike.bind(this)}/>
          <PostRetwite/>
          <PostComment/>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addedLiker: (id, user) => dispatch(addedLikers(id, user)),
    deleteLiker: (id, user) => dispatch(deleteLikers(id, user)),
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)