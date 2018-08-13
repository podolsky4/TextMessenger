import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers/index'
import { Provider } from 'react-redux'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><BrowserRouter>
  <Switch>
    <Route path='/' component={App} />
  </Switch>
</BrowserRouter></Provider>, document.getElementById('root'))
