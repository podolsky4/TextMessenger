import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createLoadPosts, loadPosts, loadFavorites} from '../actions/postsActions'
import {getUser} from '../actions/userActions'
import Posts from './Posts'

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  componentDidMount () {
    const {posts, favorites, user} = this.props
    if (posts.length === 0) {
      this.props.loadPosts()
    }
    if (favorites.length === 0) {
      this.props.loadFavorites(user.id)
    }
    if (user.length === 0) {
      this.props.loadUser()
    }
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  reset = () => {
    this.setState({text: ''})
    document.getElementById('content').value = ''
  }

  onSubmit = e => {
    const {user} = this.props
    e.preventDefault()
    this.props.createPost(user.id, this.state.text)
    this.reset()
  };
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
    const {posts} = this.props
    return (
      <div>
        <form className="postCreator" onSubmit={e => this.onSubmit(e)}>
          <textarea defaultValue=""
            placeholder="Что нового?"
            maxLength={280}
            id="content"
            name="text"
            type="text"
            onKeyUp={event => this.myFunction(event)}
          />
          <button className="btn-create-post">Опубликовать</button>
        </form>
        <Posts posts={posts}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    favorites: state.favorites
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