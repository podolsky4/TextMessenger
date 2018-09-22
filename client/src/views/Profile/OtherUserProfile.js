import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFollowing, deleteFollowing, getFollowing } from '../../actions/userActions'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import CurrentUserInfo from './CurrentUserInfo'
import { withStyles } from '@material-ui/core/styles/index'
import PostList from '../../components/Post/PostList'
import FetchData from '../../actions/serviceAction'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  ChangeUserProfileInfoCard: {
    Width: '25%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-between',
    alignContent: 'center',
    '*': {
      borderRadius: '2px',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  },
  ProfileCnt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    padding: '32px',
    background: '#009688'
  },
  UserInfoCnt: {
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    maxWidth: 'fit-content',
    margin: '0 auto',
    textAlign: 'center'
  },
  userPostList: {
    flexBasis: 1,
    flexGrow: 5,
    flexShrink: 1,
    width: 500,
    maxWidth: 862,
    minWidth: 400,
    borderRadius: 6,
    padding: '1em',
    background: '#00897B'
  }
})

class OtherUserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userFromPost: '',
      areYouFollow: ''
    }
  }

  componentDidMount () {
    const {currentUser} = this.props
    if (this.state.userFromPost.length === 0) {
      FetchData.get(`/api/users/${currentUser}`)
        .then(res => res.json())
        .then(data => this.setState({userFromPost: data}))
    }
  }

  handleFollowing = e => {
    const {user, addToFollowing, deleteFromFollowing, following, currentUser} = this.props

    if (following.some(u => u.id === +currentUser)) {
      deleteFromFollowing(user.id, this.state.userFromPost.id)
    } else {
      addToFollowing(user.id, this.state.userFromPost.id)
    }
  }

  render () {
    const {userFromPost} = this.state
    const {following, currentUser, classes, userPosts} = this.props
    if (this.state.userFromPost.length === 0) {
      return <Loader fullscreen={true}/>
    }
    return (
      <div className={classes.ProfileCnt}>
        <div className={classes.UserInfoCnt}>
          <CurrentUserInfo user={userFromPost}/>
          <Button variant="contained"
                  color="primary"
                  onClick={e => this.handleFollowing(e)}
          >
            {following.some(u => u.id === +currentUser) ? 'Unfolow' : 'Following'}
          </Button>
        </div>
        <PostList user={userFromPost}
                  posts={userPosts}
                  className={classes.userPostList}
                  classes
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    following: state.following
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadFollowing: (id) => dispatch(getFollowing(id)),
    addToFollowing: (id, userId) => dispatch(addFollowing(id, userId)),
    deleteFromFollowing: (id, userId) => dispatch(deleteFollowing(id, userId))
  }
}
OtherUserProfile.propTypes = {
  currentUser: PropTypes.string.isRequired
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile))