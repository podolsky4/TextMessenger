import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites} from '../actions/postsActions'
import {connect} from 'react-redux'

class Post extends Component {
  componentWillMount () {
    const {favorites, user} = this.props
    if (favorites.length === 0) {
      this.props.loadFavorites(user.id)
    }
  }
  handleLike = e => {
    const {post, user} = this.props
    if (e.target.className === 'like') {
      this.props.addedLiker(post.id, user)
    } else {
      this.props.deleteLiker(post.id, user)
    }
  }

  render () {
    const {favorites} = this.props
    const {user} = this.props.post

    return (
      <div className="post"
        key={this.props.post.id}>
        <header>
          <img className="logo" alt="logo" src="https://www.ozilis.com/25038-large_default/plate-42-44-46.jpg"></img>
          <div className="user_info">
            <div className="post_login">{user.login}</div>
            <div className="post_email">{user.email}</div>
          </div>
          <div className="data_info">
            <div className="user_fullname">{`${user.firstName}  ${user.lastName}`}</div>
            <div className="date_created">{user.createdDate}</div>
          </div>
        </header>

        <p className="post_content">
          {this.props.post.content}
        </p>
        <footer>
          <a className={favorites.some(post => post.id === this.props.post.id) ? 'like--checked' : 'like'}
            onClick={event => this.handleLike(event)}>Like</a>
          <a className="retwite">Retwite</a>
          <a className="comment">Comment</a>
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