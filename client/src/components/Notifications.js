import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {loadUserNotification} from '../actions/userActions'

class Notifications extends Component {
  componentWillMount () {
    const {user, loadNotification} = this.props
    loadNotification(user.id)
  }

  render () {
    const {user, notification} = this.props
    if (!user) {
      return <Redirect to={`/`}/>
    }
    return (
      <React.Fragment>
        {notification.length === 0 && <h3>Nothing to show</h3>}
        {notification.length !== 0 && notification.map(u => <a>{u.content}</a>)}
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
    loadNotification: (id) => dispatch(loadUserNotification(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)