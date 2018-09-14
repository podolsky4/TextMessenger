import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'
import Like from './Like'

export default class PostFooter extends Component {
  render () {
    const {post, user, favorites, whoo, handleComments, flag, commentsAmount, postId} = this.props
    return (<React.Fragment>
      <Like post={post} user={user} favorites={favorites}/>
      <PostComment handleComments={handleComments} flag={flag} commentsAmount={commentsAmount} user={user}/>
      <PostRetwite whoo={whoo} post={post} user={user} postId={postId} />
    </React.Fragment>
    )
  }
}