
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

export default class Login extends Component {

  state = {}

  constructor(props) {
    super(props)
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.state = {
      email:'',
      pass:'',
      to_dashboard:false
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


  render () {
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
                  <Button variant='outline-primary' id='submit' type="submit">Login</Button>
                  </Row>
                </FormGroup>
                </Form>
          </Col>
          </Container>
        )
     }

}
