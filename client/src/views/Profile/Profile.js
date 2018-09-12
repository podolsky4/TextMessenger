import React from 'react'
import {connect} from 'react-redux'
import CurrentUserProfile from './CurrentUserProfile'
import OtherUserProfile from './OtherUserProfile'
import Loader from '../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import {loadPosts} from '../../actions/postsActions'

const styles = (theme) => ({
  media: {
    height: 320,
    background: 'grey'
  }
})

class Profile extends React.Component {
  componentDidMount () {
    const {loadPosts} = this.props
    loadPosts()
  }
  render () {
    // loadPosts()
    const {user, match, classes, posts} = this.props

    console.log('Posts: \n', posts)
    if (!user.id) {
      return <Redirect to={`/`}/>
    }
    if (user.id === undefined) {
      return <Loader fullscreen={true}/>
    }
    let flag = user.id === +match.params.id
    let userPosts
    if (flag) {
      userPosts = posts.filter(function (post) {
          return post.user.id === user.id
        }
      )
    } else {
      userPosts = posts.filter(function (post) {
          return post.user.id === +match.params.id
        }
      )
    }

    console.log('userPosts: \n', userPosts)
    return (
      <React.Fragment>
        {flag && <CurrentUserProfile userPosts={userPosts}/>}
        {!flag && <OtherUserProfile currentUser={match.params.id} userPosts={userPosts}/>}
        <CardMedia
          className={classes.media}
          component="img"
          image={'https://picsum.photos/1400/320?gravity=north&blur'}
          title={user.name}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))