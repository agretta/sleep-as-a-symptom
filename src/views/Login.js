
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
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
              <NavButton to='/register'>Register</NavButton>
              <NavButton to='/dashboard'>Dashboard</NavButton>
            </div>
        </div>
      )
   }
}