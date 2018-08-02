import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component {
  render () {
    return (
      <div className="posts">
        {this.props.posts.map(content =>
          <Post
            key={content.id}
            post={content}
          />)}
      </div>
    )
  }
}

export default Posts
