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
    this.setUserAuthtoken = this.setUserAuthtoken.bind(this);
    this.deleteUserAuthtoken = this.deleteUserAuthtoken.bind(this);
    this.state = {
      fb_auth:false,
      title: 'FitBit Management'
    };

  }

  setUserAuthtoken(e){

    var user = firebase.auth().currentUser.uid;

    // grab & parse the user's access token for the FB API
    var token_regex = /access_token=.*(?=&user_id)/g;
    var token       = token_regex.exec( window.location.href )[0].substring(13);

    // set the token in the DB
    firebase.database().ref( 'users/' + user ).set({
        api_token : token,
    });

    this.setState({
        fb_auth : true,
    });

  }

  deleteUserAuthtoken(e){

    // grab the user's access token for the FB API
    var user        = firebase.auth().currentUser.uid;

    firebase.database().ref( 'users/' + user ).set({
        api_token : null,
    });

    this.setState({
        fb_auth : false,
    });
  }

  //TODO: implement data deletion once we implement data import

     render () {
     // https://react-bootstrap.github.io/components/forms/
       if (this.state.fb_auth == true) {
             return (
              <div>
                <Header title='FitBit Settings'></Header>
                <Container>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Form id='form_unlink_fitbit' onSubmit={this.deleteUserAuthtoken}>
                      <FormGroup>
                         <Row style={{display: 'flex', justifyContent: 'center',}}>
                            <Button variant='outline-primary' id='submit' type="submit">Unlink FitBit</Button>
                         </Row>
                      </FormGroup>
                      </Form>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Form id='form_delete_data' onSubmit={this}>
                      <FormGroup>
                         <Row style={{display: 'flex', justifyContent: 'center',}}>
                            <Button variant='outline-primary' id='submit' type="submit">Delete Data</Button>
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

