import React, { useState } from "react";
import "../../../src/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { helpHttp } from "../../helpers/helpHttp";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CardLogin from "./Card/CardLogin";
import { Helmet } from 'react-helmet';

const baseUrl = "https://www.cupibudget.somee.com/api/Auth/login";
const cookies = new Cookies();

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearAuthentication = () => {
    localStorage.removeItem("jwtToken");
  };

  const iniciarSesion = async () => {
    const { post } = helpHttp();

    try {
      const response = await post(baseUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          username: form.username,
          password: form.password,
        },
      });
      console.log("Encabezados:", response);

      if (response.length > 0) {
        const respuesta = response[0];
        cookies.set("id", respuesta.id, { path: "/" });
        // ... (other cookie settings)

        localStorage.setItem("jwtToken", response);

        Swal.fire({
          icon: "success",
          title: "Autenticación Exitosa",
          showConfirmButton: false,
          timer: 650,
        }).then(() => {
          window.location.href = "/Home";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Usuario Incorrecto",
          text: "Usuario no válido o contraseña incorrecta!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error en la autenticación",
        text: "Ocurrió un error durante la autenticación. Por favor, inténtalo de nuevo.",
      });
    }
  };

  React.useEffect(() => {
    clearAuthentication();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      iniciarSesion();
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div className="maincontainer">
      <Helmet>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <CardLogin>
        <div className="loginElements">
        <div className="image-login-container">
          <img src="/img/Logo-sena.png" alt="Logo" className="logo-login" style={{ width: "140px" }} />
        </div>
        <p className="title">Centro de comercio y servicios</p>
        <div className="underline-container">
          <hr
            style={{ borderColor: "green", borderWidth: "2px", width: "400px" }}
          />
        </div>
        <p className="subtitle">Iniciar Sesión</p>
        </div>
        <form className="form-login">
          <div className="inputs_container">
            <input
              placeholder="Usuario"
              type="username"
              name="username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="inputLogin"
            />
            <input
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="inputLogin"
              style={{ backgroundColor: "#e9e9e9" }}
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon className="eye-button"
                style={{
               
                  userSelect: "none",
                  fontSize:"20px"
                 
                }}
                
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <input
            type="button"
            value="Ingresar"
            className="login_button"
            onClick={() => iniciarSesion()}
          />
        </form>
      </CardLogin>
    </div>
  );
}

export default Login;
