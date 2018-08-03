import React, {Component} from 'react'
import UserLogin from './UserLogin'
import UserEmail from './UserEmail'

export default class UserHeaderInfo extends Component {
  render () {
    const {user} = this.props
    return (
        <div className="user_info">
          <UserLogin login={user.login}/>
          <UserEmail email={user.email}/>
        </div>
    )
  }
}