import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../../App.scss";
import * as FaIcons from "react-icons/fa";
function CustomNavbar() {
  
let role = "";
const token = localStorage.getItem('jwtToken');

if (!token) {
  console.error("Token is null or undefined");
  // Handle the case where the token is not present
  // You might want to redirect the user to the login page or take appropriate action
  return null;
}

function isTokenExpired(token)
{
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role = (tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    console.log(role);
    return Math.floor(new Date().getTime / 1000) >= tokenPayload?.sub;
} 

isTokenExpired(token)

const redirectToHome = () => {
  window.location.href = 'home';
};

  return (
    <Navbar id="navbar">
      <img
        src="/img/logo-sena-white.png"
        className="custom-logo"
        alt="SENA Logo"
        onClick={redirectToHome}
        style={{cursor:"pointer"}}
      />
      <p className="sena-title">Servicio Nacional De Aprendizaje</p>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
         
          <NavDropdown
            title={
              <span>
                <FaIcons.FaUserAlt style={{ width: "40px", color: "white", fontSize: "20px", marginBottom: "5px" }} />{" "}
                <span className="oscar-text" style={{ marginRight: "10px"}}>
                    {role}
                  </span>
              </span>
            }
            id="basic-nav-dropdown"
            itemID="user-name"
            
          >
            <NavDropdown.Item  href="/">Cerrar Sesión</NavDropdown.Item >
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
