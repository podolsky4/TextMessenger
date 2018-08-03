import React, {Component} from 'react'

export default class UserFullName extends Component {
  render () {
    const {user} = this.props
    return <div className="user_fullname">{`${user.firstName}  ${user.lastName}`}</div>
  }
}