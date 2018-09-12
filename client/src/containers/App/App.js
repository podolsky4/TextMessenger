import React, { Component } from 'react'
import './App.css'
import SecureRouter from '../Router/SecureRouter'
import Header from '../../views/Header/Header'
import { getCurrentUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import UnsecureRouter from '../Router/UnsecureRouter'


class App extends Component {
  componentWillMount () {
    const {user, getCurrentUserPoint} = this.props
    if (!user) {
      getCurrentUserPoint()
    }
  }

  render () {
    const {user} = this.props

    if (!user) {
      return <Loader/>
    }

    if (!user.id) {
      return (
        <CssBaseline>
          <UnsecureRouter/>
        </CssBaseline>
      )
    }

    return (
      <CssBaseline>
        <SecureRouter wsHandler={true}/>
        <Header/>
        <SecureRouter/>
      </CssBaseline>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    reloadLoader: state.reloadLoader
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCurrentUserPoint: () => dispatch(getCurrentUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
