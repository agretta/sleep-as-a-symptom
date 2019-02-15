import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'

export default class AdminPortal extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      title: "Administrator Portal"
    };
  }
  render () {                                   
      return (
        <div>
           <Header title='Admin'></Header>

            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}