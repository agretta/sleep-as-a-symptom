
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Login extends Component {

  state = {}

  constructor(props) {
    super(props)
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email:'',
      pass:'',
      to_dashboard:false,
      title: "Login"
    };
  }


  handleChangeEmail(evt) {
     this.setState({
       email: evt.target.value
     });
  }
  handleChangePass(evt) {
      this.setState({
        pass: evt.target.value
      });
   }


   moveToDash() {
      this.setState({ to_dashboard: true });
   }

   login(e) {
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      firebase.auth().signInWithEmailAndPassword(email, password).then(authUser => {
          this.setState({ to_dashboard: true });
      }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        /*
          All authentication error codes:
          https://firebase.google.com/docs/auth/admin/errors
        */
        switch (errorCode) {
          case 'auth/weak-password':
            alert('Password must be 6 characters or longer.');
            break;
          case 'auth/user-not-found':
            alert('User not found. Please check your email and password');
            break;
          case 'auth/wrong-password':
            alert('Invalid password! Please try again');
            break;
          default:
            alert(errorCode + '\n' + errorMessage);
        }
      });
      e.preventDefault();
   }


  render () {
        if (this.state.to_dashboard == true) {
              return <Redirect to='/dashboard' />
        }
        return (
          <Container>
            <div className="header">
                    <h1>{this.state.title}</h1>
            </div>
            <NavButton to='/' onPress={() => this.props.navigation.goBack()}>Back</NavButton>
          <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Form id='form' onSubmit={this.login}>
                <FormGroup>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='email' type="text" id="email"
                      placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='pass' type="password" id="password"
                      placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
                  </Row>

                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Button variant='outline-primary' id='submit' type="submit">Login</Button>
                  </Row>
                </FormGroup>
                </Form>
          </Col>
          </Container>
        )
     }

}
