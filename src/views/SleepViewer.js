import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'

var firebase = require("firebase");

export default class SleepViewer extends Component { 
  state = {
  }

  constructor(props) {
    super(props);
    this.state = {
      fb_auth : false,
      title   : 'FitBit Settings',
    };
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref( "users/" + uid );

        ref.once("value").then((snapshot) => {
            var token_exists = snapshot.child("api_token").exists();

            this.setState({
              fb_auth : token_exists,
            });
          });
      } else {
        // No user is signed in,
        // so we don't do anything.
      }
    });
  }

  render () {                                   
    if (this.state.fb_auth) {
      return (
        <div>
          <Header title='Sleep Viewer: Logged In'></Header>
             <br></br>
	       <NavButton to='/dashboard'>Dashboard</NavButton>
             </div>
      )
    } else {
      return (
        <div>
          <Header title='Sleep Viewer'></Header>
            <br></br>
	    <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Please link your FitBit to see your sleep data!
            </p>
          <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
    }
  }
}
