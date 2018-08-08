import React, {Component} from 'react'

export default class Comments extends Component {
  render () {
    const {comment} = this.props
    return <h4>{comment.content}</h4>
  }
}
