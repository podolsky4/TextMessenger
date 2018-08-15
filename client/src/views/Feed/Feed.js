import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLoadPosts, loadFavorites, loadPosts } from '../../actions/postsActions'
import { getUser } from '../../actions/userActions'
import PostList from '../../components/Post/PostList'
import Loader from '../../components/Loader/Loader'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper/'


class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {
    const {posts, favorites, user, loadPosts, loadFavorites, loadUser} = this.props
    if (posts.length === 0) {
      loadPosts()
    }
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
    if (user.length === 0) {
      loadUser()
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  reset = () => {
    this.setState({text: ''})
    document.getElementById('content').value = ''
  }

  onSubmit = e => {
    const {user, createPost} = this.props
    e.preventDefault()
    createPost(user.id, this.state.text)
    this.reset()
  }

  myFunction (e) {
    if (e.key === 'Enter') {
      this.onSubmit(e)
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  render () {
    const {posts, user, fetching} = this.props
    console.log(fetching)
    return (

      <div style={{padding: 15}}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={16}
        >
          <Grid item xs={12} sm={9} md={8} lg={6}>
            <Paper>
              <form onSubmit={e => this.onSubmit(e)}>
                <textarea defaultValue=""
                    placeholder="Type what to share..."
                    maxLength={280}
                    id="content"
                    name="text" onKeyUp={event => this.myFunction(event)}
                />
                <button className="btn-create-post">Publish</button>
              </form>
            </Paper>
          </Grid>

          {fetching && <Loader/>}
          {!fetching && <PostList posts={posts} user={user}/>}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    favorites: state.favorites,
    fetching: state.loader.fetching
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts()),
    createPost: (id, content) => dispatch(createLoadPosts(id, content)),
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    loadUser: () => dispatch(getUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feed)