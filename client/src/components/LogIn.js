import React, { Component } from 'react'

class LogIn extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let data = {
      login: document.getElementById('login').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      profilePhoto: document.getElementById('profilePhoto').value,
      profileHeader: document.getElementById('profileHeader').value,
      dateBirthday: document.getElementById('dateBirthday').value
    }
    console.log(JSON.stringify(data))
    fetch('http://localhost:9000/users/user',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res => console.log(res.status))

  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="login">Login</label>
        <input id="login" name="login" type="text"/>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email"/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text"/>

        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" type="text"/>

        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" type="text"/>

        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text"/>

        <label htmlFor="profileHeader">profile Header</label>
        <input id="profileHeader" name="profileHeader" type="text"/>

        <label htmlFor="profilePhoto">profile Photo</label>
        <input id="profilePhoto" name="profilePhoto" type="text"/>

        <label htmlFor="dateBirthday">dateBirthday</label>
        <input id="dateBirthday" name="dateBirthday" type="text"/>
        <button>Log In</button>
      </form>
    )
  }
}

export default LogIn