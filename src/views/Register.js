import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavButton'

export default class Register extends Component { 
  state = { 
  }

  constructor(props) {
    super(props);
    this.checkIt = this.checkIt.bind(this);
    this.unCheckIt = this.unCheckIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked:false
    };
  }

  checkIt() {
    this.setState({
      checked:true
    });
  }

  unCheckIt() {
    this.setState({
      checked:false
    });
  }

  handleChange(evt) {
    if(this.state.checked !== evt.target.checked) {
       this.setState({
         checked:evt.target.checked
       });
    }
 }
  
  render () {                                   
      return (
        <div>
             <div id='signinContainer'>
              <form id='form' onSubmit={this.onSubmit.bind(this)}>
                <input className='input' name='email' type="text"
                  placeholder="Email"/>
                <input className='input' name='pass' type="password"
                  placeholder="Password"/>          
                <input className='input' name='cPass' type="password"  
                  placeholder="Confirm Password"/>          
                <button id='submit' type="submit">Sign Up</button>
              </form>
             </div>
              <div>
                I'm an Administrator: <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                  {this.state.checked ? <input className='input' name='email' type="text"
                  placeholder="Admin Code" onChange={this.onClick}/> : null}
              </div>
             <div>
              <NavButton to='/login'>Login</NavButton>
              <NavButton to='/dashboard'>Dashboard</NavButton>
             </div>
        </div>
      )
   }

  onSubmit(e){
      var user = {
          email: e.target.elements.email.value,
          pass: e.target.elements.pass.value,
          id: Math.floor(Math.random() * 10000000000)
      }
      console.log(user)
  }

}