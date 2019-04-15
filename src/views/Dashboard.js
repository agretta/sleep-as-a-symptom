import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Dashboard extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.state = {
      email_verified : true,
      admin          : false,
    }
  }


  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // grab the unique user id and check if it matches a researcher or participant
        var uid             = firebase.auth().currentUser.uid;
        var participant_ref = firebase.database().ref( "participants/" + uid );
        var researcher_ref  = firebase.database().ref( "researchers/" + uid );

        // check if a participant profile exists
        participant_ref.once("value").then((snapshot) => {
          var email_verified = snapshot.child("email_verified").val();
          var token_exists   = snapshot.child("api_token").exists();

          if( token_exists ) {
            this.setState({
              email_verified : email_verified,
              admin          : false,
            });
          }
        });

        // check if a researcher profile exists
        researcher_ref.once("value").then((snapshot) => {
          var email_verified = snapshot.child("email_verified").val();
          var token_exists   = snapshot.child("api_token").exists();

          if( token_exists ) {
            this.setState({
              email_verified : email_verified,
              admin          : true,
            });
          }
        });
      } else {
        // No user is signed in,
        // so we don't do anything
      }
    });
  }

  render () {
      if (this.state.email_verified == false) {
        return <Redirect to='/verify-email' />
      } else if (this.state.admin){
        return (
          <div>
              <Header title='Dashboard'></Header>
              <Container>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/sleep-viewer'>Sleep Viewer</NavButton>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/log-health-data'>Log Data</NavButton>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                      <NavButton to='/admin-dashboard'>Admin Portal</NavButton>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/'>Logout</NavButton>
                  </Col>
                </Row>
              </Container>
          </div>
      )
      } else {
        return (
          <div>
              <Header title='Dashboard'></Header>
              <Container>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/sleep-viewer'>Sleep Viewer</NavButton>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/log-health-data'>Log Data</NavButton>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/'>Logout</NavButton>
                  </Col>
                </Row>
              </Container>
          </div>
      )
      }
   }
}
