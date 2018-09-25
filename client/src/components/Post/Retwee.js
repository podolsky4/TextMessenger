import React, { Component, Fragment } from 'react'
import {withStyles} from '@material-ui/core/umd/material-ui.production.min'
import Avatar from '../../../node_modules/@material-ui/core/Avatar/Avatar'

const styles = theme => ({
  rrrr: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    padding: '4px 0 4px 32px',

  }
})

class Retwee extends Component {
  render () {
    const {users, classes, flag} = this.props

    return (
      <React.Fragment>

        {flag &&
        <Fragment>
          <h3>People how retweet you post</h3>
          {users.map(user =>
        <div className={classes.rrrr}>
          <Avatar className={classes.sssss} src={user.profilePhoto === null ?
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
            : user.profilePhoto}/>
        </div>)}
        </Fragment>
        }
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Retwee)