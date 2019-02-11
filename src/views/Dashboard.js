import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'
export default class Dashboard extends Component { 
  state = { 
  }
  
  render () {                                   
      return (
        <div>
            <div>
              <h1>Dashboard</h1>
              <NavButton to='/' onPress={() => this.props.navigation.goBack()}>Back</NavButton>
            </div>
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
                  <NavButton to='/account-management'>Account Management</NavButton>
                </Col>
              </Row>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'1%'}}>
                  <NavButton to='/fitbit-settings'>FitBit Management</NavButton>
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
