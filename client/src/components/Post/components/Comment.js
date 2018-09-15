import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import Avatar from '../../../../node_modules/@material-ui/core/Avatar/Avatar'
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
    comment: {
        display: 'flex',
        padding: '16px 0px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        borderTop:'1px solid' + theme.palette.background.grey
    },
    commentContent: {
        marginLeft: 32,
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