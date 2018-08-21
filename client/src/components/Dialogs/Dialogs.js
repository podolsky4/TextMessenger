import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog, loadMessages, cleanUserSearch} from '../../actions/dialogActions'
import Dialog from '../Dialog'
import './Dialogs.css'
import Chat from './Chat'
import SearchUser from '../SearchUser'
import {Redirect} from "react-router-dom";

class Dialogs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      dialog: '',
      newDialog: false,
      userList: false,
      exist: false
    }
  }
  componentWillMount () {
    const {user, dialogs, loadDialog} = this.props
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
  }

  handleCreateDialog = e => {
    e.preventDefault()
    if (this.state.flag) {
      this.setState({newDialog: true, flag: false})
    } else if (this.state.userList) {
      this.setState({newDialog: true, userList: false})
    } else {
      this.setState({newDialog: true})
    }
  }

  handleMessages = e => {
    const {loadMessages, cleanUserSearch} = this.props
    loadMessages(e.id)
    if (this.state.newDialog) {
      this.setState({
        flag: true,
        dialog: e,
        newDialog: false
      })
    } else if (this.state.userList) {
      this.setState({
        flag: true,
        dialog: e,
        userList: false
      })
    } else {
      this.setState({
        flag: true,
        dialog: e
      })
    }
    cleanUserSearch()
  }

  addUserToDialog = e => {
    const {cleanUserSearch} = this.props
    cleanUserSearch()
    console.log('e', e.target.value)
    this.setState({
      flag: false,
      newDialog: true,
      exist: true,
      dialog: e.target.value
    })
  }

  render () {
    const {user, dialogs, loadDialog} = this.props
    const {flag, newDialog} = this.state
    if (user.length == 0) {
      return <Redirect to={`/`}/>
    }
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
              addUserToDialog = {this.addUserToDialog.bind(this)}
            />
          )}
          <button onClick={e => this.handleCreateDialog(e)}>
            Create new Dialog
          </button>
        </div>
        {flag && <Chat user={user.id} currentDialog = {this.state.dialog}/>}
        {newDialog &&
        <SearchUser
          exist={this.state.exist}
          dialog={this.state.dialog}
        />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dialogs: state.dialogs,
    messages: state.messages,
    searchUser: state.searchUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDialog: (id) => dispatch(loadDialog(id)),
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog)),
    loadMessages: (id) => dispatch(loadMessages((id))),
    cleanUserSearch: () => dispatch(cleanUserSearch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)