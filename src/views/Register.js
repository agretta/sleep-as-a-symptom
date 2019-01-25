import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default class Register extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.checkIt = this.checkIt.bind(this);
    this.unCheckIt = this.unCheckIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked:false
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

  render () {
      return (
        <Container>
              <form id='form' onSubmit={this.onSubmit.bind(this)}>
                <Row>
                <Col xs={12}>
                  <input className='input' name='email' type="text"
                    placeholder="Email"/>
                </Col>
                <Col xs={12}>
                  <input className='input' name='pass' type="password"
                    placeholder="Password"/>
                </Col>
                <Col xs={12}>
                <input className='input' name='cPass' type="password"
                  placeholder="Confirm Password"/>
                </Col>
                </Row>
                <Row>
                    I'm an Administrator: <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                      {this.state.checked ? <input className='input' name='email' type="text"
                      placeholder="Admin Code" onChange={this.onClick}/> : null}
                </Row>
                <Row>
                <Col>
                <Button variant='outline-primary' id='submit' type="submit">Sign Up</Button>
                </Col>
                </Row>
              </form>

           <Row>
              <NavButton to='/login'>Login</NavButton>
              <NavButton to='/dashboard'>Dashboard</NavButton>
            </Row>
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
