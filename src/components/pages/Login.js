import React, { Component } from 'react';
import '../../../src/App.scss'; // Import styles from the specified path
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios'; // Import the axios library for making HTTP requests
import md5 from 'md5'; // Import the md5 library for hashing passwords
import Cookies from 'universal-cookie'; // Import the universal-cookies library for managing cookies

const baseUrl = "http://www.mendezmrf10.somee.com/api/Auth/login"; // Define the base URL for the API
const cookies = new Cookies(); // Create a new instance of the Cookies class

class Login extends Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }

  // Function to handle input field changes
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  // Function to initiate the login process
  iniciarSesion = async () => {
    await axios
      .get(baseUrl, { params: { username: this.state.form.username, password: md5(this.state.form.password) } })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          // Set user information as cookies
          cookies.set('id', respuesta.id, { path: '/' });
          cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: '/' });
          cookies.set('apellido_materno', respuesta.apellido_materno, { path: '/' });
          cookies.set('nombre', respuesta.nombre, { path: '/' });
          cookies.set('username', respuesta.username, { path: '/' });
          alert(`Welcome ${respuesta.nombre} ${respuesta.apellido_paterno}`);
          window.location.href = './menu'; // Redirect to the menu page on successful login
        } else {
          alert('The username or password is incorrect'); // Show an error message if login fails
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Function to check if a user is already logged in
  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = './menu'; // Redirect to the menu page if the user is already logged in
    }
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="welcomeContainer"> {/* New container for the logo and welcome message */}
          <img src="path_to_logo.png" alt="Logo" className="logo" /> {/* Replace "path_to_logo.png" with the path to your logo */}
          <p className="welcomeText">Bienvenido</p>
        </div>
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
              className="rounded-input" // Apply the CSS class here
            />
            <input
              placeholder="Contraseña"
              type="password"
              className="form-control rounded-input" // Apply the CSS class here
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
    );
  }
}

export default Login;
