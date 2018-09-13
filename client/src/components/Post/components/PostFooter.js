import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'
import Like from './Like'

export default class PostFooter extends Component {
  render () {
    const {post, user, favorites, whoo, handleComments, classes, flag, commentsAmount} = this.props
    return (<React.Fragment>
      <Like post={post} user={user} favorites={favorites}/>
      <PostRetwite whoo={whoo} post={post} user={user} postId={post.id} />
      <PostComment classes={classes} handleComments={handleComments} flag={flag} commentsAmount={commentsAmount}/>
    </React.Fragment>
    )
  }
}