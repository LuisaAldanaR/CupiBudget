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
      <ul>
        <br/>
        <br/>
        <br/>
            <div
              className={`main-option ${isOptionActive('option1') ? 'active' : ''}`}
              id='home'
            >
              <FaIcons.FaHome/> Inicio {isOptionActive('option1')} 
            </div>
        
        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option2')}
            onMouseLeave={() => handleMouseLeave('option2')}
            className={`main-option ${isOptionActive('option2') ? 'active' : ''}`}
          >
            <FaIcons.FaFileInvoiceDollar /> Reporte {isOptionActive('option2') ? <HiIcons.HiChevronDown style={{ color: 'green' }} /> : <HiIcons.HiChevronRight style={{ color: 'green' }} />} 
          </div>
          {isOptionActive('option2') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option2')}
              onMouseLeave={() => handleMouseLeave('option2')}
            >
              <li>
                <NavLink to="/BudgetGenerator" id="submenu" exact activeClassName="active">
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
            className={`main-option ${isOptionActive('option3') ? 'active' : ''}`}
          >
            <ImIcons.ImTarget /> Metas {isOptionActive('option3') ? <HiIcons.HiChevronDown style={{ color: 'green' }} /> : <HiIcons.HiChevronRight style={{ color: 'green' }} />} 
          </div>
          {isOptionActive('option3') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option3')}
              onMouseLeave={() => handleMouseLeave('option3')}
            >
              <li>
                <NavLink to="/option3" id="submenu" exact activeClassName="active">
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
            className={`main-option ${isOptionActive('option5') ? 'active' : ''}`}
          >
            <FaIcons.FaUserTie /> Instructores {isOptionActive('option5') ? <HiIcons.HiChevronDown style={{ color: 'green' }} /> : <HiIcons.HiChevronRight style={{ color: 'green' }}/>} 
          </div>
          {isOptionActive('option5') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option5')}
              onMouseLeave={() => handleMouseLeave('option5')}
            >
              <li>
                <NavLink to="/CrudAppFullTimeInstructor" id="submenu" exact activeClassName="active">
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
