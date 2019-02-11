import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class AccountManagement extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangecPass = this.handleChangecPass.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.state = {
      email:'',
      pass:'',
      cPass:'',
      title: 'Account Management'
    };
  }

  handleChange(evt) {
     if(this.state.checked !== evt.target.checked) {
        this.setState({
          checked:evt.target.checked
        });
     }
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

  handleChangecPass(evt) {
       this.setState({
         cPass: evt.target.value
       });
  }

  updateUser(e) {

    // prevent form refresh
    e.preventDefault();

    var user  = firebase.auth().currentUser;
    var newEmail = document.getElementById("email").value;
    var newPassword = document.getElementById("password").value;

    var currentPassword = prompt("Please enter your current password:");
    firebase.auth().currentUser.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword)
      ).catch( function(error) {
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

          return false;
    }).then( function() {
      if (newEmail.length > 0) {
          user.updateEmail(newEmail).then( function() {
              alert( "Email updated." );
          }).catch( function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;

              alert(errorCode + '\n' + errorMessage);
          });
      }

      if (newPassword.length > 0) {
          user.updatePassword( newPassword ).then( function() {
              alert( "Password updated." );
          }).catch( function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;

              if (errorCode == 'auth/weak-password') {
                alert('Password must be 6 characters or longer.');
              } else {
                alert(errorCode + '\n' + errorMessage);
              }
          });
      }
    });
  }

  validPassword(e) {

  }

  render () {
      return (
        <div>
          <div className="header">
                    <h1>{this.state.title}</h1>
            </div>
              <Col style={{display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '5%'}}>
                    <Form id='form' onSubmit={this.updateUser}>
                    <FormGroup>
                        Update email:
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%'}}>
                        <FormControl className='input' name='email' type="text" id="email"
                          placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                      </Row>
                        Update password:
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%'}}>
                        <FormControl className='input' name='pass' type="password" id="password"
                          placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center',margin:'2%'}}>
                      <FormControl className='input' name='cPass' type="password"
                        placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'left',margin:'2%'}}>
                      <Button variant='outline-primary' id='submit' type="submit">Update</Button>
                      </Row>
                      <Row style={{height:'50px'}}></Row>
                      <Row style={{display: 'flex', justifyContent: 'left', margin:'2%'}}>
                      <NavButton to='/dashboard'>Dashboard</NavButton>
                      </Row>
                    </FormGroup>
                    </Form>
              </Col>
        </div>
      )
   }
}
