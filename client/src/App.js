import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import './App.css'
import Router from './Components/Router'

class App extends Component {
  render () {
    return (<div className='App'>
      with sass-compiler, ESLint
      <h1>React Router</h1>
      <Link to='/'>Home</Link>&nbsp;
      <Link to='/hello'>Test Router</Link>
      <hr/>
      <Router/>
    </div>)
  }
}

export default App
