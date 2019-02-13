import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");

export default class Dashboard extends Component {
  state = {
  }

  render () {
      return (
        <div>
            <Header title='Verify Email'></Header>
            <p> Please Verify Your Email To Continue </p>
        </div>
      )
   }
}