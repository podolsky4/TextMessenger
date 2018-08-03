import React, {Component} from 'react'

export default class PostContent extends Component {
  render () {
    const {content} = this.props
    return <p className="post_content">{content}</p>
  }
}