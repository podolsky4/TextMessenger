import React, {Component} from 'react'
import {addedLikers} from '../actions/postsActions'
import {connect} from 'react-redux'

class Post extends Component {
  handleLike = e => {
    if (e.target.className === 'like') {
      console.log(e.target.className)
      e.target.className = 'likers'
      console.log(e.target.className)
      this.props.addedLiker(this.props.post.id, this.props.user)
    }
  }
  render () {
    return (
      <div className="post"
        key={this.props.post.id}>
        <header>
          <img className="logo" alt="logo" src="https://www.ozilis.com/25038-large_default/plate-42-44-46.jpg"></img>
          <div className="user_info">
            <div className="post_login">{this.props.post.user.login}</div>
            <div className="post_email">{this.props.post.user.email}</div>
          </div>
          <div className="data_info">
            <div className="user_fullname">{`${this.props.post.user.firstName}  ${this.props.post.user.lastName}`}</div>
            <div className="date_created">{this.props.post.user.createdDate}</div>
          </div>
        </header>

        <p className="post_content">
          {this.props.post.content}
        </p>
        <footer>
          <a className="like" onClick={event => this.handleLike(event)}>Like</a>
          <a className="retwite">Retwite</a>
          <a className="comment">Comment</a>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addedLiker: (id, user) => dispatch(addedLikers(id, user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)