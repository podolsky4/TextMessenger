import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser, loadUser} from '../../actions/userActions'
import {loadFavorites} from '../../actions/postsActions'

class LogIn extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  onSubmit = e => {
    const {createUser} = this.props
    e.preventDefault()
    let data = this.state
    createUser(data)
  };

  constructor (props) {
    super(props)
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
    }
  }

  render () {
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
    createUser: (data) => dispatch(createUser(data)),
    loadUser: (some) => dispatch(loadUser(some)),
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
