import React, {Component} from 'react'
import './App.css'
import Router from './Router'
import Header from './Header'
import {getUser} from '../actions/userActions'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount () {
    const {user, loadUser} = this.props
    if (user.length === 0) {
      loadUser()
    }
  }

  render () {
    return (<div>
      <Header/>
      <Router/>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(getUser())

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
