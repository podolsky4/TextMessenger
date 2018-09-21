import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from "../../views/Header/Header";

class HeaderRouter extends Component {
render() {
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route exact path='/feed' render={(props) => <Header pageTitle={'Feed'} {...props} />}/>
            <Route exact path='/favorites' render={(props) => <Header pageTitle={'Favorites'} {...props} />}/>
            <Route exact path='/dialogs/:dialogId' render={(props) => <Header pageTitle={'Dialogs'} {...props} />}/>
            <Route exact path='/post/:postId' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route exact path='/dialogs' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route exact path='/notifications' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route exact path='/login' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route exact path='/profile/:userId' render={(props) => <Header pageTitle={'Profile'} {...props} />}/>
            <Route exact path='/confirm/registration/:id' render={(props) => <Header pageTitle={'Home'} {...props} />}/>
            <Route path='*' component={Header}/>
        </Switch>
    )
}
}

export default HeaderRouter
