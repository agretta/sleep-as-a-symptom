import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'

export default class LogHealthData extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
           Log Data 
           <br></br>
           <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}