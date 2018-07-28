import React, { Component } from 'react';
import {connect} from 'react-redux';
import {readUserProfile} from '../actions/userProfileActions';
import {UPDATE_USER_BIRTHDAY, UPDATE_USER_ADRESS, UPDATE_USER_LASTNAME, UPDATE_USER_NAME, UPDATE_USER_PASSWORD, UPDATE_USER_PROFILE_HEADER, UPDATE_USER_PROFILE_PHOTO} from '../actions/types';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state={
      login:'',
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      profileHeader:'',
      profilePhoto:'',
      dateBirthday:''
    };
  }
  render () {
    return (
        <div>
          <h1>
            Hello, {readUserProfile.firstName}
          </h1>
          <h2>
            Your age is: {readUserProfile.dateBirthday}
          </h2>
          <form></form>
          <form></form>
          <form></form>
          <form></form>
          <form></form>
          <form></form>
        </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    readUserProfile: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserName: newName => dispatch({
      type: UPDATE_USER_NAME,
      payload: newName
    })
  }
};

export default connect(mapStateToProps, MapDispatchToProps)(Profile);