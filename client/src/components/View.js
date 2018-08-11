import React, {Component} from 'react'
import UserLogin from './User/UserLogin'
import UserEmail from './User/UserEmail'
import UserFullName from './User/UserFullName'

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