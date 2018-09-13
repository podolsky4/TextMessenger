import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class ConfirmRegistration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  componentWillMount () {
    const {token} = this.props.match.params
    fetch(`/api/users/registered/${token}`)
      .then(res => res.json())
      .then(data => this.setState({message: data.message}))
  }
  render () {
    return (
      <Fragment>
       <h3>{this.state.message}</h3>

      <Link to='/feed' >to home page</Link>
      </Fragment>
    )
  }
}