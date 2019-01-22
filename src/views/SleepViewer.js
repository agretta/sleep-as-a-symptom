import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'
export default class SleepViewer extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            SleepViewer
            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}