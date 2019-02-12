import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'
export default class Dashboard extends Component { 
  state = { 
  }
  render () {                                   
      return (
        <div>
            <Header title='Dashboard'></Header>
            <Container>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                  <NavButton to='/sleep-viewer'>Sleep Viewer</NavButton>
                </Col>
              </Row>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                  <NavButton to='/log-health-data'>Log Data</NavButton>
                </Col>
              </Row>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                    <NavButton to='/admin-dashboard'>Admin Portal</NavButton>
                </Col>
              </Row>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                  <NavButton to='/'>Logout</NavButton>
                </Col>
              </Row>
            </Container>
        </div>
      )
   }
}
