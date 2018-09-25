import React, { Component } from 'react'
import './App.css'
import SecureRouter from '../Router/SecureRouter'
import { getCurrentUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from '../../components/Loader/Loader'
import UnsecureRouter from '../Router/UnsecureRouter'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import HeaderRouter from '../Router/HeaderRouter'

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

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
      darkgrey: '#929292'
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
      return <div className="loaderApp">
        <Loader />
      </div>
    }

    if (!user.id) {
      return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <UnsecureRouter/>
          </CssBaseline>
        </MuiThemeProvider>
        </JssProvider>
      )
    }

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <HeaderRouter/>
          <SecureRouter wsHandler={true}/>
          <SecureRouter/>
        </CssBaseline>
      </MuiThemeProvider>
      </JssProvider>
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
