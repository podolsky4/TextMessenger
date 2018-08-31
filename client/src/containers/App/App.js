import React, {Component, Fragment} from 'react'
import './App.css'
import Router from '../Router/Router'
import Header from '../../views/Header/Header'
import {getCurrentUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import HomePage from '../../views/HomePage/HomePage'

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
      return <Loader />
    }

    if (!user.id) {
      return <HomePage/>
    }

    return (
      <Fragment>
        <CssBaseline>
          <Header/>
          <Router/>
        </CssBaseline>
      </Fragment>
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
