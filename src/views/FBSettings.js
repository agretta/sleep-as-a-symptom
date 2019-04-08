import React, {Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class FBSettings extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.setUserAuthtoken    = this.setUserAuthtoken.bind(this);
    this.deleteUserAuthtoken = this.deleteUserAuthtoken.bind(this);
    this.deleteUserData      = this.deleteUserData.bind(this);
    this.state = {
      fb_auth : false,
      title   : 'FitBit Settings',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // grab the unique user id and check if it matches a researcher or participant
        var uid             = firebase.auth().currentUser.uid;
        var participant_ref = firebase.database().ref( "participants/" + uid );
        var researcher_ref  = firebase.database().ref( "researchers/" + uid );

        // check if a participant profile exists
        participant_ref.once("value").then((snapshot) => {
          var token_exists = snapshot.child("api_token").exists();

          // we only need a state update if a profile exists
          if( token_exists ) {
            this.setState({
              fb_auth : token_exists,
            });
          }

        });

        // check if a researcher profile exists
        researcher_ref.once("value").then((snapshot) => {
          var token_exists = snapshot.child("api_token").exists();

          // we only need a state update if a profile exists
          if( token_exists ) {
            this.setState({
              fb_auth : token_exists,
            });
          }

        });
      } else {
        // No user is signed in,
        // so we don't do anything
      }
    });
  }

  setUserAuthtoken(e){
    var user = firebase.auth().currentUser.uid;

    // grab & parse the user's access token for the FB API
    var token_regex = /access_token=.*(?=&user_id)/g;
    var token       = token_regex.exec( window.location.href )[0].substring(13);

    // set the token in the DB
    var keyArr = [];
    firebase.database().ref('participants').orderByKey().once('value', function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        keyArr.push(childSnapshot.key);
      });

    }).then(function() {
        if (keyArr.indexOf(user) > -1) {
          firebase.database().ref( 'participants/' + user ).update({
            api_token: token
          });
        }
      });

    //clear for researcher check
    keyArr = [];

    firebase.database().ref('researchers').orderByKey().once('value', function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        keyArr.push(childSnapshot.key);
      });

    }).then(function() {
        if (keyArr.indexOf(user) > -1) {
          firebase.database().ref( 'researchers/' + user ).update({
            api_token: token
          });
        }
    });

    this.setState({
        fb_auth : true,
    });

  }

  deleteUserAuthtoken(e){
    // grab the user's access token for the FB API
    var user = firebase.auth().currentUser.uid;

    var keyArr = [];
    firebase.database().ref('participants').orderByKey().once('value', function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        keyArr.push(childSnapshot.key);
      });

    }).then(function() {
      if (keyArr.indexOf(user) > -1) {
        firebase.database().ref( 'participants/' + user ).update({
          api_token: null,
        });
      }
    });

    keyArr = [];
    firebase.database().ref('researchers').orderByKey().once('value', function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        keyArr.push(childSnapshot.key);
      });

    }).then(function() {
      if (keyArr.indexOf(user) > -1) {
        firebase.database().ref( 'researchers/' + user ).update({
          api_token: null,
        });
      }
    });

    this.setState({
        fb_auth : false,
    });
  }

  deleteUserData(e){
    // grab the user's access token for the FB API
    var user   = firebase.auth().currentUser.uid;
    var keyArr = [];

    firebase.database().ref('participants').orderByKey().once('value', function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        keyArr.push(childSnapshot.key);
      });

    }).then(function() {
      if (keyArr.indexOf(user) > -1) {
        firebase.database().ref( 'participants/' + user ).update({
          sleep_data : null,
        }).then( function() {
          alert( "Data deleted." );
        });
      }
    });

  }

  //TODO: implement data deletion once we implement data import
     render () {
     // https://react-bootstrap.github.io/components/forms/
       if (this.state.fb_auth) {
             return (
              <div>
                <Header title='FitBit Settings'></Header>
                <Container>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Form id='form_unlink_fitbit'>
                      <FormGroup>
                         <Row style={{display: 'flex', justifyContent: 'center',}}>
                            <Button variant='outline-primary' id='unlink_fitbit' onClick={this.deleteUserAuthtoken} >Unlink FitBit</Button>
                         </Row>
                      </FormGroup>
                      </Form>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Form id='form_delete_data'>
                      <FormGroup>
                         <Row style={{display: 'flex', justifyContent: 'center',}}>
                            <Button variant='outline-primary' id='delete_data' onClick={this.deleteUserData}>Delete Data</Button>
                         </Row>
                         <Row style={{display: 'flex', justifyContent: 'center',}}>
                         <NavButton to='/dashboard'>Cancel</NavButton>
                         </Row>
                      </FormGroup>
                      </Form>
                </Col>
                </Container>
              </div>
             )
       } else {
          return (
            <div>
            <Header title='FitBit Settings'></Header>
             <Container>
             <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                   <Form id='form' onSubmit={this.setUserAuthtoken}>
                   <FormGroup>
                      <Row style={{display: 'flex', justifyContent: 'center',}}>
                      Link FitBit Account
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center',}}>
                      <Button variant='outline-secondary' href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22DBZ7&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit-settings&scope=sleep&expires_in=31536000" role="button">Link FB</Button>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center',}}>
                      <Button variant='outline-primary' id='submit' type="submit">Activate Link</Button>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center',}}>
                      <NavButton to='/dashboard'>Cancel</NavButton>
                      </Row>
                   </FormGroup>
                   </Form>
             </Col>
             </Container>
             </div>
          )
       }
    }
}
