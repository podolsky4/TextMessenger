import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component {
  render () {
    const {posts, user} = this.props
    let current = post => {
      if (post.parentId == null) {
        return (
          <Post
            key={post.id}
            post={post}
          />)
      } else {
        let currentPost = posts.find(i => i.id === post.parentId)
        console.log(currentPost)
        let who = user.id === post.user.id
        return (
          <Post
            key={post.id}
            post={currentPost}
            owner={post.user}
            whoo={who}
            postId={post.id}
          />)
      }
    }

    return (
      <div className="posts">
        {posts.map(content => current(content))}
      </div>
    )
  }
}

export default Posts
