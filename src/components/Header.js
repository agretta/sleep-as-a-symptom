import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Container, Nav, Navbar, NavDropdown, Button, Dropdown} from 'react-bootstrap';
import PropTypes from 'prop-types'
import BackButton from '../components/BackButton'
import NavButton from '../components/NavButton'

const Header = (props) => {
  const {
    title,
    back_button,
    dropdown,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props

  function onUserSettingsClick(event) {
    this.props.history.push("/account-management");
  }

  function onFBSettingsClick(event) {
    this.props.history.push("/fitbit-settings");
  }

  return (
    <Container>
      <Navbar bg="white" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <BackButton>
        </BackButton>
        <Nav  className="justify-content-center">
          <Nav.Item></Nav.Item>
          <Nav.Item>
          <h3>{props.title}</h3>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
           <Nav pullRight className="justify-content-end">
             <NavDropdown title="..." id="nav-dropdown">
                <NavDropdown.Item onClick={onUserSettingsClick} href="/account-management">User Settings</NavDropdown.Item>
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onFBSettingsClick} href="/fitbit-settings">FitBit Settings</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Navbar> 
    </Container>

  );
}


Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;

