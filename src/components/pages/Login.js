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
          timer: 950
        }).then(() => {
          window.location.href = '/CrudApp';
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

  return (
    <div className="login-container">
      <div className="logo-login">
        <img src="/img/Logo-sena.png" alt="Logo" />
        <br />
        <br />
        <br />
        <hr className='underLine'></hr>
        <p className="welcomeText">Bienvenido</p>
        <div id="mainContainer" className='filter'>
          <div className="secondContainer">
            <br />
            <br />
            <label className='l1'>Iniciar Sesión </label>
            <br />
            <br />
            <br />
            <div className="form-group">
              <input
                placeholder="Usuario"
                type="text"
                name="username"
                onChange={handleChange}
                className="rounded-input"
              />
              <input
                placeholder="Contraseña"
                type={showPassword ? 'text' : 'password'}
                className="form-control rounded-input"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span className={`password-toggle ${showPassword ? 'active' : ''}`} onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>  
            </div>
            <br />
            <button
              className="login-button"
              onClick={iniciarSesion}>
              Ingresar
            </button>
            <br />
            <br />
            <br />
            <br />
            <label className='l2'>Cambiar contraseña </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
