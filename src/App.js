import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from '../src/components/Dashboard/CustomNavbar';
import Sidebar from '../src/components/Dashboard/Sidebar';
import Home from '../src/components/Dashboard/pages/Home';
import Budget from '../src/components/Dashboard/pages/Budget';
import Goals from '../src/components/Dashboard/pages/Goals';
import Instructors from '../src/components/Dashboard/pages/Instructors';
import Programs from '../src/components/Dashboard/pages/Programs';
import BudgetGenerator from "./components/Budget/BudgetGenerator";
import Login from "./components/pages/Login";
import CrudApp from "./components/CRUD-Contract/CrudApp";
import CrudAppFullTimeInstructor from "./components/CRUD-FullTimeInstructor/CrudAppFullTimeInstructor";

/**
 * The main application component.
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  return (
    <Router>
      <div className="html">
        <Routes>
          {/* Route for the login page */}
          <Route path='/login' element={<Login />} />
          {/* Default route with the sidebar and navbar */}
          <Route path='/*' element={
            <div className="flex">
              <Sidebar />
              <div className="content w-100">
                <CustomNavbar />
                <Routes>
                  {/* Nested route for the Home page */}
                  <Route path='/' element={
                    <>
                      {/* Add the Login component within the Home component */}
                      <Home />
                      <Login /> {/* This will render the Login component within the Home component */}
                    </>
                  } />
                  <Route path='/BudgetGenerator' element={<BudgetGenerator />} />
                  <Route path='/goals' element={<Goals />} />
                  <Route path='/programs' element={<Programs />} />
                  <Route path='/instructors' element={<Instructors />} />
                  <Route path='/CrudAppFullTimeInstructor' element={<CrudAppFullTimeInstructor />} />
                  <Route path='/CrudApp' element={<CrudApp />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
