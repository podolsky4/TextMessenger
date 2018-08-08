import {Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'
import HomePage from './HomePage'
import Feed from '../views/Feed/Feed'
import Favorites from './Favorites'
import Dialogs from './Dialogs'
import Notifications from './Notifications'
import Login from './LogIn'
import Profile from '../views/Profile/Profile'

class Router extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/feed' component={Feed}/>
        <Route exact path='/favorites' component={Favorites}/>
        <Route exact path='/dialogs' component={Dialogs}/>
        <Route exact path='/notifications' component={Notifications}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/profile' component={Profile}/>
      </Switch>
    )
  }
}

export default Router
