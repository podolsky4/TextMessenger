import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog, loadMessages} from '../../actions/dialogActions'
import Dialog from '../Dialog'
import './Dialogs.css'
import Chat from '../Chat'
import SearchUser from '../SearchUser'

class Dialogs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      dialog: '',
      newDialog: false
    }
  }
  componentWillMount () {
    const {user, dialogs, loadDialog} = this.props
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
  }

  handleCreateDialog = e => {
    const {user, createDialog, dialog} = this.props
    e.preventDefault()
    // createDialog(user.id, dialog)
    if (this.state.flag) {
      this.setState({newDialog: true, flag: false})
    } else {
      this.setState({newDialog: true})
    }
  }

  handleMessages = e => {
    const {loadMessages} = this.props
    loadMessages(e.id)
    if (this.state.newDialog) {
      this.setState({
        flag: true,
        dialog: e,
        newDialog: false
      })
    } else {
      this.setState({
        flag: true,
        dialog: e
      })
    }
  }

  render () {
    const {user, dialogs, loadDialog} = this.props
    const {flag, messages, newDialog} = this.state
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
    return (
      <div className="wrap">
        <div className="dialogs">
          {dialogs.map(dialog =>
            <Dialog
              key = {dialog.id}
              dialog = {dialog}
              handleMessages = {this.handleMessages.bind(this)}
              user={user}
            />
          )}
          <button onClick={e => this.handleCreateDialog(e)}>
            Create new Dialog
          </button>
        </div>
        {flag && <Chat user={user.id} currentDialog = {this.state.dialog}/>}
        {newDialog && <SearchUser/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dialogs: state.dialogs,
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDialog: (id) => dispatch(loadDialog(id)),
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog)),
    loadMessages: (id) => dispatch(loadMessages((id)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)