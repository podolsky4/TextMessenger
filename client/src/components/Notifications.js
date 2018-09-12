import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {loadUserNotification} from '../actions/userActions'

class Notifications extends Component {
  componentWillMount () {
    const {loadNotification} = this.props
    loadNotification()
  }

  read = item => {
    // TODO replace switch
    if (item.type === 'NEW_POST') {
      return <h3>Юзер {item.fromUser.login} write new post</h3>
    } else if (item.type === 'NEW_RETWEET') {
      return <h3>Юзер {item.fromUser.login} retweet your post</h3>
    } else if (item.type === 'NEW_COMMENT') {
      return <h3>Юзер {item.fromUser.login} comment your post</h3>
    } else if (item.type === 'NEW_LIKE') {
      return <h3>Юзер {item.fromUser.login} liked your post</h3>
    } else if (item.type === 'NEW_FOLLOWER') {
      return <h3>Юзер {item.fromUser.login} following you</h3>
    } else if (item.type === 'NEW_DIALOG') {
      return <h3>Юзер {item.fromUser.login} create with you chat</h3>
    } else if (item.type === 'ADD_TO_DIALOG') {
      return <h3>Юзер {item.fromUser.login} join you to chat</h3>
    } else if (item.type === 'NEW_MESSAGE') {
      return <h3>{item.fromUser.login} write you new message</h3>
    }
  }

  render () {
    const {user, notification} = this.props
    if (!user) {
      return <Redirect to={`/`}/>
    }
    return (
      <React.Fragment>
        {notification.length === 0 && <h3>Nothing to show</h3>}
        {notification.length !== 0 && notification.map(u => this.read(u))}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notification: state.notification
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadNotification: () => dispatch(loadUserNotification())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)