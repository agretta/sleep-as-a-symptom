import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
export default class SleepViewer extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
          <Header title='Sleep Viewer'></Header>
            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}