import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'
import Header from '../components/Header'

var firebase = require("firebase");


export default class LogHealthData extends Component { 
  state = { 
  }
  constructor(props) {
   super(props);
    this.handleChangeBG = this.handleChangeBG.bind(this);
    this.handleChangeBC = this.handleChangeBC.bind(this);
    this.handleChangeBP = this.handleChangeBP.bind(this);
    this.handleChangeBW = this.handleChangeBW.bind(this);
    this.handleChangePBF = this.handleChangePBF.bind(this);
    this.handleChangeBMI = this.handleChangeBMI.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeWC = this.handleChangeWC.bind(this);
    this.log_data = this.log_data.bind(this);

    this.state = {
      title: "Log Health Data",
      bg:'',
      bc:'',
      bp:'',
      bw:'',
      pbf:'',
      bmi:'',
      height:'',
      wc:''

    };
  }

   handleChangeBG(evt) {
     this.setState({
       bg: evt.target.value
     });
  }
  handleChangeBC(evt) {
      this.setState({
        bc: evt.target.value
      });
   }
  handleChangeBP(evt) {
      this.setState({
        bp: evt.target.value
      });
   }
   handleChangeBW(evt) {
      this.setState({
        bw: evt.target.value
      });
   }
   handleChangePBF(evt) {
      this.setState({
        pbf: evt.target.value
      });
   }
   handleChangeBMI(evt) {
      this.setState({
        bmi: evt.target.value
      });
   }
   handleChangeHeight(evt) {
      this.setState({
        height: evt.target.value
      });
   }
   handleChangeWC(evt) {
      this.setState({
        wc: evt.target.value
      });
   }

  log_data(e) {
    var user = firebase.auth().currentUser.uid;
    firebase.database().ref( 'participants/' + user + '/healthdata' ).set({
      bg  : this.state.bg,
      bc  : this.state.bg,
      bp  : this.state.bp,
      bw  : this.state.bw,
      pbf  : this.state.pbf,
      bmi  : this.state.bmi,
      height  : this.state.height,
      wc  : this.state.wc
    });
  }
  render () {                                   
      return (
        <div>
          <Container>
            <Header title='Health Information'></Header>

          </Container>
              <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Form id='form' onSubmit={this.log_data}>
                <FormGroup>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='bg' type="text" id="bg"
                      placeholder="Blood Glucose" value={this.state.bg} onChange={this.handleChangeBG}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='bc' type="text" id="bc"
                      placeholder="Blood Cholesterol" value={this.state.bc} onChange={this.handleChangeBC}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='bp' type="text" id="bp"
                      placeholder="Blood Pressure" value={this.state.bp} onChange={this.handleChangeBP}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='bw' type="text" id="bw"
                      placeholder="Body Weight" value={this.state.bw} onChange={this.handleChangeBW}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='height' type="text" id="height"
                      placeholder="Height" value={this.state.height} onChange={this.handleChangeHeight}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='pbf' type="text" id="pbf"
                      placeholder="% Body Fat" value={this.state.pbf} onChange={this.handleChangePBF}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='bmi' type="text" id="bmi"
                      placeholder="Blood Glucose" value={this.state.bmi} onChange={this.handleChangeBMI}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='waist' type="text" id="waist"
                      placeholder="Waist circumference" value={this.state.waist} onChange={this.handleChangeWaist}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <Button variant='outline-primary' id='log' type="submit">Log Health Information</Button>
                  </Row>
                </FormGroup>
                </Form>
          </Col>
        </div>
      )
   }

 

 
}