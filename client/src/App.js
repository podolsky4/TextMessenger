import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import './App.css'
import Router from './Components/Router'

class App extends Component {
  render () {
    return (
        <div className='app'>
      <div className='header'>
        <Link to='/'>Home</Link>
        <Link to='/feed'>Feed</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/messages'>Messages</Link>
        <Link to='/notifications'>Notifications</Link>
        </div>
        <Router/>
      </div>)
  }
}

export default App
