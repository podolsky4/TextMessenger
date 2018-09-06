import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../../views/HomePage/HomePage'
import Feed from '../../views/Feed/Feed'
import Favorites from '../../views/Favorities/Favorites'
import Dialogs from '../../components/Dialogs/Dialogs'
import Notifications from '../../components/Notifications'
import Login from '../../views/Login/LogIn'
import Profile from '../../views/Profile/Profile'
import Page404 from '../../views/404/Page404'
import ConfirmRegistration from '../../views/Confirm/ConfirmRegistration'

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
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/confirm/registration/:id' component={ConfirmRegistration}/>
        <Route path='*' component={Page404}/>
      </Switch>
    )
  }
}

export default Router
