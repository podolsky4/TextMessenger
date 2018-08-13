import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader/Loader'
import MessagesList from './MessagesList'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      flag: false
    }
  }
  onSubmit = e => {
    const {user, createPost} = this.props
    e.preventDefault()
    createPost(user.id, this.state.text)
    this.reset()
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

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)