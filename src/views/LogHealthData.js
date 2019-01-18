import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class LogHealthData extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
           Log Data 
           <br></br>
           <Link to="/dashboard">Dashboard</Link>
        </div>
      )
   }
}