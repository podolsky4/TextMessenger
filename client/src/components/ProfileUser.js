import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'

class ProfileUser extends Component {
  render () {
    const {match} = this.props
    return <h1>from profile user {match.params.id}</h1>
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(getUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)