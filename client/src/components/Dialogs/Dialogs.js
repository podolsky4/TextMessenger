import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog, createDialog} from '../../actions/dialogActions'
import Dialog from '../Dialog'
import './Dialogs.css'
import Messages from '../Messages'

class Dialogs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      dialog: ''
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
    createDialog(user.id, dialog)
  }

  handleMessages = e => {
    this.setState({
      flag: true,
      dialog: e
    })
  }

  render () {
    const {user, dialogs, loadDialog} = this.props
    const {flag, dialog} = this.state
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
        {flag && <Messages data={dialog} user={user.id}/>}
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