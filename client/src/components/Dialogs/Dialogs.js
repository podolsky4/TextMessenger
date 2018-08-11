import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog} from "../../actions/dialogActions"
import Dialog from '../Dialog'

class Dialogs extends Component {
  componentWillMount(){
    const {user, dialogs, loadDialog} = this.props
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
    const {user, dialogs, loadDialog} = this.props
    if (dialogs.length === 0){
      loadDialog(user.id)
    }
    let current = dialog => {
      if (dialog.id == null) {
        return(
            <Dialog
              key = {dialog.id}
              dialog = {dialog}
            />
        )
      } else {
        let currentDialog = dialogs.find(i => i.id === dialog.id)
        console.log(currentDialog)
        return (
            <Dialog
                key={dialog.id}
                dialog={currentDialog}
                owner={dialog.user}
                dialogId={dialog.id}
            />)
      }
    }
      return (
          <div>
          <div className="dialogs">
            {dialogs.map(content =>
                current(content)
            )}
          </div>
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
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)