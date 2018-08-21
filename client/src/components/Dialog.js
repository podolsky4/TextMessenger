import React, {Component} from 'react'

class Dialog extends Component {
  render () {
    const {user, handleMessages, dialog, addUserToDialog} = this.props
    const {users} = this.props.dialog
    return (
      <div className="dialog">
        {users.map(member => member.id !== user.id ? <a key={member.id} onClick = {e => handleMessages(dialog)}>{member.email}</a> : '')}
        <button value={dialog.id} onClick={e => addUserToDialog(e)}>Add user</button>
      </div>

    )
  }
}

export default Dialog