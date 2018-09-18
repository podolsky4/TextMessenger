import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Feed from '../../views/Feed/Feed'
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
