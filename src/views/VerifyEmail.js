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
          console.log('verified');
        } else {
          console.log('unverified');
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
