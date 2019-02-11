
// import logo from './logo.svg';
// import './App.css';
import Home from './views/Home';

import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import { Button, Container, Row } from 'react-bootstrap';
import {withRouter} from 'react-router';
import PropTypes from "prop-types";

import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AccountManagement from './views/AccountManagement';
import Splash from './views/Splash';
import FBSettings from './views/FBSettings';
import LogHealthData from './views/LogHealthData';
import SleepViewer from './views/SleepViewer';
import AdminPortal from './views/AdminPortal';
import Header from './Header'


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
        <Router>
          <div>
              <Header>
              </Header>
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
        </Router>
      </div>
    );
  }
}

export default App;
