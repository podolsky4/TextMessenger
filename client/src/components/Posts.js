import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component {
  render () {
    const {posts,user} = this.props
    let current = content => {
      if (content.parent == null) {
        let currentPost = posts.find(i => i.id === content.parent)
        console.log(currentPost)
        let who = user.id === content.user.id
        return (
          <Post
            key={currentPost.id}
            post={currentPost}
            owner={content.user}
            whoo={who}
          />)
      } else {
        return (
          <Post
            key={content.id}
            post={content}
            whoo={false}
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
