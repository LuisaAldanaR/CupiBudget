import React, { useState } from 'react';
import '../../../src/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const baseUrl = "http://www.mendezmrf10.somee.com/api/Auth/login";
const cookies = new Cookies();

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // Agregamos el estado para mostrar/ocultar contraseña

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const clearAuthentication = () => {
    localStorage.removeItem('jwtToken');
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para mostrar/ocultar la contraseña
  };

  const iniciarSesion = async () => {
    const { post } = helpHttp();

    try {
      const response = await post(baseUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username: form.username,
          password: form.password,
        },
      });
      console.log("Encabezados:", response);

      if (response.length > 0) {
        const respuesta = response[0];
        cookies.set('id', respuesta.id, { path: '/' });
        cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: '/' });
        cookies.set('apellido_materno', respuesta.apellido_materno, { path: '/' });
        cookies.set('nombre', respuesta.nombre, { path: '/' });
        cookies.set('username', respuesta.username, { path: '/' });
        const jwtToken = response;
        localStorage.setItem('jwtToken', response);
        Swal.fire({
          icon: 'success',
          title: 'Autenticación Exitosa',
          showConfirmButton: false,
          timer: 650
        }).then(() => {
          window.location.href = '/Home';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario Incorrecto',
          text: 'Usuario no válido o contraseña incorrecta!',
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    clearAuthentication();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      iniciarSesion();
    }
  };

  return (
    <div className="maincontainer" >
      <div className="welcome-container" >
        <img src="/img/Logo-sena.png" alt="Logo" />
        <p style={{ marginLeft:"-3em",fontWeight:"400", width:"15em", fontSize:"3vh", marginTop:"10px"}}>Centro de comercio y servicios</p>
       
        <hr className='underLine' style={{width:"16em", marginTop:"3em"}}></hr>
        <p className="welcomeText tracking-in-expand-forward-top">Bienvenido</p>
        </div>
        <div id="formContainer">
          <div className="secondContainer" style={{marginTop:"5vh"}} >
            
            <label style={{marginBottom:"5vh", userSelect:"none"}} className='l1'>Iniciar Sesión </label>
            
            <div className="form-group">
              <input
                placeholder="Usuario"
                type="text"
                name="username"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="rounded-input"
                style={{userSelect: "none", }}
                
              />
              <input
                placeholder="Contraseña"
                type={showPassword ? 'text' : 'password'}
                className="rounded-input"
                name="password"
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{userSelect: "none"}}         
              />

              
               
            </div>
            
            <button
                className="login-button"
                style={{marginTop:"10vh", userSelect: "none"}}
                onClick={iniciarSesion}>
                Ingresar
            </button>
            <p style={{marginTop:"4vh", userSelect: "none"}} className='l2'>Cambiar contraseña </p>
          </div>
        
      </div>
    </div>
  );
}

export default Login;
