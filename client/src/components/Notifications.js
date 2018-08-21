import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'

class Notifications extends Component {
  render () {
    const {user} = this.props
    if (user.length === 0) {
      return <Redirect to={`/`}/>
    }
    return (
      <a>Notifications page</a>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Notifications)