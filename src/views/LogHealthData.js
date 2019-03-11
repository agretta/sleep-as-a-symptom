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
    this.handleChangeHeightFt = this.handleChangeHeightFt.bind(this);
    this.handleChangeHeightIn = this.handleChangeHeightIn.bind(this);
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
      height_ft:'',
      height_in:'',
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

   handleChangeHeightFt(evt) {
        this.setState({
            height_ft: evt.target.value
        });
   }

   handleChangeHeightIn(evt) {
        this.setState({
            height_in: evt.target.value
        });
   }

   handleChangeHeight(evt) {
      this.setState({
        height: evt.target.value
      });
       //BMI is kg/m^2
       if (this.state.BMI != '' && !isNaN(this.state.bw) && !isNaN(this.state.height_ft)) {
           this.setState({
               bmi: 0.45*this.state.bw/(Math.pow((this.state.height*0.3048),2))
           });
       }

   }
   handleChangeWC(evt) {
      this.setState({
        wc: evt.target.value
      });
   }

  log_data(e) {
    var errorCode = null;
    if (!isNaN(this.state.bg)) {
        var bg_num = +this.state.bg;
        if (bg_num < 0 || bg_num > 800) {
            errorCode = 1;
        }
    } else if (isNaN(this.state.bg)) {
        errorCode = 2;       
    } else if (!isNaN(this.state.bc)) {
        var bc_num = +this.state.bc;
        if (bc_num < 0  || bc_num > 300) {
            errorCode = 2;
        }
    } else if (isNaN(this.state.bc)) {
        errorCode = 2;
    } else if (!isNaN(this.state.bp)) {
        var bp_num = +this.state.bp;
        if (bp_num <  20 || bp_num > 200) {
            errorCode = 3;
        }
    } else if (isNaN(this.state.bp)) {
        errorCode = 3;
    } else if (!isNaN(this.state.bw)) {
        var bw_num = +this.state.bw;
        if (bw_num <  0 || bw_num > 1000) {
            errorCode = 4;
        }
    } else if (isNaN(this.state.bw)) {
        errorCode = 4;
    } else if (!isNaN(this.state.pbf)) {
        var pbf_num = +this.state.pbf;
        if (pbf_num < 0 || pbf_num > 50) {
            errorCode = 5;
        }
    } else if (isNaN(this.state.pbf)) {
        errorCode = 5;
    } else if (!isNaN(this.state.bmi)) {
        var bmi_num = +this.state.bmi;
        if (bmi_num < 0  || bmi_num > 40) {
            errorCode = 6;
        }
    } else if (isNaN(this.state.bmi)) {
        errorCode = 6;
    } else if (!isNaN(this.state.height_ft)) {
        var height_ft = +this.state.height_ft;
        if (height_ft < 0  || height_ft > 10) {
            errorCode = 7;
        }
    } else if (isNaN(this.state.height_ft)) {
        errorCode = 7;
    } else if (!isNaN(this.state.height_in)) {
        var height_in = +this.state.height_in;
        if (height_in < 0  || bmi_num > 12) {
            errorCode = 7;
        }
    } else if (isNaN(this.state.height_in)) {
        errorCode = 7;
    } else if (!isNaN(this.state.height)) {
        var height = +this.state.height;
        var height = +this.state.height_ft + +this.state.height_in/12;
        if (height < 0  || height > 10) {
            errorCode = 7;
        }
    } else if (isNaN(this.state.height)) {
        errorCode = 7;
    } else if (!isNaN(this.state.wc)) {
        var wc = +this.state.wc;
        if (wc < 10 || wc > 80) {
            errorCode = 8;
        }
    } else if (isNaN(this.state.wc)) {
        errorCode = 8;
    }

    if (errorCode != null){

        switch (errorCode) {
        case '1':
            alert('Blood Glucose not Valid');
            break;
        case '2':
            alert('Blood Cholesterol Level is not Valid');
            break;
        case '3':
            alert('Blood Pressure Level is not Valid');
            break;
        case '4':
            alert('Body Weight is not Valid');
            break;
        case '5':
            alert('Percent Body Fat is not Valid');
            break;
        case '6':
            alert('BMI is not Valid');
            break;
        case '7':
            alert('Height is not Valid');
            break;
        case '8':
            alert('Waist size is not Valid');
            break;
        default:
            alert('Error\n');
        }
    } else {
        var user = firebase.auth().currentUser.uid;
        var date_ms = Date.now();
        var date = new Date(date_ms);
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getYear();
        firebase.database().ref( 'participants/' + user + '/healthdata' + '/' + date_ms).set({
        bg  : this.state.bg,
        bc  : this.state.bc,
        bp  : this.state.bp,
        bw  : this.state.bw,
        pbf  : this.state.pbf,
        bmi  : this.state.bmi,
        height  : this.state.height,
        wc  : this.state.wc
        });
    }
  }

  render () {                                   
      return (
        <div>
          <Container>
            <Header title='Health Information'></Header>

          </Container>
              <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'left'}}>
                <Form id='form' onSubmit={this.log_data}>
                <FormGroup>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>Blood Glucose</Form.Label>
                    <FormControl className='input' name='bg' type="text" id="bg"
                      placeholder="Blood Glucose" value={this.state.bg} onChange={this.handleChangeBG}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>Blood Cholesterol</Form.Label>
                    <FormControl className='input' name='bc' type="text" id="bc"
                      placeholder="Blood Cholesterol" value={this.state.bc} onChange={this.handleChangeBC}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>Blood Pressure</Form.Label>
                    <FormControl className='input' name='bp' type="text" id="bp"
                      placeholder="Blood Pressure" value={this.state.bp} onChange={this.handleChangeBP}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>Body Weight</Form.Label>
                    <FormControl className='input' name='bw' type="text" id="bw"
                      placeholder="Body Weight" value={this.state.bw} onChange={this.handleChangeBW}/>
                    </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                          <Form.Label>Height</Form.Label>
                    <FormControl className='input' name='height_ft' type="text" id="height_ft"
                      placeholder="Height in Feet" value={this.state.height_ft} onChange={this.handleChangeHeightFt}/>
                    <FormControl className='input' name='height_in' type="text" id="height_in"
                      placeholder="Height in In" value={this.state.height_in} onChange={this.handleChangeHeightIn}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>%Body Fat</Form.Label>
                    <FormControl className='input' name='pbf' type="text" id="pbf"
                      placeholder="% Body Fat" value={this.state.pbf} onChange={this.handleChangePBF}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>BMI</Form.Label>
                    <FormControl className='input' name='bmi' type="text" id="bmi"
                      placeholder="BMI" value={this.state.bmi} onChange={this.handleChangeBMI}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Form.Label>Waist Circumference</Form.Label>
                    <FormControl className='input' name='waist' type="text" id="waist"
                        placeholder="Waist circumference" value={this.state.waist} onChange={this.handleChangeWaist}/>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Button variant='outline-primary' id='log' type="submit">Log Health Information</Button>
                  </Row>
                </FormGroup>
                </Form>
          </Col>
        </div>
      )
   }

 

 
}
