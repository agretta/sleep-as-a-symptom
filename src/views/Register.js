import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Register extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.checkIt = this.checkIt.bind(this);
    this.unCheckIt = this.unCheckIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangecPass = this.handleChangecPass.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      checked:false,
      email:'',
      pass:'',
      cPass:'',
      to_dashboard:false
    };

  }

  checkIt() {
    this.setState({
      checked:true
    });
  }

  unCheckIt() {
    this.setState({
      checked:false
    });
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

  moveToDash() {
    this.setState({ to_dashboard: true });
  }

  registerUser(e){

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password == confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(authUser => {
        this.setState({ to_dashboard: true });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password'){
          alert('Password must be 6 characters or longer.');
        }
        else {
          alert(errorCode + '\n' + errorMessage);
        }
      });
    } else {
      alert("Passwords Do Not Match!");
    }

    e.preventDefault();
  }


    render () {
    // https://react-bootstrap.github.io/components/forms/
      if (this.state.to_dashboard == true) {
            return <Redirect to='/dashboard' />
      }

      return (
        <Container>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Form id='form' onSubmit={this.registerUser}>
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
                <FormControl className='input' name='cPass' type="password" id="confirm-password"
                  placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <Col xs={8}>I'm an Administrator:</Col>
                    <Col xs={4}><FormControl type="checkbox" checked={this.state.checked} onChange={this.handleChange}/></Col>
                </Row>
                <Row>
                    {this.state.checked ?
                      <FormControl className='input' name='email' type="text" placeholder="Admin Code" onChange={this.onClick}/>
                      : null}
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                <NavButton to='/login'>Have an account? Log in</NavButton>
                <Button variant='outline-primary' id='submit' type="submit">Sign Up</Button>
                </Row>
              </FormGroup>
              </Form>
        </Col>
        </Container>
      )
   }
}

