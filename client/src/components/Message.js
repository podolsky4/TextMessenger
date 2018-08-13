import React, {Component} from 'react'

class Message extends Component {
  render () {
    const {message, user} = this.props

    return (
      <div className={message.user.id === user ? 'current' : 'other'}>
        <h4>{message.content}</h4>
        <a>{message.createdDate}</a>
      </div>
    )
  }
}
export default Message