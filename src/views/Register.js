import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Register extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
             <div id='signinContainer'>
              <form id='form'>       
                <input className='input' type="text"   
                  placeholder="Email"/>
                <input className='input' type="password"  
                  placeholder="Password"/>          
                <input className='input' type="password"  
                  placeholder="Confirm Password"/>          
                <button id='submit'>Sign Up</button>
              </form>
             </div>
             <br></br>
             <div>
              <Link to="/login">Login</Link>
                <br></br>
               <Link to="/dashboard">Dashboard</Link>
             </div>
        </div>
      )
   }
}