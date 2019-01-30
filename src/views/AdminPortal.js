import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'

export default class AdminPortal extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            Admin Portal

            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}