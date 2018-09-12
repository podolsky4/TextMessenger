import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from '../../views/HomePage/HomePage'
import ResetPassword from '../../components/ResetPassword/ResetPassword'

class UnsecureRouter extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/resetPassword' component={ResetPassword}/>
        <Route path='*' render={() => <Redirect to='/'/>}/>
      </Switch>
    )
  }
}

export default UnsecureRouter
