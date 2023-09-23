import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../App.scss';
import * as FaIcons from 'react-icons/fa';

/**
 * The CustomNavbar component provides a customized navigation bar for the application.
 *
 * This component includes the SENA logo, navigation links, and user-related options.
 *
 * @returns {JSX.Element} The rendered CustomNavbar component.
 */
function CustomNavbar() {
  return (
    <Navbar id="navbar" expand="lg" className="bg-body-tertiary">
        {/* SENA Logo */}
        <img
            src="/img/Logo-sena.png"
            className="custom-logo" // Custom class for the logo
            alt="SENA Logo"
          />
          <p className='sena-title'>Servicio nacional de aprendizaje</p>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Notification Dropdown */}
            <NavDropdown title=<FaIcons.FaBell/> id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Notification 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Notification 2</NavDropdown.Item>
            </NavDropdown>
            {/* User Profile Link */}
            <Nav.Link href="#link"><FaIcons.FaUserAlt/></Nav.Link>
            {/* User Menu Dropdown */}
            <NavDropdown title="Oscar Peña" id="basic-nav-dropdown" className='user-drop'>
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
