import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createPostWithOrWithOutImage, loadFavorites, loadPagePost} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'
import Loader from '../../components/Loader/Loader'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper/'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import ButtonPost from '../../components/buttons/ButtonPost/ButtonPost'
import ButtonUploadFloating from '../../components/buttons/ButtonUploadFloating'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Input from '@material-ui/core/Input/Input'
import classNames from 'classnames'
import Button from '../../../node_modules/@material-ui/core/Button/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
      justifyContent: 'center',
  },
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
  textField: {
    padding: '30px 8px 16px 16px',
    alignSelf: 'flex-end',
    width: '73%',
    alignItems: 'flex-end'
  },
  paper: {
    width: '100%',
    // maxWidth: '700px',
    justifyItems: 'stretch',
    borderRadius: 3,
      maxWidth: 862
  },
  gridItem: {
      padding: 4
  },
  textfield: {
    alignItems: 'flex-end'
  },
    button: {
        alignItems: 'flex-end'
    }
})

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      page: 0,
      size: 3,
      changenameeed: ''
    }
  }

  componentDidMount () {
    const {user, favorites, loadFavorites, pageAble} = this.props
    const {size, page} = this.state
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
    pageAble(page, size, this.setState.bind(this, {page: page + 1}))
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
    const {pageAble, able, fetching} = this.props
    const {page, size} = this.state
    if (window.location.pathname === '/feed') {
      if (fetching) {
        return
      }
      let wrap = document.getElementById('wrappp')
      let content = wrap.offsetHeight
      let yOffset = window.pageYOffset
      let y = yOffset + window.innerHeight - 10
      if (able && y >= content) {
        pageAble(page, size, this.setState.bind(this, {page: this.state.page + 1}))
      }
    }
  }

  changeName = e => {
    this.setState({changenameeed: this.refs.inputFile.files[0].name})
  }
  render () {
    const {able, posts, user, classes} = this.props
    const {reloadLoader} = this.props
    const upload = <ButtonUploadFloating />
    if (!user.id) {
      return <Redirect to={`/`}/>
    }
    if (able) {
      window.onscroll = this.yHandler.bind(this)
    }
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
            alignItems="center"
            direction="column"
          >
              <Grid item
                    xs={12} sm={10} lg={6} md={7}
                    className={classes.gridItem}
              >
                 <Paper className={classes.paper}>
              <form className={classes.form}
                onSubmit={e => this.onSubmit(e)}>
                <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
                <Input
                  children = {upload}
                  defaultValue=""
                  fullWidth
                  placeholder="Share something..."
                  inputProps={{
                    maxLength: 280,
                    padding: '3.7% 0 7px',
                    style:
                      {borderRadius: '2px',
                      }
                  }}
                  id="content"
                  name="text"
                  required
                  multiline
                  className={classes.textfield}
                  onKeyUp={event => this.handleInput(event)}
                  endAdornment={
                    <InputAdornment position="end">
                      <input
                        accept="image/*"
                        className={classes.input}
                        type="file"
                        name="file"
                        id="file"
                        ref="inputFile"
                        onChange={e => this.changeName(e)}
                        style={{display: 'none'}}
                      />
                      <label htmlFor="file">
                        <Button raised='true' component="span" className={classes.button}>Upload</Button>
                      </label>

                    </InputAdornment>
                  }
                >
                </Input>
                  {<a>{this.state.changenameeed}</a>}
                </FormControl>
                <ButtonPost flowRight/>
              </form>
              {reloadLoader && <Loader/>}
            </Paper>
              </Grid>
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
    fetching: state.loader.loadingPost,
    able: state.able.postAble
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createPost_Image: (data) => dispatch(createPostWithOrWithOutImage(data)),
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    pageAble: (page, size, call) => dispatch(loadPagePost(page, size, call))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feed))