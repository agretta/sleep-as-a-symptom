import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'

export default class AccountManagement extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            User Account Management
            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}