import { Route, Switch } from 'react-router-dom'

import React, { Component } from 'react'

class Router extends Component {
  render () {
    let Home = () => <div>Text Messages page</div>;
    let FeedPage = () => <div>Feed page</div>;
    let FavoritesPage = () => <div>Favorites page</div>;
    let MessagesPage = () => <div>Messages page</div>;
    let NotificationsPage = () => <div>Notifications page</div>;

    return (
      <Switch>
        <Route exact path='/' render={Home}/>
        <Route exact path='/feed' render={FeedPage}/>
        <Route exact path='/favorites' render={FavoritesPage}/>
        <Route exact path='/messages' render={MessagesPage}/>
        <Route exact path='/notifications' render={NotificationsPage}/>
      </Switch>
    )
  }
}

Router.propTypes = {}

export default Router
