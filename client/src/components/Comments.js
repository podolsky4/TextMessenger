import React, {Component} from 'react'

export default class Comments extends Component {
  render () {
    const {comment} = this.props
    return <a> Your comment here</a>
  }
}