import React, {Component} from 'react'

export default class PostRetwite extends Component {
  render () {
    const {whoo, handleRetwite} = this.props
    const text = whoo ? 'Remove retweet' : 'Retweet'
    return <a className={ whoo ? 'tweet--checked' : 'tweet'}
      onClick={event => handleRetwite(event)}>{text}</a>
  }
}