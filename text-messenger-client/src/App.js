import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/Login';// Import a component from another file
import './styles/main.css'; // Tell Webpack that App.js uses these styles
import classnames from 'classnames';




class App extends Component {
  render() {
    const loginform = React.createElement('LoginPage', {className: "loginPage"}, LoginPage);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className={classnames('loginPage', this.props.styleName)}>
        <LoginPage></LoginPage>
        </div>

      </div>
    );
  }
}

export default App;
