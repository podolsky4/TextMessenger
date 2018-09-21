import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from '../../views/HomePage/HomePage'
import ResetPassword from '../../components/ResetPassword/ResetPassword'
import ConfirmRegistration from '../../views/Confirm/ConfirmRegistration'

class UnsecureRouter extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/resetPassword/:token' component={ResetPassword}/>
        <Route exact path ='/registered/:token' component={ConfirmRegistration}/>
        <Route path='*' render={() => <Redirect to='/'/>}/>
      </Switch>
    )
  }
}

export default UnsecureRouter
