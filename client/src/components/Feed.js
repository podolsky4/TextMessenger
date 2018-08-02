import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createLoadPosts, loadPosts} from '../actions/postsActions'
import Posts from './Posts'

class Feed extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  onSubmit = e => {
    e.preventDefault()
    this.props.createPost(this.props.user.id, this.state.text)
    e.target.reset()
  };

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {
    if (this.props.posts.length === 0) {
      this.props.loadPosts()
    }
  }

  render () {
    const {posts} = this.props

    if (!posts) {
      return <a> Loading ...</a>
    }

    return (
      <div>
        <form className="postCreator" onSubmit={e => this.onSubmit(e)}>
          <label>
              Чем делимся:
            <br/>
            <textarea rows={5} cols={60} maxLength={280} id="content" name="text" type="text"
              onChange={e => this.change(e)}/>
          </label>
          <br/>
          <button>Опубликовать</button>
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
    createPost: (id, content) => dispatch(createLoadPosts(id, content))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feed)