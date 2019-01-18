import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './views/Home';

import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AccountManagement from './views/AccountManagement';
import Splash from './views/Splash';
import FBSettings from './views/FBSettings';
import LogHealthData from './views/LogHealthData';
import SleepViewer from './views/SleepViewer';
import AdminPortal from './views/AdminPortal';

class App extends Component {
  render() {
    return (
      <div>
        {/* Tempoary link navigation*/}
          <div>
              TEMPORARY HARD LINKS
              <br></br>
              <Link to="/">Home</Link>
              <br></br>
              <Link to="/register">Register</Link>
              <br></br>
              <Link to="/login">Login</Link>
              <br></br>
              <Link to="/splash">Splash</Link>
              <br></br>
              <Link to="/dashboard">Dashboard</Link>
              <br></br>
              <Link to="/account-management">Account Management</Link>
              <br></br>
              <Link to="/log-health-data">Log Data</Link>
              <br></br>
              <Link to="/admin-dashboard">Admin Portal </Link>
              <br></br>
              <Link to="/sleep-viewer">Sleep Viewer </Link>
              <br></br>
              TEMPORARY HARD LINKS
              <br></br>
          </div>
              <br></br>
          <div>
              <Route exact={true} path='/' component={Splash} /> 
              <Route exact={true} path='/splash' component={Splash} />
              <Route exact={true} path='/register' component={Register} />
              <Route exact={true} path='/login' component={Login} />
              <Route exact={true} path='/dashboard' component={Dashboard} />
              <Route exact={true} path='/admin-dashboard' component={AdminPortal} />
              <Route exact={true} path='/sleep-viewer' component={SleepViewer} />
              <Route exact={true} path='/account-management' component={AccountManagement} />
              <Route exact={true} path='/fitbit-settings' component={FBSettings} />
              <Route exact={true} path='/log-health-data' component={LogHealthData} />
          </div>
        </div>
    );
  }
}

export default App;