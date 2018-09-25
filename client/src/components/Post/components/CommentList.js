import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {createComment} from '../../../actions/postsActions'
import Comment from './Comment'
import Loader from '../../Loader/Loader'
import {Button, List, TextField} from '@material-ui/core/umd/material-ui.production.min'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  CommentTextField: {
    display: 'flex',
    width: '100%',
    marginRight: 32
  },
  postCreator: {
    display: 'flex',
    alignItems: 'start',
    margin: 16,
    width: '94%',
    justifyContent: 'space-between',
  },
  btnCreatePost: {

  },
  listik:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  }
})

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
    const {user, createComments, post} = this.props,
      {text} = this.state
    e.preventDefault()
    if (text.length > 0){
      createComments(post.id, user.id, text)
    }
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
    const {comments, flag, commentReload, classes, notInput} = this.props
    let maped = post => {
      return (
            <Comment
                key={post.id}
                comment={post}
            />
      )
    }

    return (
      <div className="ListCommentInner">
        {flag &&
          <Fragment>
             <hr />
            <h3 style={{textAlign:'center'}}>People how comment you post</h3>
            <List className={classes.listik} dense>
                {comments.map(i => maped(i))}
            </List>
          </Fragment>
        }
        {commentReload && <Loader/>}
        {notInput === undefined &&
        <form className={classnames(classes.postCreator, 'postCreator')} onSubmit={e => this.onSubmit(e)}>
          <div className={classes.CommentTextField}>
            <TextField defaultValue=""
                       placeholder="Comment..."
                       maxLength={120}
                       id="comment"
                       name="text"
                       fullWidth
                       required
                       autoFocus
                       type="text"
                       helperText={'Enter more that 3 symbols long comment, please'}
                       inputProps={{
                         maxLength: 120,
                         minLength: 1,
                         required: true,
                         padding: '3.7% 0 7px',
                         style:
                           {borderRadius: '2px'}
                       }}
                       minlenght={3}
                       onKeyUp={event => this.myFunction(event)}
            />
          </div>
          <Button variant='flat'
                  onClick={event => this.onSubmit(event)}
                  className={classes.btnCreatePost}>Comment</Button>
        </form>
        }
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CommentList))