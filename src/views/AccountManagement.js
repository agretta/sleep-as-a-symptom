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
    this.handleChangeCurrentEmailPass = this.handleChangeCurrentEmailPass.bind(this);
    this.handleChangeCurrentPasswordPass = this.handleChangeCurrentPasswordPass.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.state = {
      email:'',
      pass:'',
      cPass:'',
      currentEmailPass: '',
      currentPasswordPass: '',
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

     if (evt.target.value != '') {
        document.getElementById('email-current-pass').type = 'password';
     } else {
        document.getElementById('email-current-pass').type = 'hidden';
     }
  }

  handleChangePass(evt) {
      this.setState({
        pass: evt.target.value
      });

    if (evt.target.value != '') {
        document.getElementById('password-current-pass').type = 'password';
    } else {
        document.getElementById('password-current-pass').type = 'hidden';
    }
  }

  handleChangecPass(evt) {
       this.setState({
         cPass: evt.target.value
       });

    if (evt.target.value != '') {
        document.getElementById('password-current-pass').type = 'password';
    } else {
        document.getElementById('password-current-pass').type = 'hidden';
    }
  }

  handleChangeCurrentEmailPass(evt) {
      this.setState({
         currentEmailPass: evt.target.value
      });
  }

  handleChangeCurrentPasswordPass(evt) {
      this.setState({
        currentPasswordPass: evt.target.value
      });
  }

  updateEmail(e) {

    var user  = firebase.auth().currentUser;
    var newEmail = this.state.email;
    var currentPassword = this.state.currentEmailPass;

    if (newEmail == '' || currentPassword == '') {
      alert('Please complete all the fields.');
      return;
    }

    user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword)
      ).then( function() {
        user.updateEmail(newEmail).then( function() {
          alert( "Email updated." );
          document.getElementById('email').value = '';
          document.getElementById('email-current-pass').value = '';
        }).catch( function(error) {

          //update email error
          var errorCode = error.code;
          var errorMessage = error.message;

          alert(errorCode + '\n' + errorMessage);
        })
      }).catch( function(error) {

        //authentication error
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

  updatePassword(e) {
    var user  = firebase.auth().currentUser;
    var newPassword = this.state.pass;
    var currentPassword = this.state.currentPasswordPass;
    var newPasswordConfirm = this.state.cPass;

    if (newPassword == '' || currentPassword == '' || newPasswordConfirm == '') {
      alert('Please complete all the fields.');
      return;
    } else if (newPassword != newPasswordConfirm) {
      alert('Passwords do not match, please try again.');
      return;
    }

    user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword)
      ).then( function() {
        user.updatePassword(newPassword).then( function() {
          alert( "Password updated." );
          document.getElementById('password').value = '';
          document.getElementById('password-current-pass').value = '';
          document.getElementById('confirm-password').value = '';
        }).catch( function(error) {

          //update password error
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == 'auth/weak-password') {
            alert('Password must be 6 characters or longer.');
          } else {
            alert(errorCode + '\n' + errorMessage);
          }
        })
      }).catch( function(error) {

        //authentication error
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
      return (
        <div>
          <div className="header">
                    <h1>{this.state.title}</h1>
            </div>
              <Col style={{display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '5%'}}>
                    <Form id='form'>
                    <FormGroup>
                        Update email:
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%', width:'200px'}}>
                        <FormControl className='input' name='email' type="text" id="email"
                          placeholder="New Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%', width:'200px'}}>
                        <FormControl className='input' name='email-current-pass' type="hidden" id="email-current-pass"
                          placeholder="Current Password" value={this.state.currentEmailPass} onChange={this.handleChangeCurrentEmailPass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'left', margin: '2%'}}>
                        <Button variant='outline-primary' id='update-email' type="submit" onClick={this.updateEmail}>Update Email</Button>
                      </Row>
                        Update password:
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%', width:'200px'}}>
                        <FormControl className='input' name='pass' type="password" id="password"
                          placeholder="New Password" value={this.state.pass} onChange={this.handleChangePass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center',margin:'2%', width:'200px'}}>
                      <FormControl className='input' name='cPass' type="password" id="confirm-password"
                        placeholder="Confirm New Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center', margin:'2%', width:'200px'}}>
                        <FormControl className='input' name='password-current-pass' type="hidden" id="password-current-pass"
                          placeholder="Current Password" value={this.state.currentPasswordPass} onChange={this.handleChangeCurrentPasswordPass}/>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'left',margin:'2%'}}>
                        <Button variant='outline-primary' id='update-pass' type="submit" onClick={this.updatePassword}>Update Password</Button>
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
