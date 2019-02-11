import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
export default class LogHealthData extends Component { 
  state = { 
  }
  constructor(props) {
   super(props);
   this.state = {
     title: "Log Health Data"
   };
 }
  render () {                                   
      return (
        <div>
           <div className="header">
                    <h1>{this.state.title}</h1>
            </div> 
           <br></br>
           <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}