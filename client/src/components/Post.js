import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites, unRetweet, retweet} from '../actions/postsActions'
import {connect} from 'react-redux'
import Avatar from './Avatar'
import UserHeaderInfo from './UserHeaderInfo'
import DataInfo from './DataInfo'
import PostContent from './PostContent'
import Like from './Like'
import PostComment from './PostComment'
import PostRetwite from './PostRetwite'
import Comments from './Comments'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: false
    }
  }
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
  handleRetwite = e => {
    const {post, user, retweets, unRetweets, postId} = this.props
    if (e.target.className === 'tweet') {
      retweets(user.id, post.id)
    } else {
      unRetweets(postId)
    }
  }
  handleComments = e => {
    this.setState({comment: true})
  }
  render () {
    const {favorites, post, owner, whoo} = this.props

    return (

      <div className="post"
        key={`${post.id}  ${post.parentId}`}>
        {owner && `Ретвитнул ${owner.login}`}
        <header>
          <Avatar/>
          <UserHeaderInfo user={post.user}/>
          <DataInfo user={post.user}/>
        </header>
        <PostContent content={post.content}/>
        <footer>
          <Like favorites={favorites} post={post} handleLike={this.handleLike.bind(this)}/>
          <PostRetwite whoo={whoo} handleRetwite={this.handleRetwite.bind(this)}/>
          <PostComment handleComments={this.handleComments.bind(this)} />
        </footer>
        {this.state.comment && <Comments comments={post.comment} />}
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
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    retweets: (id, postId) => dispatch(retweet(id, postId)),
    unRetweets: (postId) => dispatch(unRetweet(postId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)