import React, {Component, Fragment} from 'react'
import './App.css'
import Router from '../Router/Router'
import Header from '../../views/Header/Header'
import {getUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'


class App extends Component {
  componentWillMount () {
    const {user, loadUser} = this.props
    if (user.length === 0) {
      loadUser()
    }
  }

  render () {
    return (
      <Fragment>
        <CssBaseline>
          <Header />
          <Router />
        </CssBaseline>
      </Fragment>
    )

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
