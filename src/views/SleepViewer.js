import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from '../components/NavButton'
import Header from '../components/Header'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Container, Row, Col, Button, FormControl, FormGroup, Form } from 'react-bootstrap'

var firebase = require("firebase");
var axios    = require("axios");

ReactChartkick.addAdapter(Chart);

export default class SleepViewer extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.accessData = this.accessData.bind(this);
    this.state = {
      fb_auth : false,
      token   : null,
      title   : 'FitBit Settings',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // grab the unique user id and check if it matches a researcher or participant
        var uid             = firebase.auth().currentUser.uid;
        var participant_ref = firebase.database().ref( "participants/" + uid );
        var researcher_ref  = firebase.database().ref( "researchers/" + uid );

        // check if a participant profile exists
        participant_ref.once("value").then((snapshot) => {
          var token_exists = snapshot.child("api_token").exists();
          var token        = snapshot.child("api_token").val();

          // we only need a state update if a profile exists
          if( token_exists ) {
            this.setState({
              token   : token,
              fb_auth : token_exists,
            });
          }

        });

        // check if a researcher profile exists
        researcher_ref.once("value").then((snapshot) => {
          var token_exists = snapshot.child("api_token").exists();
          var token = snapshot.child("api_token").val();

          // we only need a state update if a profile exists
          if( token_exists ) {
            this.setState({
              token   : token,
              fb_auth : token_exists,
            });
          }

        });
      } else {
        // No user is signed in,
        // so we don't do anything
      }
    });
  }

  // grabs user's sleep data from the fitbit API and updates our firebase servers
  accessData() {

    // grab current date and convert to yyyy-MM-dd format for fitbit API
    var current_date = new Date().toISOString().slice( 0, 10 );
    var auth_string  = "Bearer " + this.state.token;
    var api_url      = 'https://api.fitbit.com/1.2/user/-/sleep/list.json';

    // send get request to fitbit API to grab user's sleep data
    axios.request({
      method  : 'get',
      baseURL : api_url,
      headers : {'Authorization': auth_string },
      params  : {
        sort       : 'asc',
        limit      : 100,
        offset     : 0,
        beforeDate : current_date,
      },
    }
    )
      .then((response)=> {
        var trimmed_sleep_data = new Object();
        for (var i = response.data.sleep.length - 10; i < response.data.sleep.length; i++)
        {
          var obj = (new Object());
          obj[response.data.sleep[i].dateOfSleep] = response.data.sleep[i].duration / 1000 / 3600;
          for (var date in obj) { //just one of them
            trimmed_sleep_data[date] = obj[date];
          }
        }
        this.setState({
          'sleep_data': trimmed_sleep_data
        });
        console.log(this.state.sleep_data);
        var user = firebase.auth().currentUser.uid;
        var keyArr = [];

        // set the sleep_data in the DB (we only want participants' data)
        firebase.database().ref('participants').orderByKey().once('value', function(snapshot) {

          snapshot.forEach(function(childSnapshot) {
            keyArr.push(childSnapshot.key);
          });

        }).then(function() {
            if (keyArr.indexOf(user) > -1) {
              firebase.database().ref( 'participants/' + user ).update({
                sleep_data: response.data,
              });
            }
        });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }

  render () {
    if (this.state.fb_auth) {
      console.log(this.state.sleep_data)
      return (
        <div>
          <Header title='Sleep Viewer'></Header>
          <br></br>

          <LineChart
            xtitle="Date"
            ytitle="Hours Slept"
            curve={false}
            data={this.state.sleep_data}
          />

          <Row style={{display: 'flex', justifyContent: 'center',}}>
              <Button variant='outline-primary' id='test_data' onClick={this.accessData}>Update sleep data!</Button>
          </Row>
          <Row style={{display: 'flex', justifyContent: 'center',}}>
              <NavButton to='/dashboard'>Dashboard</NavButton>
            </Row>
       </div>
      )
    } else {
      return (
        <div>
          <Header title='Oh no!'></Header>
            <br></br>
	    <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Please link your FitBit to see your sleep data.
            </p>
          <NavButton to='/dashboard'>Dashboard</NavButton>
        </div>
      )
    }
  }
}
