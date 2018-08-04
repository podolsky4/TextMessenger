import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog} from "../actions/dialogActions"
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

  render () {
    const {user, dialogs, getUser} = this.props
    return (
        <div>
          {dialogs.map(dialog => {
            <Dialog key = {dialog.id} data = {dialog}/>
          })}

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
    getUser: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)