import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog} from "../actions/dialogActions"
import {getUser} from "../actions/userActions"
import Dialog from './Dialog'

class Dialogs extends Component {
  componentDidMount(){
    const {user, dialogs, getUser} = this.props
    if (user.length === 0) {
      getUser()
    }
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
  }

  handleCreateDialog = e => {
    const {user, createDialog, dialog} = this.props
    e.preventDefault()
    createDialog(user.id, dialog);
  }

  render () {
    const {user, dialogs, getUser} = this.props
      return (
        <div>
          {dialogs.map(dialog => {
            <Dialog key = {dialog.id} data = {dialog}/>
          })}
          <button onClick={e => this.handleCreateDialog(e)}>
            Create new Dialog
          </button>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dialogs: state.dialogs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDialog: (id) => dispatch(loadDialog(id)),
    getUser: () => dispatch(getUser()),
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)