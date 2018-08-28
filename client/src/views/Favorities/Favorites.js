import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'
import {Redirect} from 'react-router-dom'

import {getCurrentUser} from '../../actions/userActions'

class Favorites extends Component {
  componentWillMount () {
    const {favorites, user, loadFavorites, getCurrentUserPoint} = this.props
    getCurrentUserPoint()
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
  }
  render () {
    const {favorites, user} = this.props
    if (user.length === 0) {
      return <Redirect to={`/`}/>
    }
    return (
      <div>
        <h1>Your liked posts</h1>
        <PostList posts={favorites}/>
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
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    getCurrentUserPoint: () => dispatch(getCurrentUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)