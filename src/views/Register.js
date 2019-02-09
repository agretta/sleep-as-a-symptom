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
    this.handleChangeFN = this.handleChangeFN.bind(this);
    this.handleChangeLN = this.handleChangeLN.bind(this);
    this.handleChangeInst = this.handleChangeInst.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      checked:false,
      email:'',
      pass:'',
      cPass:'',
      fn:'',
      ln:'',
      inst:'',
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
  handleChangeFN(evt) {
     this.setState({
       fn: evt.target.value
     });
  }
  handleChangeLN(evt) {
    this.setState({
      ln: evt.target.value
    });
  }
  handleChangeInst(evt) {
    this.setState({
      inst: evt.target.value
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
      firebase.auth().createUserWithEmailAndPassword(email, password).then(authUser =>  {
        this.setState({ to_dashboard: true });
    }).catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if( errorCode == 'auth/weak-password' ){
        alert('Password must be 6 characters or longer.');
      }
      else{
        alert(errorCode + '\n' + errorMessage);
      }
      // ...
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
                <FormControl className='input' name='cPass' type="password"
                placeholder="First Name" value={this.state.fn} onChange={this.handleChangeFN}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='cPass' type="password"
                placeholder="Last Name" value={this.state.ln} onChange={this.handleChangeLN}/>
              </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <FormControl className='input' name='email' type="text" id="email"
                    placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <FormControl className='input' name='cPass' type="password"
                  placeholder="Institution" value={this.state.inst} onChange={this.handleChangeInst}/>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <FormControl className='input' name='pass' type="password"
                    placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <FormControl className='input' name='cPass' type="password"
                  placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
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
