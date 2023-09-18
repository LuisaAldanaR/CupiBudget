import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as HiIcons from 'react-icons/hi';
import '../../App.scss';

/**
 * The Sidebar component for navigation.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
  // State variables to control the visibility of sub-options
  const [showOptions1, setShowOptions1] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [showOptions3, setShowOptions3] = useState(false);
  const [showOptions4, setShowOptions4] = useState(false);
  const [showOptions5, setShowOptions5] = useState(false);

  /**
   * Toggles the visibility of sub-options based on the selected option.
   * @param {string} option - The selected option.
   */
  const toggleOptions = (option) => {
    if (option === 'option1') {
      setShowOptions1(!showOptions1);
      setShowOptions2(false);
      setShowOptions3(false);
      setShowOptions4(false);
      setShowOptions5(false);
    } else if (option === 'option2') {
      setShowOptions1(false);
      setShowOptions2(!showOptions2);
      setShowOptions3(false);
      setShowOptions4(false);
      setShowOptions5(false);
    } else if (option === 'option3') {
      setShowOptions1(false);
      setShowOptions2(false);
      setShowOptions3(!showOptions3);
      setShowOptions4(false);
      setShowOptions5(false);
    } else if (option === 'option4') {
      setShowOptions1(false);
      setShowOptions2(false);
      setShowOptions3(false);
      setShowOptions4(!showOptions4);
      setShowOptions5(false);
    } else if (option === 'option5') {
      setShowOptions1(false);
      setShowOptions2(false);
      setShowOptions3(false);
      setShowOptions4(false);
      setShowOptions5(!showOptions5);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {/* Sidebar items */}
        <li style={{ marginTop: "70px" }}>
          <div
            onClick={() => toggleOptions('option1')} 
            navlink to="/" exact className="text-dark rounded py-3 w-100 d-inline-block px-3" activeclassname="active"
          >
            <FaIcons.FaHome /> Home <HiIcons.HiChevronRight id="chevronRight" />
          </div>
          {showOptions1 && (
            <ul className="submenu">
              <li>
                <NavLink to="/" exact activeclassname="active">
                  Suboption 1
                </NavLink>
              </li>
              <li>
                <NavLink to="/option2" exact activeclassname="active">
                  Suboption 2
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            NavLink to="/budget"
            onClick={() => toggleOptions('option2')}
            className="text-dark rounded py-3 w-100 d-inline-block px-3"
          >
            <FaIcons.FaFileInvoiceDollar /> Budget <HiIcons.HiChevronRight id="chevronRight" />
          </div>
          {showOptions2 && (
            <ul className="submenu">
              <li>
                <NavLink to="/option3" id="facto" exact activeclassname="active">
                  Suboption 3
                </NavLink>
              </li>
              <li>
                <NavLink to="/option4" exact activeclassname="active">
                  Suboption 4
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onClick={() => toggleOptions('option3')}
            className="text-dark rounded py-3 w-100 d-inline-block px-3"
          >
            <ImIcons.ImTarget /> Goals <HiIcons.HiChevronRight id="chevronRight" />
          </div>
          {showOptions3 && (
            <ul className="submenu">
              <li>
                <NavLink to="/option5" exact activeclassname="active">
                  Suboption 5
                </NavLink>
              </li>
              <li>
                <NavLink to="/option6" exact activeclassname="active">
                  Suboption 6
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onClick={() => toggleOptions('option4')}
            className="text-dark rounded py-3 w-100 d-inline-block px-3"
          >
            <FaIcons.FaProjectDiagram /> Programs <HiIcons.HiChevronRight id="chevronRight" />
          </div>
          {showOptions4 && (
            <ul className="submenu">
              <li>
                <NavLink to="/option7" exact activeclassname="active">
                  Suboption 7
                </NavLink>
              </li>
              <li>
                <NavLink to="/option8" exact activeclassname="active">
                  Suboption 8
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginTop: "70px" }}>
          <div
            onClick={() => toggleOptions('option5')}
            className="text-dark rounded py-3 w-100 d-inline-block px-3"
          >
            <FaIcons.FaUserTie /> Instructors <HiIcons.HiChevronRight id="chevronRight" />
          </div>
          {showOptions5 && (
            <ul className="submenu" id="submenu">
              <li>
                <NavLink to="/CrudAppFullTimeInstructor" exact activeclassname="active" style={{ color: 'black' }}>
                  Full-Time
                </NavLink>
              </li>
              <li>
                <NavLink to="/CrudApp" exact activeclassname="active" style={{ color: 'black' }}>
                  Contract
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
