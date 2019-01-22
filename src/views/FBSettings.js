import React, { Component } from 'react';
import NavButton from './NavButton'
import {Link} from 'react-router-dom';

export default class FBSettings extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
           FitBit Settings
           <br></br>
           <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}