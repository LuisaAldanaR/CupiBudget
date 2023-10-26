import React from "react";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { Link } from 'react-router-dom';

function Sidebar() {
  const linkStyles = {
    textDecoration: 'none', // Elimina el subrayado
  };
  return (
    <SideNav className="CustomNavbar">
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon><FaIcons.FaHome style={{ fontSize: "1.5em" }} /></NavIcon>
          <NavText style={{ fontSize: "1.5em"}} ><Link to="/Home" style={linkStyles}> Home</Link></NavText>
        </NavItem>
        <NavItem eventKey="programas">
          <NavIcon><FaIcons.FaBook style={{ fontSize: "1.5em" }} /></NavIcon>
          <NavText style={{ fontSize: "1.5em" }}>Programas</NavText>
          <NavItem eventKey="tecnico">
            <NavText style={{ fontSize: "1.2em" }} eventKey="tecnico"><Link to="/SchedulingTechnical" style={linkStyles}>Tecnico</Link></NavText>
          </NavItem>
          <NavItem eventKey="tecnologo">
            <NavText style={{ fontSize: "1.2em" }} eventKey="tecnologo"><Link to="/SchedulingTechnological" style={linkStyles}>Tecnologo</Link></NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="programacion">
          <NavIcon><FaIcons.FaFileInvoiceDollar style={{ fontSize: "1.5em" }} /></NavIcon>
          <NavText style={{ fontSize: "1.5em" }}>Programación</NavText>
          <NavItem eventKey="reporte">
            <NavText style={{ fontSize: "1.2em" }} eventKey="reporte"><Link to="/BudgetGenerator" style={linkStyles}>Reporte</Link></NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="metas">
          <NavIcon><ImIcons.ImTarget style={{ fontSize: "1.5em" }} /></NavIcon>
          <NavText style={{ fontSize: "1.5em" }}><Link to="/Goals" style={linkStyles}> Metas</Link></NavText>
        </NavItem>
        <NavItem eventKey="instructores">
          <NavIcon><FaIcons.FaUserTie style={{ fontSize: "1.5em" }} /></NavIcon>
          
          <NavText style={{ fontSize: "1.5em" }}>Instructores </NavText>
        
          <NavItem eventKey="FullTimeInstructor">
                  <NavText style={{ fontSize: "1.2em"}} eventKey="planta">
          <Link to="/CrudAppFullTimeInstructor" style={{ textDecoration: "none" }}>Planta</Link>
        </NavText>
          </NavItem>
          <NavItem eventKey="contrato">
            <NavText  style={{ fontSize: "1.2em" }} eventKey="contrato"><Link to="/CrudApp" style={linkStyles}> Contrato</Link></NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Sidebar;