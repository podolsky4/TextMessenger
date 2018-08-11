import React, {Component} from 'react'

class Messages extends Component {
  render () {
    const {data, user} = this.props
    return (
      <div className="chat">
        {data.messages.map((message, index) => message.user.id === user ? 
       <div className ="current">
       <h4  key={index}>{message.content}</h4>
           <a>{message.createdDate}</a>
        </div>
        :
        <div className ="other">
        <h4  key={index}>{message.content}</h4>
            <a>{message.createdDate}</a>
        
        </div>
    )}
     <form onSubmit={e => this.onSubmit(e)}>
          <textarea defaultValue=""
            placeholder="Write message"
            maxLength={280}
            id="content"
            name="text"
            type="text"
            onKeyUp={event => this.myFunction(event)}
          />
          <button >Отправить</button>
        </form>

      </div>

    )
  }
}

export default Messages