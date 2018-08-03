import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component {
  render () {
    const {posts} = this.props
    let current = content => {
      if (content.parent === null) {
        let currentPost = posts.find(i => i.id === content.parent)
        return (
          <Post
            key={currentPost.id}
            post={currentPost}
            owner={content.user.login}
          />)
      } else {
        return (
          <Post
            key={content.id}
            post={content}
          />)
      }
    }
    return (
      <div className="posts">
        {posts.map(content =>
          current(content)
        )}
      </div>
    )
  }
}

export default Posts
