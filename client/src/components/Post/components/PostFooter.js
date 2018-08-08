import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'

export default class PostFooter extends Component {
    render () {
        const {user, favorites, post, handleLike, whoo, handleRewrite, handleComments} = this.props
        return (<>
                    <Like favorites post handleLike />
                    <PostRetwite whoo handleRetwite />
                z<PostComment handleComments />
                </>
        )
    }
}