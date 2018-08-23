import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createComment} from '../../../actions/postsActions'
import Comment from './Comment'
import Loader from '../../Loader/Loader'

class CommentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  reset = () => {
    this.setState({text: ''})
    document.getElementById('comment').value = ''
  };

  onSubmit = e => {
    const {user, createComments, post} = this.props
    e.preventDefault()
    createComments(post.id, user.id, this.state.text)
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
    const {comments, flag, commentReload} = this.props
    let maped = post => {
      return (
        <Comment
          key={post.id}
          comment={post}

        />)
    }
    return (
      <div>
        {flag && comments.map(i => maped(i))}
        {commentReload && <Loader/>}
        <form className="postCreator" onSubmit={e => this.onSubmit(e)}>
          <textarea defaultValue=""
            placeholder="Текст комментария"
            maxLength={120}
            id="comment"
            name="text"
            type="text"
            onKeyUp={event => this.myFunction(event)}
          />
          <button className="btn-create-post">Добавить коментарий</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    favorites: state.favorites,
    commentReload: state.loader.commentReload
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createComments: (id, userId, content) => dispatch(createComment(id, userId, content))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)