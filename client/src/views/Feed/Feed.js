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
import IconButton from '@material-ui/core/IconButton/IconButton'
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import Input from '@material-ui/core/es/Input/Input'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
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
    width: '73%'
  },
  paper: {
    width: '100%',
    maxWidth: '700px',
    justifyItems: 'stretch'
  }
  // textField: {
  //   flexBasis: 200,
  // },
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
            alignItems="stretch"
            lg={8} sm={12} md={10}>
            <Paper className={classes.paper}>
              <form className={classes.form}
                alignItems="flex-end"
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
                      {borderRadius: '2px'}

                  }}
                  id="content"
                  name="text"
                  multiline
                  className={classes.textfield}
                  onKeyUp={event => this.handleInput(event)}
                  endAdornment={

                    <InputAdornment position="end">
                      <Input type="file" name="file" ref="inputFile"/>
                      <IconButton

                        aria-label="upload"
                      >
                        <ButtonUploadFloating classes>
                        </ButtonUploadFloating>
                      </IconButton>
                    </InputAdornment>

                  }
                >
                </Input>
                </FormControl>
                {/* <form> */}
                  {/* <input type="file" name="file" ref="inputFile"/> */}
                {/* </form> */}
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