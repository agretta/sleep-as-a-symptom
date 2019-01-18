import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class AdminPortal extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            Admin Portal

            <br></br>
            <Link to="/dashboard">Dashboard</Link>
        </div>
      )
   }
}