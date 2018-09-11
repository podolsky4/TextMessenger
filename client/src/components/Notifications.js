import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {loadUserNotification} from '../actions/userActions'

class Notifications extends Component {
  componentWillMount () {
    const {loadNotification} = this.props
    loadNotification()
  }

  render () {
    const {user, notification} = this.props
    if (!user) {
      return <Redirect to={`/`}/>
    }
    return (
      <React.Fragment>
        {notification.length === 0 && <h3>Nothing to show</h3>}
        {notification.length !== 0 && notification.map(u => <a>{u.messageToFront.content}</a>)}
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