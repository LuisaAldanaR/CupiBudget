import React from "react";
import CrudApp from "./components/CRUD-Contract/CrudApp";
import CrudFormFullTimeInstructor from "./components/CRUD-FullTimeInstructor/CrudForm";
import CrudForm from "./components/CRUD-Contract/CrudForm";
import CrudAppFullTimeInstructor from "./components/CRUD-FullTimeInstructor/CrudAppFullTimeInstructor";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from '../src/components/Dashboard/CustomNavbar'
import Sidebar from '../src/components/Dashboard/Sidebar'
import Home from '../src/components/Dashboard/pages/Home';
import Budget from '../src/components/Dashboard/pages/Budget';
import Goals from '../src/components/Dashboard/pages/Goals';
import Instructors from '../src/components/Dashboard/pages/Instructors';
import Programs from '../src/components/Dashboard/pages/Programs';

/**
 * The main application component.
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  return (
    <Router>
      <div className="html">
        <div className="flex">
          <Sidebar />
          <div className="content w-100">
            <CustomNavbar />
            <>
            </>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/budget' element={<Budget />} />
              <Route exact path='/goals' element={<Goals />} />
              <Route exact path='/programs' element={<Programs />} />
              <Route exact path='/instructors' element={<Instructors />} />
              <Route exact path='/CrudAppFullTimeInstructor' element={<CrudAppFullTimeInstructor />} />
              <Route exact path='/CrudApp' element={<CrudApp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
