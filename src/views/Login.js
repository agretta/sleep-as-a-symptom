
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            <div id='loginContainer'>
                 <form id='form'>       
                    <input className='input' type="text"   
                    placeholder="Email"/>
                    <input className='input' type="password"  
                    placeholder="Password"/>          
                    <button id='submit'>Register</button>
                </form>
            </div>
            <div>
              <Link to="/register">Register</Link>
              <br></br>
              <Link to="/dashboard">Dashboard</Link>
            </div>
        </div>
      )
   }
}