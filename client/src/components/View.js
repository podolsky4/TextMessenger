import React, {Component} from 'react'
import UserLogin from './UserLogin'
import UserEmail from './UserEmail'
import UserFullName from './UserFullName'

export default class View extends Component {
  render () {
    const {user} = this.props
    return (
      <div>
        <UserLogin login={user.login}/>
        <UserEmail email={user.email}/>
        <UserFullName user={user}/>
      </div>
    )
  }
}