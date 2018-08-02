import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites} from '../actions/postsActions'
import Posts from './Posts'

class Favorites extends Component {
  componentWillMount () {
    this.props.loadFavorites(this.props.user.id)
  }
  render () {
    const {favorites} = this.props
    return (
      <div>
        <h1>Your liked posts</h1>
        <Posts posts={favorites.reverse()}/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)