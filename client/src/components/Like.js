import React, {Component} from 'react'

export default class Like extends Component {
  render () {
    const {favorites, post} = this.props
    return <a className={favorites.some(p => p.id === post.id) ? 'like--checked' : 'like'}
      onClick={event => this.handleLike(event)}>Like</a>
  }
}