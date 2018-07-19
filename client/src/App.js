import { Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    let Home = () => <div>Hello React!</div>;
    let HelloRouter = () => <div>Hello React-Router!</div>;
    return (
        <div className="App">
          <h1>React Router</h1>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/hello">Test Router</Link><hr />
          <Switch>
            <Route exact path='/' render={Home} />
            <Route exact path='/hello' render={HelloRouter} />
          </Switch>
        </div>
    );
  }
}
export default App;