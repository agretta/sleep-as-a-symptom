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
    this.handleChangeJobStatus = this.handleChangeJobStatus.bind(this);
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeEthnicity = this.handleChangeEthnicity.bind(this);
    this.handleChangeRace = this.handleChangeRace.bind(this);
    this.handleChangeSex = this.handleChangeSex.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.allFieldsCompleted = this.allFieldsCompleted.bind(this);
    this.state = {
      checked:false,
      email:'',
      pass:'',
      cPass:'',
      fn:'',
      ln:'',
      job:'',
      activity:'',
      age:'',
      ethnicity:'',
      race:'',
      sex:'',
      zip:'',
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
  handleChangeJobStatus(evt) {
    this.setState({
      job: evt.target.value
    });
  }
  handleChangeActivity(evt) {
    this.setState({
      activity: evt.target.value
    });
  }
  handleChangeAge(evt) {
    this.setState({
      age: evt.target.value
    });
  }
  handleChangeEthnicity(evt) {
    this.setState({
      ethnicity: evt.target.value
    });
  }
  handleChangeRace(evt) {
    this.setState({
      race: evt.target.value
    });
  }
  handleChangeSex(evt) {
    this.setState({
      sex: evt.target.value
    });
  }
  handleChangeZip(evt) {
    this.setState({
      zip: evt.target.value
    });
  }

  moveToDash() {
    this.setState({ to_dashboard: true });
  }

  registerUser(e) {

    var complete = this.allFieldsCompleted();

    if (complete) {
      var email = this.state.email;
      var password = this.state.pass;
      var confirmPassword = this.state.cPass;

      if (password == confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(authUser =>  {

          firebase.auth().currentUser.sendEmailVerification();
          var user = firebase.auth().currentUser.uid;

          firebase.database().ref( 'participants/' + user ).set({
              first_name: this.state.fn,
              last_name: this.state.ln,
              job_status: this.state.job,
              daily_activity_level: this.state.activity,
              age: this.state.age,
              ethnicity: this.state.ethnicity,
              race: this.state.race,
              sex: this.state.sex,
              zip: this.state.zip
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
      alert("Please complete all of the fields.");
    }

    e.preventDefault();
  }

  allFieldsCompleted() {
    return this.state.checked &&
          this.state.email != '' &&
          this.state.pass != '' &&
          this.state.cPass != '' &&
          this.state.fn != '' &&
          this.state.ln != '' &&
          this.state.job != '' &&
          this.state.activity != '' &&
          this.state.age != '' &&
          this.state.ethnicity != '' &&
          this.state.race != '' &&
          this.state.sex != '' &&
          this.state.zip != '';
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
                <FormControl className='input' name='pass' type="password"
                  placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='cPass' type="password"
                placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='job' type="text"
                placeholder="Job Status" value={this.state.job} onChange={this.handleChangeJobStatus}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='activity' type="text"
                placeholder="Average Daily Activity Level" value={this.state.activity} onChange={this.handleChangeActivity}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='age' type="text"
                placeholder="Age" value={this.state.age} onChange={this.handleChangeAge}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='ethnicity' type="text"
                placeholder="Ethnicity" value={this.state.ethnicity} onChange={this.handleChangeEthnicity}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='race' type="text"
                placeholder="Race" value={this.state.race} onChange={this.handleChangeRace}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='sex' type="text"
                placeholder="Sex" value={this.state.sex} onChange={this.handleChangeSex}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                <FormControl className='input' name='zip' type="text"
                placeholder="Zip Code" value={this.state.zip} onChange={this.handleChangeZip}/>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Col xs={8}>I consent to study participation:</Col>
                  <Col xs={4}><FormControl type="checkbox" checked={this.state.checked} onChange={this.handleChange}/></Col>
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
