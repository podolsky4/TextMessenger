import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'
import Like from './Like'

export default class PostFooter extends Component {
  render () {
    const {post, user, favorites} = this.props
    return (<React.Fragment>
      <Like post={post} user={user} favorites={favorites} />
      <PostRetwite whoo handleRetwite />
      <PostComment handleComments />
    </React.Fragment>
    )
  }
}