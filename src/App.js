import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import CrudForm from "./components/CRUD-FullTimeInstructor/CrudForm";
import CrudAppFullTimeInstructor from "./components/CRUD-FullTimeInstructor/CrudAppFullTimeInstructor";


/**
 * The main application component.
 * @returns {JSX.Element} The rendered application.
 */
function App() {

  // Función para verificar si el usuario ha iniciado sesión
  const isAuthenticated = () => {
    // Obtiene el token JWT del almacenamiento local
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (jwtToken) {
      try {
        // Decodifica el token JWT para verificar su validez
        const tokenData = JSON.parse(atob(jwtToken.split('.')[1]));
  
        // Verifica si el token ha expirado (comparando la fecha de expiración con la fecha actual)
        const tokenExpiration = new Date(tokenData.exp * 1000); // Multiplica por 1000 para convertir a milisegundos
        const currentDate = new Date();
  
        if (currentDate < tokenExpiration) {
          // El token es válido y no ha expirado
          return true;
        }
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
      }
    }
  
    // Si no hay token o ha expirado, el usuario no está autenticado
    return false;
  };
  

  // Componente de ruta protegida que verifica si el usuario ha iniciado sesión
  const ProtectedRoute = ({ element, ...props }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/" /> // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
    );
  };

  return (
    <Router>
    <div className="">
      <Routes>
        {/* Route for the login page */}
        <Route path='/' element={<Login />} />
        {/* Default route with the sidebar and navbar */}
        <Route
          path='/*'
          element={
            isAuthenticated() ? (
              <div className="">
                <Sidebar />
                <div className="container min-vw-100">
                  <CustomNavbar />
                  <Routes>
                    {/* Ruta para la página Home */}
                    <Route
                      path='/home'
                      element={<Home />} // Renderizar la página Home directamente aquí
                    />
                    <Route path="/BudgetGenerator" element={<ProtectedRoute element={<BudgetGenerator />} />} />
                    {/* Otras rutas protegidas */}
                    <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
                    <Route path="/programs" element={<ProtectedRoute element={<Programs />} />} />
                    <Route path="/instructors" element={<ProtectedRoute element={<Instructors />} />} />
                    <Route path="/CrudAppFullTimeInstructor" element={<ProtectedRoute element={<CrudAppFullTimeInstructor />} />} />
                    <Route path="/CrudApp" element={<ProtectedRoute element={<CrudApp />} />} />
                    <Route path="/CrudForm" element={<ProtectedRoute element={<CrudForm />} />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" /> // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
            )
          }
        />
      </Routes>
    </div>
  </Router>
  
);

}

export default App;