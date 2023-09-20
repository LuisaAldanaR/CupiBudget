import React, { Component } from 'react';
import '../../../src/App.scss'; // Importa los estilos desde la ruta especificada
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Cookies from 'universal-cookie'; // Importa la biblioteca universal-cookies para gestionar cookies
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';


const baseUrl = "http://www.mendezmrf10.somee.com/api/Auth/login"; // Define la URL base para la API
const cookies = new Cookies(); // Crea una nueva instancia de la clase Cookies

class Login extends Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }

  // Función para manejar cambios en los campos de entrada
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  // Función para iniciar el proceso de inicio de sesión
  iniciarSesion = async () => {
    const { post } = helpHttp(); // Destructura la función 'post' de tu helper
      
    try {
      const response = await post(baseUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: {
          username: this.state.form.username,
          password: this.state.form.password,
        },
      });
      console.log("Encabezados:", response);

            
      if (response.length > 0) {
        const respuesta = response[0];
        // Establecer la información del usuario como cookies
        cookies.set('id', respuesta.id, { path: '/' });
        cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: '/' });
        cookies.set('apellido_materno', respuesta.apellido_materno, { path: '/' });
        cookies.set('nombre', respuesta.nombre, { path: '/' });
        cookies.set('username', respuesta.username, { path: '/' });
        // Después de recibir el token JWT en la respuesta del servidor
        const jwtToken = response; // Obtener el token JWT de la respuesta
        localStorage.setItem('jwtToken', response); // Guarda el token JWT en el almacenamiento local    
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.href = './CrudApp'; // Redirigir a la página de menú tras iniciar sesión con éxito
        console.log("token:" + jwtToken);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario Incorrecto',
          text: 'Usuario no valido o contraseña incorrecta!',
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para comprobar si un usuario ya ha iniciado sesión
  componentDidMount() {
    if (cookies.get('username')) {
      
    }
  }

  render() {
    
    return (
      <div className="logo-login" >
          <img src="/img/Logo-sena.png" alt="Logo"  />
          <br/>
          <br/>
          <br/>
          <hr className='underLine'></hr>
          <p class="welcomeText">Bienvenido</p>
      <div className="mainContainer">
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
              onChange={this.handleChange}
              className="rounded-input" // Aplica la clase CSS aquí
            />
            <input
              placeholder="Contraseña"
              type="password"
              className="form-control rounded-input" // Aplica la clase CSS aquí
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button
              className="login-button"
              onClick={() => this.iniciarSesion()}>
              Siguiente
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
}

export default Login;

