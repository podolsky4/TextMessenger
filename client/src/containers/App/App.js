import React, { Component } from 'react'
import './App.css'
import SecureRouter from '../Router/SecureRouter'
import Header from '../../views/Header/Header'
import { getCurrentUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import UnsecureRouter from '../Router/UnsecureRouter'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b',
      dark: '#00453d',
      accent: '#00bcd4'
    },
    secondary: {
      main: '#c62828'
    },
    background: {
      main: '#00796B',
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
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <SecureRouter wsHandler={true}/>
            <Header/>
            <SecureRouter/>
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
