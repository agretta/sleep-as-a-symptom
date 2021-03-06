import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import Select from 'react-select'
import { Container, Col, Row, Form, FormGroup, FormControl, Button, Modal} from 'react-bootstrap'

var firebase = require("firebase");
// Attach an asynchronous callback to read the data at our posts reference

export default class AdminPortal extends Component {


  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseExit = this.handleCloseExit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.addResearcher = this.addResearcher.bind(this);
    this.downloadSleepData = this.downloadSleepData.bind(this);

    var options = []
    // var res = firebase.database().ref("researchers/");
    // res.on("child_added", data => {
    //   console.log("First Name: " + data.val().first_name);
    //   console.log("Last Name: " + data.val().last_name);
    //   console.log("Location: " + data.val().institution);
    //   console.log("Location: " + data.val().email);
    //   console.log("ID " + data.key);
    //   // this.state.options.push({value:data.key , label: data.val().first_name + ' ' + data.val().last_name + ' From ' + data.val().institution})
    //   // options.push({value:data.key , label: data.val().first_name + ' ' + data.val().last_name + ' From ' + data.val().institution})
    //   // this.setState(this.state.options);
    //   console.log(`options:`, options);
    //   // this.setState({update:true});
    //   // this.setState({update:!this.state.update});
    //   this.setState({update: Math.random()})
    // });

   this.state = {
      title: "Administrator Portal",
      selectedOption: null,
      show: false,
      selectedOptionName: null,
      selectedOptionID: null,
      selectedOptionEmail: null,
      options:options,
      update:0,
      email:null,
      valid_researchers: []
    };
    var res = firebase.database().ref("valid_researchers/");
    res.on("child_added", data  => {
    //  this.setState(this.state.valid_researchers);
   // console.log(this.state.valid_researchers);
      options.push({value:data.key, label: data.val().email})
      this.setState({update: Math.random()})
    });


 

    var res = firebase.database().ref("valid_researchers/");
    res.on("child_added", data  => {
      this.state.valid_researchers.push(data.val().email);
      this.setState(this.state.valid_researchers);
      console.log(this.state.valid_researchers);
      this.setState({update: Math.random()})
    });
    this.setState({options:options});
  }

  handleChange = (selectedOption) => {
      this.setState({ selectedOption: selectedOption });
      this.setState({ selectedOptionName: selectedOption.label });
      this.setState({ selectedOptionEmail: selectedOption.label});
      this.setState({ selectedOptionID: selectedOption.value});
      console.log(`Option selected:`, selectedOption.label);
      console.log(`options:`, this.state.options);
      this.handleShow();
    }

  handleClose() {

    var user  = firebase.auth().currentUser;
    if (!this.state.valid_researchers.includes(user.email)) {
      console.log(this.state.valid_researchers);
      alert("You are not a valid researcher")
      this.handleCloseExit();
    }

    firebase.database().ref("valid_researchers/" + this.state.selectedOptionID).remove();
    console.log('removing ' + this.state.selectedOptionEmail+ ' ' + this.state.selectedOptionID );
    for( var i =0;i<this.state.options.length;i++){
      console.log(`val:`, this.state.options[i].value);
      if (this.state.selectedOptionID == this.state.options[i].value) {
        this.state.options.splice(i,1);
      }
    }
    console.log(`options:`, this.state.options);
    this.setState({update: Math.random()})
    this.handleCloseExit();
  }

  handleCloseExit() {
    this.setState({ show: false });
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleShow() {
    this.setState({ show: true });
  }

  addResearcher() {
    var user  = firebase.auth().currentUser;
    if (!this.state.valid_researchers.includes(user.email)) {
      console.log(this.state.valid_researchers);
      alert("You are not a valid researcher")
      return false;
    }
    firebase.database().ref('valid_researchers/').push({email: this.state.email});
    console.log(this.state.email)
  }

  downloadSleepData() {

    var user  = firebase.auth().currentUser;
    if (!this.state.valid_researchers.includes(user.email)) {
      console.log(this.state.valid_researchers);
      alert("You are not a valid researcher")
      return false;
    }

    var sleep_arr  = [];
    var sleep_data = firebase.database().ref("participants/").once("value", function( snapshot ) {
      snapshot.forEach(function(childSnapshot) {
        var datum = childSnapshot.val();

        if( datum != null ) {
          sleep_arr.push(datum);
        }
      });
    }).then((snapshot) => {
      var jsonse = JSON.stringify(sleep_arr);
      var blob   = new Blob([jsonse], {type: "application/json"});
      var url    = URL.createObjectURL(blob);

      var a         = document.createElement('a');
      a.href        = url;
      a.download    = "sleep_data.json";
      a.textContent = "Download sleep_data.json";

      document.getElementById('json').appendChild(a);
    });


  }

  render ()  {
      return (
        <div>
          <Header title={this.state.title}></Header>
          Remove authorized researcher:
            <Select key={this.state.update}
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.options}
              />

          Add authorized researcher:
          <Col style={{display: 'flex', justifyContent: '', alignItems: 'center'}}>
                <Form id='form' onSubmit={this.addResearcher}>
                  <FormGroup>
                  <Row style={{display: 'flex', justifyContent: 'center',}}>
                    <FormControl className='input' name='email' type="text" id="email"
                      placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                  </Row>

                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Button variant='outline-primary' onClick={this.addResearcher}>Add Researcher</Button>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                    <Button variant='outline-primary' id='download_data' onClick={this.downloadSleepData}>Generate JSON File</Button>
                    <Button variant='outline-light' id='json'></Button>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                  </Row>
                  <Row style={{display: 'flex', justifyContent: 'left',}}>
                  <NavButton to='/dashboard'>Dashboard</NavButton>
                  </Row>
                  </FormGroup>
                </Form>

          </Col>


        <Modal show={this.state.show} onHide={this.handleCloseExit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Researcher?</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.selectedOptionName} </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseExit}>
              Exit
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Remove Researcher
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      )
   }
}
