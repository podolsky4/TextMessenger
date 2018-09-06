import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader/Loader'
import MessagesList from '../MessagesList'
import {createMessage} from '../../actions/dialogActions'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import SubmitButton from '../../components/buttons/ButtonSubmit/ButtonSubmit'
import classnames from 'classnames'
import {webSocketDialog} from '../../actions/ws'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  text: {
    width: '73%',
    padding: '8px'
  },
  textarea: {
    borderRadius: '2px'
  }
})

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      flag: false
    }
  }
  componentDidMount () {
    webSocketDialog(console.log)
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
    addMessage(currentDialog.id, user, this.state.text)
  };

  render () {
    const {user, fetching, messages, classes} = this.props
    return (
      <div className="chat">
        {fetching && <Loader classes={{progress: 'root'}}/>}
        {!fetching && <MessagesList messages={messages} user={user}/>}
        {!fetching &&
          <form onSubmit={e => this.onSubmit(e)} className={classes.container}>
            <TextField
              defaultValue=""
              placeholder=" Write message"
              maxLength={280}
              type="text"
              onKeyUp={event => this.myFunction(event)}
              className={classnames(classes.margin, classes.text, 'messageInput')}
              label="Your Message"
              id="messageInput"
              backgroundColor="white"
              multiline
              autoFocus
              white
            >
            </TextField>
            <SubmitButton/>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat))