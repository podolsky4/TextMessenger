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
    if (item.type === 'NEW_POST') {
      return (
       <h3>Юзер {item.fromUser.login} написал новый пост</h3>
      )
    } else if (item.type === 'NEW_RETWEET') {
      return <h3>Юзер {item.fromUser.login} retweet your post</h3>
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