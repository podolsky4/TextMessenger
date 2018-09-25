import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessagesList from './MessagesList'
import {createMessage} from '../../actions/dialogActions'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import SubmitButton from '../../components/buttons/ButtonSubmit/ButtonSubmit'
import classnames from 'classnames'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    background: '#fafafaf7',
    borderRadius: '1px 1px 2px 2px'
  },
  margin: {
    margin: theme.spacing.unit
  },
  text: {
    width: '73%',
    padding: '8px',

      '@media (max-width: 715px)': {
          width: '100%',
          margin: 5,
      }
  },
  textarea: {
    borderRadius: '2px'
  },
  chat: {
    flexBasis: 1,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 620,
    minWidth: 300,
    borderRadius: 6,
    padding: '14px 2px',
    background: '#00897B',
    marginTop: 65,
    marginRight: 'auto',
    marginLeft: 'auto',
      '@media (max-width: 715px)': {
          marginTop: 16,
      },
      '@media (max-width: 1020px)': {
          maxWidth: 500,
      },
      '@media (max-width: 850px)': {
          maxWidth: 380,
      },
      '@media (max-width: 500px)': {
          maxWidth: 250,
      },
  },


})

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
    const {user, addMessage, currentDialog} = this.props,
      {text} = this.state
    e.preventDefault()
    addMessage(currentDialog.id, user, text)
    this.messageInput.value = ''
    this.setState({
      text: ''
    })
  };

  render () {
    const {user, messages, classes} = this.props
    return (
      <div className={classes.chat}>
         <MessagesList messages={messages} user={user}/>
        <form onSubmit={e => this.onSubmit(e)} className={classes.container}>
          <TextField
            defaultValue={null}
            placeholder=" Write message"
            maxLength={280}
            type="text"
            inputRef={(el) => this.messageInput = el}
            onKeyUp={event => this.myFunction(event)}
            className={classnames(classes.margin, classes.text, 'messageInput')}
            label="Your Message"
            id="messageInput"
            backgroundcolor="white"
            multiline
            autoFocus
            required
          >
          </TextField>
          <SubmitButton/>
        </form>
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