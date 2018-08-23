import React from 'react'
import {connect} from 'react-redux'
import CurrentUserProfile from './CurrentUserProfile'
import OtherUserProfile from './OtherUserProfile'
import Loader from '../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'

class Profile extends React.Component {
  render () {
    const {user, match} = this.props

    if (user.length === 0) {
      return <Redirect to={`/`}/>
    }
    if (user.id === undefined) {
      return <Loader fullscreen={true}/>
    }
    let a = user.id
    let b = match.params.id
    let flag = a == b
    return (
      <React.Fragment>
        {flag && <CurrentUserProfile/>}
        {!flag && <OtherUserProfile currentUser={match.params.id}/>}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)