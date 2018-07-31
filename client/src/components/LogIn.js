import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser} from '../actions/userActions'

class LogIn extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    let data = this.state;
    fetch('http://localhost:9000/users/user',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(() => this.props.createUser(this.state.login));
  };

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      profileHeader: '',
      profilePhoto: '',
      dateBirthday: ''
    };
  }

  render() {
    return (
        <form onSubmit={e => this.onSubmit(e)}>
          <label>
            Login:
            <input id="login" name="login" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Email:
            <input id="email" name="email" type="email" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Password:
            <input id="password" name="password" type="password" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            First name:
            <input id="firstName" name="firstName" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Last name:
            <input id="lastName" name="lastName" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Address:
            <input id="address" name="address" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Profile Header:
            <input id="profileHeader" name="profileHeader" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Profile Photo:
            <input id="profilePhoto" name="profilePhoto" type="text" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <label>
            Date Birthday:
            <input id="dateBirthday" name="dateBirthday" type="date" onChange={e => this.change(e)}/>
          </label>
          <br/>
          <button>Log In</button>
        </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: (some) => dispatch(createUser(some))
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
