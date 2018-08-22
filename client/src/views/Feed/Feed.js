import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createLoadPosts, loadFavorites, loadPosts} from '../../actions/postsActions'
import {getCurrentUser} from '../../actions/userActions'
import PostList from '../../components/Post/PostList'
import Loader from '../../components/Loader/Loader'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper/'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import ButtonPost from '../../components/buttons/ButtonPost/ButtonPost'
import TextField from "@material-ui/core/TextField/TextField";


const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  grid: {
    flexGrow: "0",
    width: "75%",
    flexBasis: "75%",
  },
  icon: {
    paddingRight: theme.spacing.unit,
    marginTop: -4,
  },
  actions: {
    display: 'flex',
  },
  form: {
    background: "#F5F5F5",
  },
  textfield: {
    padding: "3em 1em 1em 1em",
    width: "75%",
    backgroundColor: "#fafafa",
  }
});

class Feed extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentDidMount () {

    const {loadPosts, user, loadFavorites, getCurrentUserPoint} = this.props;
    getCurrentUserPoint();
    if (user.length !== 0) {
      loadFavorites(user.id)
    }
    loadPosts()

  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  reset = () => {
    this.setState({text: ''});
    document.getElementById('content').value = ''
  };

  onSubmit = e => {
    const {user, createPost} = this.props;
    e.preventDefault();
    createPost(user.id, this.state.text);
    this.reset()
  };

  handleInput(e) {
    if (e.target.value.length > 275) {
      e.target.style.backgroundColor = "#f0ee97"
    }
    if (e.target.value.length === 280) {
      e.target.style.backgroundColor = "#E64A19"
    }
    if (e.target.value.length < 280) {
      e.target.style.backgroundColor = "#f0ee97"
    }
    if (e.target.value.length < 280) {
      e.target.style.backgroundColor = "#fafafa"
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
    const {posts, user, fetching, classes} = this.props;
    // const {reloadLoader} = this.props;
    if (user.length === 0) {
      return <Redirect to={`/`}/>
    }
    console.log(fetching);
    return (

      <div style={{padding: 15}}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={16}
        >
          <Grid className={classes.grid} item xs={12} sm={9} md={8} lg={6}>
            <Paper>
              <form className={classes.form} onSubmit={e => this.onSubmit(e)}>
                <TextField
                    defaultValue=""
                    placeholder="Share something..."
                    inputProps={{
                      maxLength:280,
                      style:
                      {borderRadius: "2px"},
                       }}
                    id="content"
                    name="text"
                    multiline
                    className={classes.textfield}
                    onKeyUp={event => this.handleInput(event)}
                  // onClick={event => Feed.handleHeight(event)} onKeyUp={event => this.handleInput(event)}
                />
                <ButtonPost flowRight/>
                {/*<button className="btn-create-post">Publish</button>*/}
              </form>
            </Paper>
          </Grid>
          {/*{reloadLoader && <Loader/>}*/}
          {/*<PostList posts={posts} user={user}/>*/}
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
    // fetching: state.loader.fetching,
    reloadLoader: state.reloadLoader,
    fetching: state.loader.loadingPost
  }
};
const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts()),
    createPost: (id, content) => dispatch(createLoadPosts(id, content)),
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    getCurrentUserPoint: () => dispatch(getCurrentUser())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feed))