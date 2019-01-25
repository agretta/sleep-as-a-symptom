import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'

export default class Splash extends Component {
  state = {
  }

  render () {
      return (
        
         <div>
              Splash
              <br></br>
              <NavButton to='/register'>Register</NavButton>
              <br></br>
              <NavButton to='/login'>Login</NavButton>
        </div>
      )
   }
}
