import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as HiIcons from 'react-icons/hi';
import '../../App.scss';

const Sidebar = () => {
  // Create state to control the visibility of each option
  const [optionVisibility, setOptionVisibility] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
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
          <img
            src="/img/Logo-sena.png"
            className="custom-logo" // Custom class for the logo
            alt="SENA Logo"
          />
      <ul>
        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option1')}
            onMouseLeave={() => handleMouseLeave('option1')}
            className={`text-dark rounded py-3 w-100 d-inline-block px-3 ${isOptionActive('option1') ? 'active' : ''}`}
          >
            <FaIcons.FaHome /> Inicio {isOptionActive('option1') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option1') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option1')}
              onMouseLeave={() => handleMouseLeave('option1')}
            >
              <li>
                <NavLink to="/option1" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Suboption 1</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/option2" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Suboption 2</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option2')}
            onMouseLeave={() => handleMouseLeave('option2')}
            className={`text-dark rounded py-3 w-100 d-inline-block px-3 ${isOptionActive('option2') ? 'active' : ''}`}
          >
            <FaIcons.FaFileInvoiceDollar /> Reporte {isOptionActive('option2') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option2') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option2')}
              onMouseLeave={() => handleMouseLeave('option2')}
            >
              <li>
                <NavLink to="/BudgetGenerator" id="facto" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Ver reporte</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Suboption 4</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option3')}
            onMouseLeave={() => handleMouseLeave('option3')}
            className={`text-dark rounded py-3 w-100 d-inline-block px-3 ${isOptionActive('option3') ? 'active' : ''}`}
          >
            <ImIcons.ImTarget /> Metas {isOptionActive('option3') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option3') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option3')}
              onMouseLeave={() => handleMouseLeave('option3')}
            >
              <li>
                <NavLink to="/option3" id="facto" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Suboption 3</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4 " exact activeClassName="active">
                  <span style={{ color: 'black' }}>Suboption 4</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option5')}
            onMouseLeave={() => handleMouseLeave('option5')}
            className={`text-dark rounded py-3 w-100 d-inline-block px-3 ${isOptionActive('option5') ? 'active' : ''}`}
          >
            <FaIcons.FaUserTie /> Instructores {isOptionActive('option5') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option5') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option5')}
              onMouseLeave={() => handleMouseLeave('option5')}
            >
              <li>
                <NavLink to="/CrudAppFullTimeInstructor" id="facto" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Planta</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/CrudApp" exact activeClassName="active">
                  <span style={{ color: 'black' }}>Contrato</span>
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
