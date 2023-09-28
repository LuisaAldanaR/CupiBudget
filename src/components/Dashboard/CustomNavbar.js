import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../../App.scss";
import * as FaIcons from "react-icons/fa";

function CustomNavbar() {
  return (
    <Navbar id="navbar">
      <img
        src="/img/logo-sena-white.png"
        className="custom-logo"
        alt="SENA Logo"
      />
      <p className="sena-title">Servicio Nacional De Aprendizaje</p>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <FaIcons.FaBell
            className="notibell"
            style={{ marginRight: "45px", marginTop: "13px", color: "white", fontSize: "20px" }}
          />
          <NavDropdown
            title={
              <span>
                <FaIcons.FaUserAlt style={{ width: "40px", color: "white", fontSize: "20px", marginBottom: "5px" }} />{" "}
                <span className="oscar-text" style={{ marginRight: "10px"}}>
                    Oscar Peña
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
