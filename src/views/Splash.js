import React, { Component } from 'react';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Image} from 'react-bootstrap'

export default class Splash extends Component {
  state = {
  }

  render () {
      return (
        
         <div>
              <Container>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight:'600px'}}>
                    <Image src= {require('./temp_icon.png')} style={{maxWidth:'100%', maxHeight: '100%'}} responsive/>
                  </Col>
                </Row>
                <br></br>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NavButton to='/register'>Register</NavButton>
                  </Col>
                </Row>
                <br></br>
                <Row style={{display: 'flex', justifyContent: 'center',}}>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NavButton to='/login'>Login</NavButton>
                  </Col>
                </Row>
              </Container>
        </div>
      )
   }
}
