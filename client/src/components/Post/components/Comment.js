import React, {Component} from 'react'
import {ListItem} from '@material-ui/core/umd/material-ui.production.min'

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
                {comment.content}
            </ListItem>
        </React.Fragment>
    )
  }
}
