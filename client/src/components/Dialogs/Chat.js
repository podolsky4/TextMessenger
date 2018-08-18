import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader/Loader'
import MessagesList from '../MessagesList'
import {createMessage} from '../../actions/dialogActions'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SubmitButton from '../../components/buttons/ButtonSubmit/ButtonSubmit'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
});


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
                  placeholder="Write message"
                  maxLength={280}
                  type="text"
                  onKeyUp={event => this.myFunction(event)}
                  className={classes.margin}
                  label="Your Message"
                  id="messageInput"
                  fullWidth
                  backgroundColor="white"
                  multiline
                  autoFocus
                  white
              />
                <SubmitButton />
          {/*<button >Отправить</button>*/}
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