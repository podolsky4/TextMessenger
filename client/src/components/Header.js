import { Link } from 'react-router-dom'
import React, { Component } from 'react'

class Header extends Component {
  render () {
    return <div className="header">
      <Link to='/'>Home</Link>
      <Link to='/feed'>Feeds</Link>
      <Link to='/favorites'>Favorites</Link>
      <Link to='/dialogs'>Dialogs</Link>
      <Link to='/notifications'>Notifications</Link>
    </div>
  }
}

export default Header