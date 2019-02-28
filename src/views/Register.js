import React, { Component,} from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Register extends Component {
  state = {
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

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
    this.allFieldsCompleted = this.allFieldsCompleted.bind(this);
    this.state = {
      title: 'Registration',
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

    var complete = this.allFieldsCompleted();
    if (complete) {
      var email = this.state.email;
      var extension = email.substr(email.length - 3, email.length);

      var password = this.state.pass;
      var confirmPassword = this.state.cPass;

      if (extension == 'edu' || extension == 'gov' || extension == 'org') {
        if (password == confirmPassword) {
          firebase.auth().createUserWithEmailAndPassword(email, password).then(authUser => {

            firebase.auth().currentUser.sendEmailVerification();
            var user = firebase.auth().currentUser.uid;

            firebase.database().ref( 'researchers/' + user ).set({
                first_name: this.state.fn,
                last_name: this.state.ln,
                institution: this.state.inst,
                email_verified: false
            });

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
        } else {
          alert("Passwords Do Not Match!");
        }
      } else {
        alert("Please use a .edu, .org, or .gov email address");
      }
    } else {
      alert("Please complete all of the fields.");
    }

    e.preventDefault();
  }

  allFieldsCompleted() {
    return this.state.email != '' &&
          this.state.pass != '' &&
          this.state.cPass != '' &&
          this.state.fn != '' &&
          this.state.ln != '' &&
          this.state.inst != '';
  }

  render () {
  // https://react-bootstrap.github.io/components/forms/
    if (this.state.to_dashboard == true) {
          return <Redirect to='/dashboard' />
    }

    return (
      <Container>
        <div>
          <h1>
            {this.state.title}
          </h1>
          <NavButton to='/' onPress={() => this.props.navigation.goBack()}>Back</NavButton>
        </div>

      <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form id='form' onSubmit={this.registerUser}>
            <FormGroup>
            <Row style={{display: 'flex', justifyContent: 'center',}}>
              <FormControl className='input' name='fn' type="text"
              placeholder="First Name" value={this.state.fn} onChange={this.handleChangeFN}/>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center',}}>
              <FormControl className='input' name='ln' type="text"
              placeholder="Last Name" value={this.state.ln} onChange={this.handleChangeLN}/>
            </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='email' type="text" id="email"
                  placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='inst' type="text"
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
