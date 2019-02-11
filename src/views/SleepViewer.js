import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
export default class SleepViewer extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
          <h1>
            SleepViewer 
          </h1>
            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}