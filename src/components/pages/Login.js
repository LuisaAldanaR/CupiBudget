import React, { Component } from 'react';
import '../../../src/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://www.mendezmrf10.somee.com/api/Auth/login";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  iniciarSesion = async () => {
    await axios
      .get(baseUrl, { params: { username: this.state.form.username, password: md5(this.state.form.password) } })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('id', respuesta.id, { path: '/' });
          cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: '/' });
          cookies.set('apellido_materno', respuesta.apellido_materno, { path: '/' });
          cookies.set('nombre', respuesta.nombre, { path: '/' });
          cookies.set('username', respuesta.username, { path: '/' });
          alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
          window.location.href = './menu';
        } else {
          alert('El usuario o la contraseña no son correctos');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = './menu';
    }
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="welcomeContainer"> {/* Nuevo contenedor para el logo y el mensaje de bienvenida */}
          <img src="ruta_al_logo.png" alt="Logo" className="logo" /> {/* Reemplaza "ruta_al_logo.png" por la ruta de tu logo */}
          <p className="welcomeText">Bienvenido</p>
        </div>
        <div className="secondContainer">
          <br />
          <br />
          <label className='l1'>Iniciar sesión: </label>
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
    );
  }
}

export default Login;
