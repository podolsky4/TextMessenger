import React, {Component} from 'react'
import cyan from '@material-ui/core/colors/cyan'

import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import {Redirect} from 'react-router'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  paper: {
    flexDirection: 'row',
    margin: 1,
    width: '100%',
    display: 'flex',
    padding: theme.spacing.unit,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      background: theme.palette.primary.main
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
    marginRight: '10px',
    '&:hover': {}
  },
  userNames: {
    display: 'flex'
  }
})

class Dialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toredirect: false,
      id: ''
    }
  }
  profileRender = id => {
    this.setState({
      toredirect: true,
      id: id
    })
  }
  render () {
    const {user, handleMessages, dialog, addUserToDialog, classes} = this.props
    const {users} = this.props.dialog
    if (this.state.toredirect) {
      this.setState({toredirect: false})
      return <Redirect to={`/profile/${this.state.id}`}/>
    }
    return (
      <div className={classes.paper} onClick={e => handleMessages(dialog)}>
        <div className={classes.userAvatarContainer}>
          {users.map(
            member => member.id !== user.id
              ? <div className={classnames(classes.userAvatar)}>
                <Avatar alt="avatar"
                  src={member.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : member.profilePhoto}
                  className={classnames(classes.avatar, 'logo')}
                  onClick={e => this.profileRender(member.id)}/>
              </div> : ''
          )
          }
        </div>

        <div className={classes.userNames} >
          {
            users.length <= 4
              ? users.map(
                member => member.id !== user.id
                  ? <div className={classes.userNameContainer}>
                    <a key={member.id}
                      className={classnames(classes.userName, 'capitalize')}
                    >
                      {member.login}
                    </a>
                  </div>
                  : ''
              ) : ''
          }
        </div>

        <button value={dialog.id} onClick={e => addUserToDialog(e)}>Add user</button>
      </div>

    )
  }
}

export default withStyles(styles)(Dialog)