import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as HiIcons from 'react-icons/hi';
import '../../App.scss';

const Sidebar = () => {
  // Crear un estado para controlar la visibilidad de cada opción
  const [optionVisibility, setOptionVisibility] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });

  // Manejar el evento onMouseEnter para cada opción
  const handleMouseEnter = (option) => {
    setOptionVisibility((prevState) => ({
      ...prevState,
      [option]: true,
    }));
  };

  // Manejar el evento onMouseLeave para cada opción
  const handleMouseLeave = (option) => {
    setOptionVisibility((prevState) => ({
      ...prevState,
      [option]: false,
    }));
  };

  // Función para determinar si una opción está activa
  const isOptionActive = (option) => {
    return optionVisibility[option];
  };

  return (
    <div className="sidebar">
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
                <NavLink to="/" exact activeClassName="active">
                  Suboption 1
                </NavLink>
              </li>
              <li>
                <NavLink to="/option2" exact activeClassName="active">
                  Suboption 2
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
            <FaIcons.FaFileInvoiceDollar /> Presupuesto {isOptionActive('option2') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option2') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option2')}
              onMouseLeave={() => handleMouseLeave('option2')}
            >
              <li>
                <NavLink to="/option3" id="facto" exact activeClassName="active">
                  Suboption 3
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4" exact activeClassName="active">
                  Suboption 4
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
                  Suboption 3
                </NavLink>
              </li>
              <li>
                <NavLink to="/option3" exact activeClassName="active">
                  Suboption 4
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onMouseEnter={() => handleMouseEnter('option4')}
            onMouseLeave={() => handleMouseLeave('option4')}
            className={`text-dark rounded py-3 w-100 d-inline-block px-3 ${isOptionActive('option4') ? 'active' : ''}`}
          >
            <FaIcons.FaProjectDiagram /> Programas {isOptionActive('option4') ? <HiIcons.HiChevronDown /> : <HiIcons.HiChevronRight />} 
          </div>
          {isOptionActive('option4') && (
            <ul
              className="submenu"
              onMouseEnter={() => handleMouseEnter('option4')}
              onMouseLeave={() => handleMouseLeave('option4')}
            >
              <li>
                <NavLink to="/option4" id="facto" exact activeClassName="active">
                  Suboption 3
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4" exact activeClassName="active">
                  Suboption 4
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
                  Planta
                </NavLink>
              </li>
              <li>
                <NavLink to="/CrudApp" exact activeClassName="active">
                  Contrato
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
