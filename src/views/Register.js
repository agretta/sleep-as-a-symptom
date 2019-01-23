import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'

export default class Register extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
             <div id='signinContainer'>
              <form id='form' onSubmit={this.onSubmit.bind(this)}>
                <input className='input' name='email' type="text"
                  placeholder="Email"/>
                <input className='input' name='pass' type="password"
                  placeholder="Password"/>          
                <input className='input' name='cPass' type="password"  
                  placeholder="Confirm Password"/>          
                <button id='submit' type="submit">Sign Up</button>
              </form>
             </div>
             <br></br>
             <div>
              <NavButton to='/login'>Login</NavButton>
              <NavButton to='/dashboard'>Dashboard</NavButton>
             </div>
        </div>
      )
   }

  onSubmit(e){
      var user = {
          email: e.target.elements.email.value,
          pass: e.target.elements.pass.value,
          id: Math.floor(Math.random() * 10000000000)
      }
      console.log(user)
  }

}