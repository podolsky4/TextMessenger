import React, {Component} from 'react'
import PostRetwite from './PostRetwite'
import PostComment from './PostComment'
import Like from "./Like";

export default class PostFooter extends Component {
    render () {
        const {user, favorites, post, handleLike, whoo, handleRewrite, handleComments} = this.props
        return (<React.Fragment>
                    <Like favorites post handleLike />
                    <PostRetwite whoo handleRetwite />
                    <PostComment handleComments />
                </React.Fragment>
        )
    }
}