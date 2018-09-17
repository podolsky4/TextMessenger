import React, {Component} from 'react'
import {ListItem} from '@material-ui/core/umd/material-ui.production.min'
import Avatar from '../../../../node_modules/@material-ui/core/Avatar/Avatar'

const styles = theme => ({
    comment: {
        display: 'flex',
        padding: '16px 16px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        borderTop:'1px solid' + theme.palette.background.grey,
        marginLeft: theme.spacing.unit * 2,
    },
    commentContent: {
        marginLeft: theme.spacing.unit * 2,
    }
})

class Comments extends Component {
  state = {
    secondary: true
  };
  render () {
    const {comment, classes} = this.props

    return (
        <React.Fragment>
            <div className={classes.comment}>
              <Avatar src={comment.user.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : comment.user.profilePhoto}/>
                <Typography component={'p'}
                            className={classes.commentContent}
                            children={comment.content}
                />
            </div>
        </React.Fragment>
    )
  }
}
export default withStyles(styles)(Comments)