
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

export default class UserTypeFilter extends Component {

  state = {}

  render () {
    return (
        <Container>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Row style={{display: 'flex', justifyContent: 'center', margin:'6px',}}>
                <NavButton to='/register-participant'>I am a Participant</NavButton>
            </Row>
        </Col>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Row style={{display: 'flex', justifyContent: 'center', margin:'6px',}}>
                <NavButton to='/register'>I am a Researcher</NavButton>
            </Row>
        </Col>
        </Container>
    )
    
    }

}
