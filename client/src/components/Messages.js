import React, {Component} from 'react'

class Messages extends Component {
  render () {
    const {data, user} = this.props
    return (
      <div className="chat">
        {data.messages.map(message => message.user.id === user
          ? <div key={message.id} className ="current">
            <h4>{message.content}</h4>
            <a>{message.createdDate}</a>
          </div>
          : <div key={message.id} className ="other">
            <h4 >{message.content}</h4>
            <a>{message.createdDate}</a>
        
          </div>
        )}
        <form onSubmit={e => this.onSubmit(e)}>
          <textarea defaultValue=""
            placeholder="Write message"
            maxLength={280}
            type="text"
          />
          <button >Отправить</button>
        </form>

      </div>

    )
  }
}

export default Messages