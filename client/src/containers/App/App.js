import React, {Component} from 'react'
import './App.css'
import Router from '../Router/Router'
import Header from '../../views/Header/Header'
import {getCurrentUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import HomePage from '../../views/HomePage/HomePage'
import { Redirect } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b'
    },
    secondary: {
      main: '#c62828'
    },
    background: {
      main: blueGrey,
      grey: '#fafafa'
    }
  },
  status: {
    danger: 'orange'
  }
})

class App extends Component {
  componentWillMount () {
    const {user, getCurrentUserPoint} = this.props
    if (!user) {
      getCurrentUserPoint()
    }
  }

  render () {
    const {user, location} = this.props

    if (!user) {
      return <Loader />
    }

    if (!user.id) {
      return location.pathname === '/' ? <HomePage/> : <Redirect to='/'/>
    }

    return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Router wsHandler={true}/>
            <Header/>
            <Router/>
          </CssBaseline>
        </MuiThemeProvider>
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
