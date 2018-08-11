import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog} from "../../actions/dialogActions"
import Dialog from '../Dialog'

class Dialogs extends Component {
  componentDidMount(){
    const {user, dialogs} = this.props
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
    const {user, dialogs} = this.props
    if (dialogs){
      loadDialog(user.id)
    }
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
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)