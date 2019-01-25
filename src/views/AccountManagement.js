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
    this.state = {
      email:'',
      pass:'',
      cPass:''
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

  updateUser(e){

    // prevent form refresh
    e.preventDefault();

    var user     = firebase.auth().currentUser;
    var email    = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if( email.length > 0 )
    {
        user.updateEmail( email ).then( function() {
            alert( "Email updated." );
        }).catch( function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            alert(errorCode + '\n' + errorMessage);
        });
    }

    if( password.length > 0 )
    {
        user.updatePassword( password ).then( function() {
            alert( "Password updated." );
        }).catch( function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if( errorCode == 'auth/weak-password' ){
              alert('Password must be 6 characters or longer.');
            }
            else{
              alert(errorCode + '\n' + errorMessage);
            }
        });
    }

  }

  render () {                                   
      return (
        <div>
            User Account Management
            <Col style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                  <Form id='form' onSubmit={this.updateUser}>
                  <FormGroup>
                      Update email:
                    <Row style={{display: 'flex', justifyContent: 'center',}}>
                      <FormControl className='input' name='email' type="text" id="email"
                        placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                    </Row>
                      Update password: 
                    <Row style={{display: 'flex', justifyContent: 'center',}}>
                      <FormControl className='input' name='pass' type="password" id="password"
                        placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
                    </Row>
                    <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='cPass' type="password"
                      placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
                    </Row>
                    <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Button variant='outline-primary' id='submit' type="submit">Update</Button>
                    </Row>
                  </FormGroup>
                  </Form>
            </Col>
            <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
   }
}
