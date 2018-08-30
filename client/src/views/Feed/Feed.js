import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createLoadPosts, loadFavorites, loadPosts} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'
import Loader from '../../components/Loader/Loader'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper/'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import ButtonPost from '../../components/buttons/ButtonPost/ButtonPost'
import TextField from '@material-ui/core/TextField/TextField'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  // grid: {
  //   flexGrow: '0',
  //   width: '75%',
  //   flexBasis: '75%'
  // },
  icon: {
    paddingRight: theme.spacing.unit,
    marginTop: -4
  },
  actions: {
    display: 'flex'
  },
  form: {
    background: '#fafafa',
    display: 'flex',
    justifyContent: 'space-around'
  },
  textfield: {
    padding: '30px 8px 16px 16px',
    alignSelf: 'flex-end',
    width: '73%'
  },
  paper: {
    width: '100%',
    maxWidth: '700px',
    justifyItems: 'stretch'
  }
})

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentWillMount () {
    const {loadPosts, user, loadFavorites} = this.props
    loadFavorites(user.id)

    loadPosts()
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  reset = () => {
    this.setState({text: ''})
    document.getElementById('content').value = ''
  };

  onSubmit = e => {
    const {user, createPost} = this.props
    e.preventDefault()
    createPost(user.id, this.state.text)
    this.reset()
  };

  handleInput (e) {
    if (e.target.value.length > 275) {
      e.target.style.backgroundColor = '#f0ee97'
    }
    if (e.target.value.length === 280) {
      e.target.style.backgroundColor = '#E64A19'
    }
    if (e.target.value.length < 280) {
      e.target.style.backgroundColor = '#f0ee97'
    }
    if (e.target.value.length < 275) {
      e.target.style.backgroundColor = '#fafafa'
    }
    if (e.key === 'Enter') {
      this.onSubmit(e)
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  render () {
    const {posts, user, fetching, classes} = this.props
    const {reloadLoader} = this.props
    if (!user) {
      return <Redirect to={`/`}/>
    }
    return (

      <div style={{padding: 15}}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid container
            justify="center"
            alignItems="stretch"
            lg={10} sm={12} md={10}>
            <Paper className={classes.paper}>
              <form className={classes.form}
                alignItems="flex-end"
                onSubmit={e => this.onSubmit(e)}>
                <TextField
                  defaultValue=""
                  placeholder="Share something..."
                  inputProps={{
                    maxLength: 280,
                    padding: '3.7% 0 7px',
                    style:
                            {borderRadius: '2px'}
                  }}
                  id="content"
                  name="text"
                  multiline
                  className={classes.textfield}
                  onKeyUp={event => this.handleInput(event)}

                />
                <ButtonPost flowRight/>
              </form>
              {reloadLoader && <Loader/>}
            </Paper>

            <PostList posts={posts} user={user}/>
          </Grid>
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
    reloadLoader: state.reloadLoader,
    fetching: state.loader.loadingPost
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts()),
    createPost: (id, content) => dispatch(createLoadPosts(id, content)),
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feed))