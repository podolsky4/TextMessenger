import React from 'react'
import { connect } from 'react-redux'
import CurrentUserProfile from './CurrentUserProfile'
import OtherUserProfile from './OtherUserProfile'
import Loader from '../../components/Loader/Loader'
import { Redirect } from 'react-router-dom'

import { loadPosts } from '../../actions/postsActions'

class Profile extends React.Component {
  componentDidMount () {
    const {loadPosts} = this.props
    loadPosts()
  }

  render () {
    const {user, match, posts} = this.props
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

    return (
      <React.Fragment>
        {flag && <CurrentUserProfile userPosts={userPosts}/>}
        {!flag && <OtherUserProfile currentUser={match.params.id} userPosts={userPosts}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)