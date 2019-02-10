import { React, Component } from 'react';
// import {Redirect, Link} from 'react-router-dom';
// import NavButton from '../components/NavButton'
// import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");
export default class FBSettings extends Component {
}



// export default class Register extends Component {
//   state = {
//   }
//
//   constructor(props) {
//     super(props);
//     this.checkIt = this.checkIt.bind(this);
//     this.unCheckIt = this.unCheckIt.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleChangeEmail = this.handleChangeEmail.bind(this);
//     this.handleChangePass = this.handleChangePass.bind(this);
//     this.handleChangecPass = this.handleChangecPass.bind(this);
//     this.registerUser = this.registerUser.bind(this);
//     this.state = {
//       fb_email:'',
//       fb_pass:'',
//       fb_auth:false
//     };
//
//   }
//
//
//     render () {
//     // https://react-bootstrap.github.io/components/forms/
//       if (this.state.fb_auth == true) {
//             return (
//                <Container>
//                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                      <Form id='form' onSubmit={this.registerUser}>
//                      <FormGroup>
//                         <Row style={{display: 'flex', justifyContent: 'center',}}>
//                            <Button variant='outline-primary' id='submit' type="submit">Unlink FitBit</Button>
//                         </Row>
//                         <Row style={{display: 'flex', justifyContent: 'center',}}>
//                            <Button variant='outline-primary' id='submit' type="submit">Delete Data</Button>
//                         <NavButton to='/dashboard'>Cancel</NavButton>
//                         </Row>
//                      </FormGroup>
//                      </Form>
//                </Col>
//                </Container>
//             )
//
//
//       } else {
//
//          return (
//             <Container>
//             <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                   <Form id='form' onSubmit={this.registerUser}>
//                   <FormGroup>
//                      <Row style={{display: 'flex', justifyContent: 'center',}}>
//                      Link FitBit Account
//                      </Row>
//                      <Row style={{display: 'flex', justifyContent: 'center',}}>
//                         <FormControl className='input' name='email' type="text" id="email"
//                         placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
//                      </Row>
//                      <Row style={{display: 'flex', justifyContent: 'center',}}>
//                         <FormControl className='input' name='pass' type="password" id="password"
//                         placeholder="Password" value={this.state.pass} onChange={this.handleChangePass}/>
//                      </Row>
//                      <Row style={{display: 'flex', justifyContent: 'center',}}>
//                      <FormControl className='input' name='cPass' type="password" id="confirm-password"
//                         placeholder="Confirm Password" value={this.state.cPass} onChange={this.handleChangecPass}/>
//                      </Row>
//                      <Row>
//                      <Button variant='outline-primary' id='submit' type="submit">Link FitBit</Button>
//                      <NavButton to='/dashboard'>Cancel</NavButton>
//                      </Row>
//                   </FormGroup>
//                   </Form>
//             </Col>
//             </Container>
//          )
//       }
//    }
// }
//
