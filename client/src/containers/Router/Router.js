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
import WsHandler from '../../views/404/Page404'
import ConfirmRegistration from '../../views/Confirm/ConfirmRegistration'

class Router extends Component {
  render () {
    const {wsHandler} = this.props

    return (
      <Switch>
        <Route exact path='/' component={wsHandler ? WsHandler : HomePage}/>
        <Route exact path='/feed' component={wsHandler ? WsHandler : Feed}/>
        <Route exact path='/favorites' component={wsHandler ? WsHandler : Favorites}/>
        <Route exact path='/dialogs/:dialogId' component={wsHandler ? WsHandler : Dialogs}/>
        <Route exact path='/dialogs' component={wsHandler ? WsHandler : Dialogs}/>
        <Route exact path='/notifications' component={wsHandler ? WsHandler : Notifications}/>
        <Route exact path='/login' component={wsHandler ? WsHandler : Login}/>
        <Route exact path='/profile/:id' component={wsHandler ? WsHandler : Profile}/>
        <Route exact path='/confirm/registration/:id' component={wsHandler ? WsHandler : ConfirmRegistration}/>
        <Route path='*' component={Page404}/>
      </Switch>
    )
  }
}

export default Router
