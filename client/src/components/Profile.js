<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, {Component} from 'react';
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab
import {connect} from 'react-redux';
import {createUser} from "../actions/userActions";

class Profile extends Component {
<<<<<<< HEAD
  constructor (props) {
    super(props);
    this.state={
      login:this.props.user.login,
      email:this.props.user.email,
      password:this.props.user.password,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      address:this.props.user.address,
      profileHeader:this.props.user.profileHeader,
      profilePhoto: this.props.user.profilePhoto,
      dateBirthday:this.props.user.dateBirthday,
=======
  constructor(props) {
    super(props);
    this.state = {
      login: this.props.user.login,
      email: this.props.user.email,
      password: this.props.user.password,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      address: this.props.user.address,
      profileHeader: this.props.user.profileHeader,
      profilePhoto: this.props.user.profilePhoto,
      dateBirthday: this.props.user.dateBirthday,
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab
      readOnly: true,
      disabled: true
    };
  }
<<<<<<< HEAD

  change = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  };

=======
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab
  editableField = () => {
    this.setState({
      readOnly: !this.state.readOnly,
      disabled: !this.state.disabled
    })
  };
<<<<<<< HEAD

  updateUser = e => {
    e.preventDefault();
    const updatedData = {
      id:this.props.user.id,
      login:this.state.login,
      email:this.state.email,
      password:this.state.password,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      address:this.state.address,
      profileHeader:this.state.profileHeader,
      profilePhoto: this.state.profilePhoto,
      dateBirthday:this.state.dateBirthday,
    };
=======
  updateUser = e => {
    e.preventDefault();
    let data = this.state;
    const up = {...data, id: this.props.user.id};
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab

    fetch('http://localhost:9000/users/',
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
<<<<<<< HEAD
          body: JSON.stringify(updatedData)
        }).then(()=>this.props.loadUser(this.state.login));
    this.editableField();
  };

  render () {
    return (
        <div>
            <h1>Hello, {this.props.user.firstName} {this.props.user.lastName} </h1>
            <p>your are login with {this.props.user.login} and email {this.props.user.email}</p>
          <form>
            <label>
              password:
              <input id='password-change' name='password' type='password'  onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              name:
              <input id='firstName-change' name='firstName' type='text' value={this.state.firstName} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              surname:
              <input id='lastName-change' name='lastName' type='text' value={this.state.lastName} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              address:
              <input id='address-change' name='address' type='text' value={this.state.address} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              url to avatar:
              <input id='profileHeader-change' name='profileHeader' type='url' value={this.state.profileHeader} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              url to photo:
              <input id='profilePhoto-change' name='profilePhoto' type='url' value={this.state.profilePhoto} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              birthday:
              <input id='dateBirth-change' name='dateBirth' type='date' value={this.state.dateBirthday} onChange={e=>this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <input type='button' name='Edit' value='Edit' onClick={this.editableField}/>
            <input type='button' name='Apply' value='Apply' onClick={e => this.updateUser(e)} disabled={this.state.disabled}/>
=======
          body: JSON.stringify(up)
        }).then(() => this.props.loadUser(this.state.login));
    this.editableField();
  };


  render() {
    return (
        <div>
          <h1>Hello, {this.props.user.firstName} {this.props.user.lastName} </h1>
          <p>your are login with {this.props.user.login} and email {this.props.user.email}</p>
          <form>
            <label>
              password:
              <input id='password-change' name='password' type='password' onChange={e => this.change(e)}
                     readOnly={this.state.readOnly}/>
            </label>
            <label>
              name:
              <input id='firstName-change' name='firstName' type='text' value={this.state.firstName}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              surname:
              <input id='lastName-change' name='lastName' type='text' value={this.state.lastName}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              address:
              <input id='address-change' name='address' type='text' value={this.state.address}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              url to avatar:
              <input id='profileHeader-change' name='profileHeader' type='url' value={this.state.profileHeader}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              url to photo:
              <input id='profilePhoto-change' name='profilePhoto' type='url' value={this.state.profilePhoto}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <label>
              birthday:
              <input id='dateBirth-change' name='dateBirth' type='date' value={this.state.dateBirthday}
                     onChange={e => this.change(e)} readOnly={this.state.readOnly}/>
            </label>
            <input type='button' name='Edit' value='Edit' onClick={this.editableField}/>
            <input type='button' name='Apply' value='Apply' onClick={e => this.updateUser(e)}
                   disabled={this.state.disabled}/>
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab
          </form>
        </div>
    )
  }
<<<<<<< HEAD
};


=======
}
>>>>>>> 3b8a269a50b9a7c2e1bc956728ac0f8cac3933ab

const mapStateToProps = state => {
  return {
    user: state.user,
    id: state.id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (login) => dispatch(createUser(login))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);