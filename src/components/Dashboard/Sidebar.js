import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { Link } from "react-router-dom";

function Sidebar() {
  const linkStyles = {
    textDecoration: "none",
    color: "black",
    userSelect: "none",
  };

  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <SideNav
      className="CustomNavbar"
      style={{
        backgroundColor: "#39a900",
        height: "100%",
        position: "fixed",
        zIndex: "2",
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem  eventKey="home" onClick={() => handleClick("/home")} title="Inicio" >
          <NavIcon>
            <Link to="/Home" style={linkStyles}>
              <FaIcons.FaHome style={{ fontSize: "1.5em", color: "#FEFEC2" }} />
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
        <NavItem eventKey="programas" style={{ backgroundColor: "" }}>
          <NavIcon>
            <FaIcons.FaBook style={{ fontSize: "1.5em", color: "#FEFEC2" }} />
          </NavIcon>
          <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
            Programas
          </NavText>
          <NavItem
            eventKey="tecnico"
            onClick={() => handleClick("/SchedulingTechnical")}
          >
            <NavText
              style={{ fontSize: "1.2em", userSelect: "none" }}
              eventKey="tecnico"
            >
              <Link to="/SchedulingTechnical" style={linkStyles}>
                Tecnico
              </Link>
            </NavText>
          </NavItem>
          <NavItem
            eventKey="tecnologo"
            onClick={() => handleClick("/SchedulingTechnological")}
          >
            <NavText style={{ fontSize: "1.2em" }} eventKey="tecnologo">
              <Link to="/SchedulingTechnological" style={linkStyles}>
                Tecnologo
              </Link>
            </NavText>
          </NavItem>
          <NavItem
            eventKey="auxiliar"
            onClick={() => handleClick("/SchedulingTechnical")}
          >
            <NavText
              style={{ fontSize: "1.2em", userSelect: "none" }}
              eventKey="auxiliar"
            >
              <Link to="/SchedulingTechnical" style={linkStyles}>
                Auxiliares
              </Link>
            </NavText>
          </NavItem>
          <NavItem
            eventKey="operario"
            onClick={() => handleClick("/SchedulingTechnical")}
          >
            <NavText
              style={{ fontSize: "1.2em", userSelect: "none" }}
              eventKey="operario"
            >
              <Link to="/SchedulingTechnical" style={linkStyles}>
                Operarios
              </Link>
            </NavText>
          </NavItem>
        </NavItem>

        <NavItem
          eventKey="programacion"
          onClick={() => handleClick("/budgetGenerator")}
          title="Programacion"
         
        >
          <NavIcon>
            <Link to="/budgetGenerator" style={linkStyles}>
              <FaIcons.FaFileInvoiceDollar
                style={{ fontSize: "1.5em", color: "#FEFEC2" }}
              />
            </Link>
          </NavIcon>
          <NavText
            style={{ fontSize: "1.5em", userSelect: "none" }}
          >
            Programación
          </NavText>
        </NavItem>
        <NavItem  eventKey="goals" onClick={() => handleClick("/goals")} title="Metas">
          <NavIcon>
            <Link to="/Goals" style={linkStyles}>
              <ImIcons.ImTarget
                style={{ fontSize: "1.5em", color: "#FEFEC2" }}
                
              />
            </Link>
          </NavIcon>
          <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
            Metas
          </NavText>
        </NavItem>
        <NavItem eventKey="instructores">
          <NavIcon>
            <FaIcons.FaUserTie
              style={{ fontSize: "1.5em", color: "#FEFEC2" }}
            />
          </NavIcon>
          <NavText style={{ fontSize: "1.5em", userSelect: "none" }}>
            Instructores
          </NavText>
          <NavItem eventKey="FullTimeInstructor">
            <NavText
              style={{
                fontSize: "1.2em",
                outline: "none",
              }}
              eventKey="planta"
              onClick={() => handleClick("/CrudAppFullTimeInstructor")}
            >
              <Link
                to="/CrudAppFullTimeInstructor"
                style={{
                  textDecoration: "none",
                  color: "black",
                  userSelect: "none",
                }}
              >
                Planta
              </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="contractInstructor">
            <NavText
              style={{
                fontSize: "1.2em",
                outline: "none",
              }}
              eventKey="contractInstructor"
              onClick={() => handleClick("/CrudApp")}
            >
              <Link
                to="/CrudApp"
                style={{
                  textDecoration: "none",
                  color: "black",
                  userSelect: "none",
                }}
              >
                Contrato
              </Link>
            </NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Sidebar;
