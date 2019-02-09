import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

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
    this.state = {
      checked:false,
      email:'',
      pass:'',
      cPass:'',
      fn:'',
      ln:'',
      inst:'',
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

  render () {
    // https://react-bootstrap.github.io/components/forms/
      return (
        <Container>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Form id='form' onSubmit={this.onSubmit.bind(this)}>
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
                  <FormControl className='input' name='email' type="text"
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

  onSubmit(e){
      var user = {
          email: e.target.elements.email.value,
          pass: e.target.elements.pass.value,
          id: Math.floor(Math.random() * 10000000000)
      }
      console.log(user)
  }

}
