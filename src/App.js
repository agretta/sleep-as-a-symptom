
// import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Home from './views/Home';

import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import { Button, Container, Row } from 'react-bootstrap';

import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AccountManagement from './views/AccountManagement';
import Splash from './views/Splash';
import FBSettings from './views/FBSettings';
import LogHealthData from './views/LogHealthData';
import SleepViewer from './views/SleepViewer';
import AdminPortal from './views/AdminPortal';


var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyCT-dBYCm_dbC9dQ9W_R5e8SFwQH6A0ABI",
  authDomain: "sleep-as-a-symptom.firebaseapp.com",
  databaseURL: "https://sleep-as-a-symptom.firebaseio.com",
  storageBucket: "sleep-as-a-symptom.appspot.com",
};
firebase.initializeApp(config);

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
