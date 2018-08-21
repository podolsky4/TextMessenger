import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'
import Like from './Like'

export default class PostFooter extends Component {
  render () {
    return (<React.Fragment>
      <Like favorites post handleLike />
      <PostRetwite whoo handleRetwite />
      <PostComment handleComments />
    </React.Fragment>
    )
  }
}