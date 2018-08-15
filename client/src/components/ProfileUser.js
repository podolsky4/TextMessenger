import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFollowing, getUser, addFollowing, deleteFollowing} from '../actions/userActions'
import Loader from '../components/Loader/Loader'

class ProfileUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userFromPost: '',
      areYouFollow: false
    }
  }

  componentWillMount () {
    const {match, loadFollowing, user, following} = this.props
    if (this.state.userFromPost.length === 0) {
      fetch(`/api/users/${match.params.id}`)
        .then(res => res.json())
        .then(data => this.setState({userFromPost: data}))
        .then(loadFollowing(user.id))
    }
    if (following.length !== 0) {
      following.some(u => u.id === match.params.id)
        ? this.setState({areYouFollow: true})
        : this.setState({areYouFollow: false})
    }
  }
  handleFollowing = e => {
    const {user, addToFollowing, deleteFromFollowing} = this.props
    if (this.state.areYouFollow) {
      deleteFromFollowing(user.id, this.state.userFromPost.id)
      this.setState({areYouFollow: false})
    } else {
      addToFollowing(user.id, this.state.userFromPost.id)
      this.setState({areYouFollow: true})
    }
  }

  render () {
    const {userFromPost} = this.state
    if (this.state.userFromPost.length === 0) {
      return <Loader fullscreen={true}/>
    }

    return (
      <div>
        <h1>{userFromPost.login}</h1>
        <h1>{userFromPost.lastName}</h1>
        <h1>{userFromPost.firstName}</h1>
        <h1>{userFromPost.email}</h1>
        <button onClick={e => this.handleFollowing(e)}>{this.state.areYouFollow ? 'Unfolow' : 'Following'}</button>
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
    loadUser: () => dispatch(getUser()),
    loadFollowing: (id) => dispatch(getFollowing(id)),
    addToFollowing: (id, userId) => dispatch(addFollowing(id, userId)),
    deleteFromFollowing: (id, userId) => dispatch(deleteFollowing(id, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)