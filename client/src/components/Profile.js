import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createUser} from "../actions/userActions";

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
      dateBirthday:'',
      readOnly: true,
      disabled: true
    };
  }

  change = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  };

  editableField = () => {
    this.setState({
      readOnly: !this.state.readOnly,
      disabled: !this.state.disabled
    })
  };

  updateUser = e => {
    e.preventDefault();
    let data = this.state;
    fetch('http://localhost:9000/users/user',
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(()=>this.props.loadUser(this.state.login));
    this.editableField();
  };

  render () {
    return (
        <div>
            <h1>Hello, {this.state.firstName} {this.state.lastName} </h1>
            <p>your are login with {this.state.login} and email {this.state.email}</p>
          <form>
            <input id='password-change' name='password' type='password' onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='firstName-change' name='firstName' type='text' value={this.state.firstName} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='lastName-change' name='lastName' type='text' value={this.state.lastName} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='address-change' name='address' type='text' value={this.state.address} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='profileHeader-change' name='profileHeader' type='url' value={this.state.profileHeader} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='profilePhoto-change' name='profilePhoto' type='url' value={this.state.profilePhoto} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input id='dateBirth-change' name='dateBirth' type='date' value={this.state.dateBirthday} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            <input type='button' name='Edit' value='Edit' onClick={this.editableField}/>
            <input type='button' name='Apply' value='Apply' onClick={e => this.updateUser(e)} disabled={this.state.disabled}/>
          </form>
        </div>
    )
  }
};



const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (login) => dispatch(createUser(login))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);