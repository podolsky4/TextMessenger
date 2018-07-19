import { Route, Switch } from 'react-router-dom'

import React, { Component } from 'react'

class Router extends Component {
  render () {
    let Home = () => <div>Hello React!</div>
    let HelloRouter = () => <div>Hello React-Router!</div>

    return (
      <Switch>
        <Route exact path='/' render={Home}/>
        <Route exact path='/hello' render={HelloRouter}/>
      </Switch>
    )
  }
}

Router.propTypes = {}

export default Router
