import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class FBSettings extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
           FitBit Settings
           <br></br>
           <Link to="/dashboard">Dashboard</Link>
        </div>
      )
   }
}