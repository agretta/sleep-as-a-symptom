import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SleepViewer extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            SleepViewer
            <br></br>
            <Link to="/dashboard">Dashboard</Link>
        </div>
      )
   }
}