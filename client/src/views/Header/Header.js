import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
  render () {
    const {user} = this.props
    const data = user.email !== undefined
    const avatar = data
      ? <img
        className="header-logo"
        alt="logo"
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
      ></img>
      : ''
    return <div className="header">
      <div className='leftNav'>
        <Link to='/'>Home</Link>
        <Link to='/feed'>Feeds</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/dialogs'>Dialogs</Link>
        <Link to='/notifications'>Notifications</Link>
        <Link className='login' to='/login'>CreateUser</Link>
        <Link to='/profile'>MyProfile</Link>
      </div>
      <div className='rightNav'>
        {avatar}
        {data && <Link to='/profile'>{`${user.email}`}</Link>}
        {data && <Link to='/' className='dd'><span className='logOut'>Log Out</span></Link>}
        {!data && <Link to='/logIn'> LogIn</Link>}
      </div>
    </div>
  }
}

export default Header