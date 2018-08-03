import React, {Component} from 'react'

export default class UserEmail extends Component {
  render () {
    const {email} = this.props
    return <div className="post_email">{email}</div>
  }
}