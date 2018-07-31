import React, {Component} from 'react'
import {connect} from 'react-redux'
import Post from './Post'

class Posts extends Component {
  render () {
    return (
      <div className="Posts">
        {this.props.posts.map(content =>
          <Post
            key={content.id}
            post={content}
          />)}
      </div>
    )
  }
}

export default connect(state => ({
  posts: state.posts
}))(Posts)
