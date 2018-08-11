import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog} from '../../actions/dialogActions'
import Dialog from '../Dialog'
import './Dialogs.css'

class Dialogs extends Component {
  componentWillMount () {
    const {user, dialogs, loadDialog} = this.props
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
  }

  handleCreateDialog = e => {
    const {user, createDialog, dialog} = this.props
    e.preventDefault()
    createDialog(user.id, dialog)
  }

  render () {
    const {user, dialogs, loadDialog} = this.props
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
              user={user}
            />
          )}
          <button onClick={e => this.handleCreateDialog(e)}>
            Create new Dialog
          </button>
        </div>
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