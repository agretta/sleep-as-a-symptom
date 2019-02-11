import React, { Component } from 'react';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Image} from 'react-bootstrap'

export default class Splash extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.state = {
      title: "Splash"
    };
  }

  render () {
      return (

         <div>
              <Container>
              <div className="header">
                    <h1>{this.state.title}</h1>
            </div>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight:'600px'}}>
                    <Image src= {require('./temp_icon.png')} style={{maxWidth:'100%', maxHeight: '100%'}} responsive/>
                  </Col>
                </Row>
                <br></br>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NavButton to='/register' onPress={() => this.props.navigation.navigate('Register', {title: 'Registration'})}>Register</NavButton>
                  </Col>
                </Row>
                <br></br>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NavButton to='/login' onPress={() => this.props.navigation.navigate('Login', {title: 'Login'})}>Login</NavButton>
                  </Col>
                </Row>
              </Container>
        </div>
      )
   }
}
