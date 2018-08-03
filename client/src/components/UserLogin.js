import React, {Component} from 'react'

export default class UserLogin extends Component {
  render () {
    const {login} = this.props
    return <div className="post_login">{login}</div>
  }
}