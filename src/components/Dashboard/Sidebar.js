import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import * as HiIcons from "react-icons/hi";
import "../../App.scss";

const Sidebar = () => {
  // Create state to control the visibility of each option
  const [optionVisibility, setOptionVisibility] = useState({
    option2: false,
    option3: false,
    option5: false,
  });

  // Handle the onMouseEnter event for each option
  const handleMouseEnter = (option) => {
    setOptionVisibility((prevState) => ({
      ...prevState,
      [option]: true,
    }));
  };

  // Handle the onMouseLeave event for each option
  const handleMouseLeave = (option) => {
    setOptionVisibility((prevState) => ({
      ...prevState,
      [option]: false,
    }));
  };

  // Determine if an option is active
  const isOptionActive = (option) => {
    return optionVisibility[option];
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-ul">
        <li className="sidebar-li">
          {/* Utiliza NavLink para redirigir a "/ruta-de-home" al hacer clic en "Inicio" */}
          <NavLink
              to="./home"
              className={`main-option ${
                isOptionActive("option0") ? "active" : ""
              } nav-link`}
            >
              <FaIcons.FaHome style={{marginLeft:"10px"}} />
              <span style={{ marginLeft: "30px", color: 'black', fontWeight:"600"}}>Inicio</span>{" "}
              
            </NavLink>
        </li>

        <li className="sidebar-li">
          <div
            style={{margin:0, padding:0}}
            onMouseEnter={() => handleMouseEnter("option6")}
            onMouseLeave={() => handleMouseLeave("option6")}
            className={`main-option ${
              isOptionActive("option6") ? "active" : ""
            }`} 
          > 
            <FaIcons.FaBook style={{marginLeft:"10px"}} />{" "}
            <span style={{ marginLeft: "25px", fontWeight:"600"}} >Programas</span>{" "}
            {isOptionActive("option6") ? (
              <HiIcons.HiChevronDown
                style={{ color: "green", marginLeft: "20px" }}
              />
            ) : (
              <HiIcons.HiChevronRight
                style={{ color: "green", marginLeft: "20px" }}
              />
            )}
          </div>
          {isOptionActive("option6") && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter("option6")}
              onMouseLeave={() => handleMouseLeave("option6")}
            >
              <li>
                <NavLink
                  to="/SchedulingTechnological"
                  id="submenu"
                  exact
                  activeclassname ="active"
                >
                  <span style={{ color: "black", fontSize: "17px"}}>Tecnológo</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/SchedulingTechnical" exact activeclassname ="active">
                  <span style={{ color: "black", fontSize: "17px" }}>Técnico</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar-li">
          <div
            onMouseEnter={() => handleMouseEnter("option2")}
            onMouseLeave={() => handleMouseLeave("option2")}
            className={`main-option ${
              isOptionActive("option2") ? "active" : ""
            }`}
          >
            <FaIcons.FaFileInvoiceDollar style={{marginLeft:"10px"}}  />{" "}
            <span style={{ marginLeft: "25px", fontWeight:"600" }}>Programación</span>{" "}
            {isOptionActive("option2") ? (
              <HiIcons.HiChevronDown
                style={{ color: "green" }}
              />
            ) : (
              <HiIcons.HiChevronRight
                style={{ color: "green"}}
              />
            )}
          </div>
          {isOptionActive("option2") && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter("option2")}
              onMouseLeave={() => handleMouseLeave("option2")}
            >
              <li>
                <NavLink
                  to="/BudgetGenerator"
                  id="submenu"
                  exact
                  activeclassname ="active"
                >
                 <span style={{ color: "black", fontSize: "17px"}}>Programación</span>

                </NavLink>
              </li>
            
            </ul>
          )}
        </li>
        <li className="sidebar-li">
          <div
            onMouseEnter={() => handleMouseEnter("option3")}
            onMouseLeave={() => handleMouseLeave("option3")}
            className={`main-option ${
              isOptionActive("option3") ? "active" : ""
            }`}
          >
            <ImIcons.ImTarget style={{marginLeft:"10px"}}/>{" "}
            <span style={{ marginLeft: "25px", fontWeight:"600" }}>Metas</span>{" "}
            {isOptionActive("option3") ? (
              <HiIcons.HiChevronDown
                style={{ color: "green", marginLeft: "69px" }}
              />
            ) : (
              <HiIcons.HiChevronRight
                style={{ color: "green", marginLeft: "69px" }}
              />
            )}
          </div>
          {isOptionActive("option3") && (
            <ul 
              className="submenu"
              onMouseEnter={() => handleMouseEnter("option3")}
              onMouseLeave={() => handleMouseLeave("option3")}
            >
              <li>
                <NavLink
                  to="/Goals"
                  id="submenu"
                  exact="true"
                  activeclassname ="active"
                >
                  <span style={{ color: "black", fontSize: "17px"}}>Metas</span>
                </NavLink>
              </li>
             
            </ul>
          )}
        </li>
        <li className="sidebar-li">
          <div
            style={{margin:0, padding:0}}
            onMouseEnter={() => handleMouseEnter("option5")}
            onMouseLeave={() => handleMouseLeave("option5")}
            className={`main-option ${
              isOptionActive("option5") ? "active" : ""
            }`} 
          > 
            <FaIcons.FaUserTie style={{marginLeft:"10px"}} />{" "}
            <span style={{ marginLeft: "25px", fontWeight:"600"}} >Instructores</span>{" "}
            {isOptionActive("option5") ? (
              <HiIcons.HiChevronDown
                style={{ color: "green", marginLeft: "20px" }}
              />
            ) : (
              <HiIcons.HiChevronRight
                style={{ color: "green", marginLeft: "20px" }}
              />
            )}
          </div>
          {isOptionActive("option5") && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter("option5")}
              onMouseLeave={() => handleMouseLeave("option5")}
            >
              <li>
                <NavLink
                  to="/CrudAppFullTimeInstructor"
                  id="submenu"
                  exact
                  activeclassname ="active"
                >
                  <span style={{ color: "black", fontSize: "17px"}}>Planta</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/CrudApp" exact activeclassname ="active">
                  <span style={{ color: "black", fontSize: "17px" }}>Contrato</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;