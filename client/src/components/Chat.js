import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader/Loader'
import MessagesList from './MessagesList'
import {createMessage} from '../actions/dialogActions'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      flag: false
    }
  }
  myFunction (e) {
    if (e.key === 'Enter') {
      this.onSubmit(e)
    } else {
      this.setState({
        text: e.target.value
      })
    }
  }
  onSubmit = e => {
    const {user, addMessage, currentDialog} = this.props
    e.preventDefault()
    console.log('e.target', e.target.value)
    console.log('user', user)
    console.log('text', this.state.text)
    console.log('currentDialog', currentDialog)
    addMessage(currentDialog.id, user, this.state.text)
  };

  render () {
    const {user, fetching, messages} = this.props
    return (
      <div className="chat">
        {fetching && <Loader classes={{progress: 'root'}}/>}
        {!fetching && <MessagesList messages={messages} user={user}/>}
        {!fetching && <form onSubmit={e => this.onSubmit(e)}>
          <textarea defaultValue=""
            placeholder="Write message"
            maxLength={280}
            type="text"
            onKeyUp={event => this.myFunction(event)}
          />
          <button >Отправить</button>
        </form>

        }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.loader.fetching,
    messages: state.messages
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (dialogId, userId, text) => dispatch(createMessage(dialogId, userId, text))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)