import React, {Component} from 'react'

export default class PostRetwite extends Component {
  render () {
    const {whoo, handleRetwite} = this.props
    return <a className={ whoo ? 'tweet--checked' : 'tweet'}
      onClick={event => handleRetwite(event)}>Retweet</a>
  }
}