import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'

class Favorites extends Component {
  componentWillMount () {
    const {favorites, user, loadFavorites} = this.props
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
  }
  render () {
    const {favorites} = this.props
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
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)