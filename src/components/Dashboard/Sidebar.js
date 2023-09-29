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
      <ul>
        <li style={{ marginTop: "50px" }}>
          {/* Utiliza NavLink para redirigir a "/ruta-de-home" al hacer clic en "Inicio" */}
          <NavLink
              to="./home"
              className={`main-option ${
                isOptionActive("option0") ? "active" : ""
              } nav-link`}
            >
              <FaIcons.FaHome style={{marginLeft:"10px"}} />
              <span style={{ marginLeft: "20px", color: 'black' }}>Inicio</span>{" "}
              <HiIcons.HiChevronRight
                style={{ color: "green", marginLeft: "88px", marginBottom: "0" }}
              />
            </NavLink>
        </li>
        <li style={{ marginTop: "50px" }}>
          <div
            onMouseEnter={() => handleMouseEnter("option2")}
            onMouseLeave={() => handleMouseLeave("option2")}
            className={`main-option ${
              isOptionActive("option2") ? "active" : ""
            }`}
          >
            <FaIcons.FaFileInvoiceDollar style={{marginLeft:"10px"}}  />{" "}
            <span style={{ marginLeft: "25px" }}>Reporte</span>{" "}
            {isOptionActive("option2") ? (
              <HiIcons.HiChevronDown
                style={{ color: "green", marginLeft: "55px" }}
              />
            ) : (
              <HiIcons.HiChevronRight
                style={{ color: "green", marginLeft: "55px" }}
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
                  activeClassName="active"
                >
                 <span style={{ color: "black", marginRight: "16px", fontSize: "17px" }}>Generar reporte</span>

                </NavLink>
              </li>
            
            </ul>
          )}
        </li>
        <li style={{ marginTop: "50px" }}>
          <div
            onMouseEnter={() => handleMouseEnter("option3")}
            onMouseLeave={() => handleMouseLeave("option3")}
            className={`main-option ${
              isOptionActive("option3") ? "active" : ""
            }`}
          >
            <ImIcons.ImTarget style={{marginLeft:"10px"}}/>{" "}
            <span style={{ marginLeft: "25px" }}>Metas</span>{" "}
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
                  to="/option3"
                  id="submenu"
                  exact
                  activeClassName="active"
                >
                  <span style={{ color: "black", fontSize: "17px"}}>Anual</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4 " exact activeClassName="active">
                  <span style={{ color: "black", fontSize: "17px" }}>Mensual</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "50px" }}>
          <div
            onMouseEnter={() => handleMouseEnter("option5")}
            onMouseLeave={() => handleMouseLeave("option5")}
            className={`main-option ${
              isOptionActive("option5") ? "active" : ""
            }`}
          >
            <FaIcons.FaUserTie style={{marginLeft:"10px"}} />{" "}
            <span style={{ marginLeft: "25px" }}>Instructores</span>{" "}
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
                  activeClassName="active"
                >
                  <span style={{ color: "black", fontSize: "17px"}}>Planta</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/CrudApp" exact activeClassName="active">
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
