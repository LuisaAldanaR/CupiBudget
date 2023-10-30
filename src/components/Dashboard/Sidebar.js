import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


function Sidebar() {
  const linkStyles = {
    textDecoration: 'none', // Elimina el subrayado
    color: "black"
  };

  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };
  
  return (
    <SideNav className="CustomNavbar" style={{ backgroundColor: '#39a900', height: '100%', position: 'fixed', zIndex: '2' }}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home" onClick={() => handleClick('/home')}>
          <NavIcon>
            <Link to="/Home" style={linkStyles}>
              <FaIcons.FaHome style={{ fontSize: '1.5em', color: '#FEFEC2' }} />
            </Link>
          </NavIcon>
          <NavText style={{ fontSize: '1.5em' }}>
            <Link to="/Home" style={{ textDecoration: 'none', color: 'white' }}>
              Inicio
            </Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="programas">
          <NavIcon><FaIcons.FaBook style={{ fontSize: "1.5em", color: '#FEFEC2' }} /></NavIcon>
          <NavText style={{ fontSize: "1.5em" }}>Programas</NavText>
          <NavItem eventKey="tecnico">
            <NavText style={{ fontSize: "1.2em" }} eventKey="tecnico"><Link to="/SchedulingTechnical" style={linkStyles}>Tecnico</Link></NavText>
          </NavItem>
          <NavItem eventKey="tecnologo">
            <NavText style={{ fontSize: "1.2em" }} eventKey="tecnologo"><Link to="/SchedulingTechnological" style={linkStyles}>Tecnologo</Link></NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="programacion" onClick={() => handleClick('/budgetGenerator')}>
        <NavIcon>
          <Link to="/budgetGenerator" style={linkStyles}>
            <FaIcons.FaFileInvoiceDollar style={{ fontSize: "1.5em", color: '#FEFEC2' }} />
          </Link>
        </NavIcon>
        <NavText style={{ fontSize: "1.5em" }}>
          Programación
        </NavText>
        <span data-for="tooltip" data-tip="Puedes generar reporte">
          <Tooltip id="tooltip" type="light">
            <p style={{ fontSize: "1.2rem", padding: "10px" }}>Puedes generar reporte</p>
          </Tooltip>
        </span>
      </NavItem>
        <NavItem eventKey="goals" onClick={() => handleClick('/goals')}>
          <NavIcon>
            <Link to="/Goals" style={linkStyles}>
              <ImIcons.ImTarget style={{ fontSize: "1.5em", color: '#FEFEC2' }} />
            </Link>
          </NavIcon>
          <NavText style={{ fontSize: "1.5em" }}>
            Metas
          </NavText>
        </NavItem>
        <NavItem eventKey="instructores">
          <NavIcon><FaIcons.FaUserTie style={{ fontSize: "1.5em", color: '#FEFEC2'}} /></NavIcon>
          
          <NavText style={{ fontSize: "1.5em" }}>Instructores </NavText>
        
          <NavItem eventKey="FullTimeInstructor">
                  <NavText style={{ fontSize: "1.2em"}} eventKey="planta">
          <Link to="/CrudAppFullTimeInstructor" style={{ textDecoration: "none", color:"black" }}>Planta</Link>
        </NavText>
          </NavItem>
          <NavItem eventKey="contrato">
            <NavText  style={{ fontSize: "1.2em"}} eventKey="contrato"><Link to="/CrudApp" style={linkStyles}> Contrato</Link></NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}


export default Sidebar;