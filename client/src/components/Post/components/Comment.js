import React, {Component} from 'react'
import {ListItem} from '@material-ui/core/umd/material-ui.production.min'
import Avatar from '../../../../node_modules/@material-ui/core/Avatar/Avatar'

export default class Comments extends Component {
  state = {
    secondary: true
  };
  render () {
    const {comment} = this.props
    console.log('comment :', comment)
    console.log('comment.user. :', comment.user)

    return (
        <React.Fragment>
            <ListItem>
              <Avatar src={comment.user.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : comment.user.profilePhoto}/>
                {comment.content}
            </ListItem>
        </React.Fragment>
    )
  }
}
