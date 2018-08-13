import React, {Component} from 'react'
import Message from './Message'

class MessagesList extends Component {
  render () {
    const {messages, user} = this.props
    return (
      <div className="posts">
        {messages.map(function (message) {
          return <Message key={message.id} message = {message} user={user}/>
        })}
      </div>
    )
  }
}

export default MessagesList