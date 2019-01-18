import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Splash extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
         <div>
              Splash
              <br></br>
              <Link to="/register">Register</Link>
              <br></br>
              <Link to="/login">Login</Link>
        </div>
      )
   }
}