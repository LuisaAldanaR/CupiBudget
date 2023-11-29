import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { Link } from "react-router-dom";
import ClickOutside from "./ClickOutside";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const linkStyles = {
    textDecoration: "none",
    color: "black",
    userSelect: "none",
  };

  const navigate = useNavigate();

  const handleClick = (eventKey, route) => {
    navigate(route);
    setSelectedItem(eventKey);
  };

  let role = "";
  const token = localStorage.getItem("jwtToken");

  function isTokenExpired(token) {
    const arrayToken = token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role =
      tokenPayload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
  }

  isTokenExpired(token);

  return (
    <ClickOutside
      onClickOutside={() => {
        setExpanded(false);
      }}
    >
      <SideNav
        className="CustomNavbar"
        style={{
          backgroundColor: "#39a900",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: "2",
        }}
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected={selectedItem}>
          <NavItem
            eventKey="home"
            onClick={() => handleClick("home", "/Home")}
            title="Inicio"
            style={{
              backgroundColor: selectedItem === "home" ? "#006400" : "",
            }}
          >
            <NavIcon>
              <Link to="/Home" style={linkStyles}>
                <FaIcons.FaHome
                  style={{ fontSize: "1.5em", color: "#FEFEC2" }}
                  className="sidebar-icons"
                />
              </Link>
            </NavIcon>
            <NavText style={{ fontSize: "1.5em" }}>
              <Link
                to="/Home"
                style={{
                  textDecoration: "none",
                  color: "white",
                  userSelect: "none",
                }}
              >
                Inicio
              </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="programas" style={{fontSize:"1.1em"}}>
            <NavIcon>
              <FaIcons.FaBook
                className="sidebar-icons"
                style={{ fontSize: "1.5em", color: "#FEFEC2" }}
              />
            </NavIcon>
            <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
              Programas
            </NavText>
            <NavItem
              eventKey="tecnico"
              onClick={() => handleClick("tecnico", "/SchedulingTechnical")}
            >
              <NavText
                style={{
                  fontSize: "1.4em",
                  outline: "none",
                }}
                eventKey="tecnico"
                onClick={() => handleClick("tecnico", "/SchedulingTechnical")}
              >
                <Link to="/CrudApp"></Link>
                Tecnico
              </NavText>
            </NavItem>
            <NavItem
              eventKey="tecnologo"
              onClick={() =>
                handleClick("tecnologo", "/SchedulingTechnological")
              }
            >
              <NavText
                style={{
                  fontSize: "1.4em",
                  outline: "none",
                }}
                eventKey="tecnologo"
                onClick={() =>
                  handleClick("tecnologo", "/SchedulingTechnological")
                }
              >
                <Link to="/CrudApp"></Link>
                Tecnologo
              </NavText>
              </NavItem>
              <NavItem
              eventKey="auxiliar"
              onClick={() =>
                handleClick("auxiliar", "/SchedulingAssistant")
              }
            >
              <NavText
                style={{
                  fontSize: "1.4em",
                  outline: "none",
                }}
                eventKey="auxiliar"
                onClick={() =>
                  handleClick("auxiliar", "/SchedulingAssistant")
                }
              >
                <Link to="/CrudApp"></Link>
                Operarios
              </NavText>
              </NavItem>
          </NavItem>
  
          {role === "Admin" && (
            <>
              <NavItem
                eventKey="programacion"
                onClick={() => handleClick("programacion", "/budgetGenerator")}
                title="Programacion"
                style={{
                  backgroundColor:
                    selectedItem === "programacion" ? "#006400" : "",
                }}
              >
                <NavIcon>
                  <Link to="/budgetGenerator" style={linkStyles}>
                    <FaIcons.FaFileInvoiceDollar
                      style={{ fontSize: "1.5em", color: "#FEFEC2" }}
                      className="sidebar-icons"
                    />
                  </Link>
                </NavIcon>
                <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
                  Programación
                </NavText>
              </NavItem>
            </>
          )}
          <NavItem
            eventKey="goals"
            onClick={() => handleClick("goals", "/Goals")}
            title="Metas"
            style={{
              backgroundColor: selectedItem === "goals" ? "#006400" : "",
            }}
          >
            <NavIcon>
              <Link to="/Goals" style={linkStyles}>
                <ImIcons.ImTarget
                  style={{ fontSize: "1.5em", color: "#FEFEC2" }}
                  className="sidebar-icons"
                />
              </Link>
            </NavIcon>
            <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
              Metas
            </NavText>
          </NavItem>
          <NavItem eventKey="instructores" style={{fontSize:"1.1em"}}>
            <NavIcon>
              <FaIcons.FaUserTie
                className="sidebar-icons"
                style={{ fontSize: "1.5em", color: "#FEFEC2" }}
              />
            </NavIcon>
            <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
              Instructores
            </NavText>
            <NavItem eventKey="FullTimeInstructor">
              <NavText
                style={{
                  fontSize: "1.4em",
                  outline: "none",
                }}
                eventKey="contractInstructor"
                onClick={() =>
                  handleClick(
                    "FullTimeInstructor",
                    "/CrudAppFullTimeInstructor"
                  )
                }
              >
                <Link to="/CrudApp"></Link>
                Planta
              </NavText>
            </NavItem>
            <NavItem eventKey="contractInstructor">
              <NavText 
                style={{
                  fontSize: "1.4em",
                  outline: "none",
                }}
                eventKey="contractInstructor"
                onClick={() => handleClick("contractInstructor", "/CrudApp")}
              >
                <Link to="/CrudApp"></Link>
                Contrato
              </NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </ClickOutside>
  );
}

export default Sidebar;
