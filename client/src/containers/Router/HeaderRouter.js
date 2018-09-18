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
import SinglePost from '../../SinglePost'
import Header from "../../views/Header/Header";

class HeaderRouter extends Component {
render() {
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/feed' render={(props) => <Header location={'Feed'} {...props} />}/>
            <Route exact path='/favorites' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/dialogs/:dialogId' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/post/:postId' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/dialogs' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/notifications' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/login' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/profile/:id' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route exact path='/confirm/registration/:id' render={(props) => <Header location={'Home'} {...props} />}/>
            <Route path='*' component={Header}/>
        </Switch>
    )
}
}

export default HeaderRouter
