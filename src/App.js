import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomNavbar from '../src/components/Dashboard/CustomNavbar';
import Sidebar from '../src/components/Dashboard/Sidebar';
import Home from '../src/components/Dashboard/pages/Home';
import BudgetGenerator from "./components/Budget/BudgetGenerator";
import Login from "./components/Login/Login";
import CrudApp from "./components/CRUD-Contract/CrudApp";
import CrudForm from "./components/CRUD-FullTimeInstructor/CrudForm";
import CrudAppFullTimeInstructor from "./components/CRUD-FullTimeInstructor/CrudAppFullTimeInstructor";
import Goals from "./components/Goals/Goals";
import SchedulingTechnological from "./components/Scheduling/SchedulingTechnological/SchedulingTechnological";
import SchedulingTechnical from "./components/Scheduling/SchedulingTechnical/SchedulingTechnical";
import SchedulingAssistant from "./components/Scheduling/SchedulingAssistant/SchedulingAssistant";

/**
 * The main application component.
 * @returns {JSX.Element} The rendered application.
 */
function App() {

  const jwtToken = localStorage.getItem('jwtToken');
  let role = "";

function isTokenExpired(jwtToken) {
    if (!jwtToken) {
      return false;
    }
  
    const arrayToken = jwtToken.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role =
      tokenPayload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    return Math.floor(new Date().getTime / 1000) >= tokenPayload?.sub;
  }
  
  isTokenExpired(jwtToken);

  // Function to verify if the user already login
  const isAuthenticated = () => {
  
    if (jwtToken) {
      try {
        const tokenData = JSON.parse(atob(jwtToken.split('.')[1]));
  
        const tokenExpiration = new Date(tokenData.exp * 1000); 
        const currentDate = new Date();
  
        if (currentDate < tokenExpiration) {
          return true;
        }
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
      }
    }
    return false;

  };

const ProtectedRoute = ({ element, path, ...props }) => {
  return isAuthenticated() ? (
    (role === 'Admin' || path !== '/BudgetGenerator') ? element : <Navigate to="/home" /> 
  ) : (
    <Navigate to="/" /> 
  );
};

return (
  <Router>
    <div>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/*'
          element={
            isAuthenticated() ? (
              <div>
                <CustomNavbar />
                <Sidebar />
                <div className="container min-vw-100" id="container-dad" style={{ padding: "0", margin: "0" }}>
                  <Routes>
                    <Route
                      path='/home'
                      element={<Home />}
                    />

                    <Route
                      path="/BudgetGenerator"
                      element={<ProtectedRoute element={<BudgetGenerator />} path="/BudgetGenerator" />}
                    />

                    <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
                    <Route path="/CrudAppFullTimeInstructor" element={<ProtectedRoute element={<CrudAppFullTimeInstructor />} />} />
                    <Route path="/CrudApp" element={<ProtectedRoute element={<CrudApp />} />} />
                    <Route path="/CrudForm" element={<ProtectedRoute element={<CrudForm />} />} />
                    <Route path="/SchedulingTechnological" element={<ProtectedRoute element={<SchedulingTechnological />} />} />
                    <Route path="/SchedulingTechnical" element={<ProtectedRoute element={<SchedulingTechnical />} />} />
                    <Route path="/SchedulingAssistant" element={<ProtectedRoute element={<SchedulingAssistant />} />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" /> 
            )
          }
        />
      </Routes>
    </div>
  </Router>
);

}

export default App;