import React, { Component } from 'react'
import './App.css'
import SecureRouter from '../Router/SecureRouter'
import Header from '../../views/Header/Header'
import { getCurrentUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import UnsecureRouter from '../Router/UnsecureRouter'
import {withStyles} from '@material-ui/core/styles'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import HeaderRouter from "../Router/HeaderRouter";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c',
      light: '#439889',
      dark: '#003d33',
      accent: '#00bcd4',
      accentOpacity: '#00bcd40f',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e65100',
      light: '#ff833a',
      dark: '#ac1900',
      contrastText: '#000'
    },
    background: {
      main: '#00796B',
      grey: '#fafafa',
      darkgrey: "#929292"
    }
  },
  status: {
    danger: 'orange'
  }
})

const styles = () => ({
    loaderApp: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100vh',
       background: '#00796B'
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
    const {user, classes} = this.props

      if (!user) {
          return <div className={classes.loaderApp}>
              <Loader />
          </div>
      }

    if (!user.id) {
      return (
          <MuiThemeProvider theme={theme}>
            <CssBaseline>
              <UnsecureRouter/>
            </CssBaseline>
          </MuiThemeProvider>
      )
    }

    return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <SecureRouter wsHandler={true}/>
              <HeaderRouter/>
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App))
