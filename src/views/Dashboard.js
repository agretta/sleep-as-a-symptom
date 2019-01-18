import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Dashboard extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            <div>
                Dashboard
            </div>
              <Link to="/sleep-viewer">Sleep Viewer</Link>
              <br></br>
              <Link to="/log-health-data">Log Data</Link>
              <br></br>
              <Link to="/account-management">Account Management</Link>
              <br></br>
              <Link to="/fitbit-settings">FitBit Management</Link>
              <br></br>
              <Link to="/admin-dashboard">Admin Portal </Link>
              <br></br>
        </div>
      )
   }
}