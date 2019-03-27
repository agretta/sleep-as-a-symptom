import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Dashboard extends Component {
  state = {
    to_dashboard: false
  }

  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    this.fireBaseListener = firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          this.setState({
            to_dashboard: true
          });

          //update the email_verified key in Firebase
          var keyArr = [];

          firebase.database().ref('participants').orderByKey().once('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
              keyArr.push(childSnapshot.key);
            });

          }).then(function() {
              if (keyArr.indexOf(user.uid) > -1) {
                firebase.database().ref( 'participants/' + user.uid ).update({
                  email_verified: true
                });
              } else {
                firebase.database().ref( 'researchers/' + user.uid ).update({
                  email_verified: true
                });
              }
            });
        } else {
        }
      });
    }

  refresh() {
    window.location.reload();
  }

  render () {
    if (this.state.to_dashboard == true) {
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
          Please Verify Your Email To Continue
          </Row>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant='outline-primary' type="submit" onClick={this.refresh}>Complete</Button>
          </Row>
      </div>
    )
   }

  componentWillUnmount() {
   this.fireBaseListener && this.fireBaseListener();
   this.authListener = undefined;
  }
}
