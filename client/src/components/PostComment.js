import React, {Component} from 'react'

export default class PostComment extends Component {
  render () {
    const {handleComments} = this.props
    return <a className="comment" onClick={event => handleComments(event)}>Comment</a>
  }
}