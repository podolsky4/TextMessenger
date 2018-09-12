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
import WebSocketHandler from '../../components/WebSocketHandler'

class Router extends Component {
  render () {
    const {wsHandler} = this.props

    return (
      <Switch>
        <Route exact path='/' component={wsHandler ? WebSocketHandler : HomePage}/>
        <Route exact path='/feed' component={wsHandler ? WebSocketHandler : Feed}/>
        <Route exact path='/favorites' component={wsHandler ? WebSocketHandler : Favorites}/>
        <Route exact path='/dialogs/:dialogId' component={wsHandler ? WebSocketHandler : Dialogs}/>
        <Route exact path='/dialogs' component={wsHandler ? WebSocketHandler : Dialogs}/>
        <Route exact path='/notifications' component={wsHandler ? WebSocketHandler : Notifications}/>
        <Route exact path='/login' component={wsHandler ? WebSocketHandler : Login}/>
        <Route exact path='/profile/:id' component={wsHandler ? WebSocketHandler : Profile}/>
        <Route exact path='/confirm/registration/:id' component={wsHandler ? WebSocketHandler : ConfirmRegistration}/>
        <Route path='*' component={wsHandler ? WebSocketHandler : Page404}/>
      </Switch>
    )
  }
}

export default Router
