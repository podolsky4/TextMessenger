import React, {Component} from 'react'

class Dialog extends Component {
  render () {
    const {user} = this.props
    const {users} = this.props.dialog
    return (
      <div className="dialog">
        {users.map(member => member.id !== user.id ? <a>{member.email}</a> : '')}
      </div>

    )
  }
}

export default Dialog