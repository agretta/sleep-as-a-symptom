import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './views/Home';

import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AccountManagement from './views/AccountManagement';
import Splash from './views/Splash';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/register' render={() => (
            <div className="App">
              <Register/>
            </div>
          )}/>
          <Route exact={true} path='/login' render={() => (
            <div className="App">
              <Login/>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;