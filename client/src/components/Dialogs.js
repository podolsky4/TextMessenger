import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadDialog} from "../actions/dialogActions";

class Dialog extends Component {

  render () {
    return (
      <a>Hello from Dialog page</a>
    )
  }
}

export default connect()(Dialog)