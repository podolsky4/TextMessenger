import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dialog extends Component {
  componentDidMount(){

  }

  handleAddUser = user => {

  }

  render () {

    const {user, dialog} = this.props

    return(
        <a>{dialog.id}</a>
        /*<div>

          <form>
            <label>
              Find user
              <input/>
            </label>
            <button onClick={this.handleAddUser(user)}>
              Add user
            </button>
          </form>


        </div>*/
    )
  }


}

export default Dialog