import React, {Component} from 'react'
import cyan from '@material-ui/core/colors/cyan'

import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  paper: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    padding: theme.spacing.unit * 1,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      background: 'blue'
    }
  },
  avatar: {
    backgroundColor: cyan[500],
    margin: '0 -6px',
    transition: 'margin .3s',
    border: '2px solid #ffffff',
    '&:hover': {
      margin: '0 -6px',
      zIndex: '10'
    }
  },
  userAvatarContainer: {
    flexDirection: 'row',
    display: 'flex',
    width: 'fit-content',
    '&:hover': {
      zIndex: '10',
      marginLeft: +3,
      marginRight: +3
    }
  },
  userAvatar: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    '&:hover': {}
  },
  userName: {
    margin: '0 0px',
    transition: 'margin .2s',
    '&:hover': {}
  },
  userNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    transition: 'margin .2s',
    '&:hover': {}
  }
})

class Dialog extends Component {
  render () {
    const {user, handleMessages, dialog, addUserToDialog, classes} = this.props
    const {users} = this.props.dialog

    return (
      <div className={classes.paper}>
        <div className={classes.userAvatarContainer}>
          {users.map(
            member => member.id !== user.id
              ? <div className={classnames(classes.userAvatar)}>
                <Avatar alt="avatar"
                  src={user.profilePhoto}
                  className={classnames(classes.avatar, 'logo')}
                  onClick={e => this.profileRender(this.props.user.id)}/>
              </div> : ''
          )
          }
        </div>

        <div>
          {users.map(
            member => member.id !== user.id
              ? <div className={classes.userNameContainer}>
                <a key={member.id}
                  onClick={e => handleMessages(dialog)}
                  className={classnames(classes.userName)}
                >
                  {member.email}
                </a>
              </div>
              : ''
          )
          }
        </div>

        <button value={dialog.id} onClick={e => addUserToDialog(e)}>Add user</button>
      </div>

    )
  }
}

export default withStyles(styles)(Dialog)