import React, {Component} from 'react'

export default class Like extends Component {
  render () {
    const {favorites, post, handleLike} = this.props
    return <a className={favorites.some(p => p.id === post.id) ? 'like--checked' : 'like'}
      onClick={event => handleLike(event)}>Like</a>
  }
}