import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class AccountManagement extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            User Account Management
            <br></br>
            <Link to="/dashboard">Dashboard</Link>
        </div>
      )
   }
}