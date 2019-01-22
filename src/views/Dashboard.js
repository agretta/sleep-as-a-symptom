import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'
export default class Dashboard extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            <div>
                Dashboard
            </div>
              <NavButton to='/sleep-viewer'>Sleep Viewer</NavButton>
              <br></br>
              <NavButton to='/log-health-data'>Log Data</NavButton>
              <br></br>
              <NavButton to='/account-management'>Account Management</NavButton>
              <br></br>
              <NavButton to='/fitbit-settings'>FitBit Management</NavButton>
              <br></br>
              <NavButton to='/admin-dashboard'>Admin Porta</NavButton>
              <br></br>
              <NavButton to='/'>Logout</NavButton>
        </div>
      )
   }
}