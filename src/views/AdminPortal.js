import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'

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
            <div className="header">
                    <h1>{this.state.title}</h1>
                    <NavButton to='/Dashboard' onPress={() => this.props.navigation.goBack()}>Back</NavButton>
            </div>

            <br></br>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}