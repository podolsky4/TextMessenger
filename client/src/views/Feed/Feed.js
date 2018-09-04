import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites, loadPosts, createPostWithOrWithOutImage, loadPagePost} from '../../actions/postsActions'
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
      text: '',
      page: 0,
      size: 3
    }
  }

  componentWillMount () {
    const {loadPosts, user, loadFavorites, pageAble} = this.props
    loadFavorites(user.id)
    // loadPosts()

    pageAble(this.state.page, this.state.size)
    this.setState({page: 1})
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
    const {createPost_Image} = this.props
    e.preventDefault()
    if (this.refs.inputFile.value) {
      let data = new FormData()
      data.append('content', this.state.text)
      data.append('file', this.refs.inputFile.files[0])
      createPost_Image(data)
      this.refs.inputFile.value = ''
    } else {
      let data = new FormData()
      data.append('content', this.state.text)
      createPost_Image(data)
    }
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
  yHandler () {
    const {pageAble} = this.props
    let wrap = document.getElementById('wrappp')
    let content = wrap.offsetHeight
    let yOffset = window.pageYOffset
    let y = yOffset + window.innerHeight
    if (y >= content) {
      pageAble(this.state.page, this.state.size)
      this.setState({page: this.state.page + 1})
    }
  }
  render () {
    const {posts, user, classes} = this.props
    const {reloadLoader} = this.props
    if (!user.id) {
      return <Redirect to={`/`}/>
    }
    window.onscroll = this.yHandler
    return (

      <div id='wrappp' style={{padding: 15}}>
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
                <form>
                  <input type="file" name="file" ref="inputFile"/>
                </form>
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
    createPost_Image: (data) => dispatch(createPostWithOrWithOutImage(data)),
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    pageAble: (page, size) => dispatch(loadPagePost(page, size))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feed))