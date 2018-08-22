import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addFollowing, deleteFollowing, getFollowing, getUser} from '../../actions/userActions'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'

class OtherUserProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userFromPost: '',
      areYouFollow: ''
    }
  }
  componentWillMount () {
    const {currentUser, loadFollowing, user} = this.props;
    if (this.state.userFromPost.length === 0) {
      fetch(`/api/users/${currentUser}`)
        .then(res => res.json())
        .then(data => this.setState({userFromPost: data}))
        .then(loadFollowing(user.id))
    }
  }
  handleFollowing = e => {
    const {user, addToFollowing, deleteFromFollowing, following, currentUser} = this.props;

    if (following.some(u => u.id === currentUser)) {

      deleteFromFollowing(user.id, this.state.userFromPost.id)
    } else {
      addToFollowing(user.id, this.state.userFromPost.id)
    }
  };

  render () {
    const {userFromPost} = this.state;
    const {following, currentUser} = this.props;
    if (this.state.userFromPost.length === 0) {
      return <Loader fullscreen={true}/>
    }
    return (
      <div>
        <h1>{userFromPost.login}</h1>
        <h1>{userFromPost.lastName}</h1>
        <h1>{userFromPost.firstName}</h1>
        <h1>{userFromPost.email}</h1>

        <button onClick={e => this.handleFollowing(e)}>{following.some(u => u.id === currentUser) ? 'Unfolow' : 'Following'}</button>

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    following: state.following
  }
};
const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(getUser()),
    loadFollowing: (id) => dispatch(getFollowing(id)),
    addToFollowing: (id, userId) => dispatch(addFollowing(id, userId)),
    deleteFromFollowing: (id, userId) => dispatch(deleteFollowing(id, userId))
  }
};
OtherUserProfile.propTypes = {
  currentUser: PropTypes.string.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile)