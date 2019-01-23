import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'

var firebase = require("firebase");

export default class Register extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(e) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorCode + '\n' + errorMessage);
      // ...
    });

    e.preventDefault();
  }

  render () {
      return (
        <div>
             <div id='signinContainer'>
              <form id='form' onSubmit={this.registerUser}>
                <input className='input' type="text"
                  placeholder="Email" id="email"/>
                <input className='input' type="password"
                  placeholder="Password" id="password"/>
                <input className='input' type="password"
                  placeholder="Confirm Password"/>
                <button id='submit'>Sign Up</button>
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
}