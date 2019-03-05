import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/umd/material-ui.production.min'
import Avatar from '../../../node_modules/@material-ui/core/Avatar/Avatar'
import cyan from '../../../node_modules/@material-ui/core/colors/cyan'

const styles = theme => ({
  ava: {
    backgroundColor: cyan[500],
    margin: '0 -6px',
    transition: 'margin .3s',
    border: '2px solid' + theme.palette.background.dark,
    '&:hover': {
      marginRight: +4,
    }
  }

})

class LikeToSinglePost extends Component {
  render () {
    const {like, classes} = this.props

    return <Avatar className={classes.ava} src={like.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : like.profilePhoto}/>
  }
}
export default withStyles(styles)(LikeToSinglePost)