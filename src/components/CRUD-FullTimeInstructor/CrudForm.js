import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { helpHttp } from "../../helpers/helpHttp"; // Import a utility for making HTTP requests
import Swal from 'sweetalert2';


// Define an object with initial values for the form
const initialForm = {
  name: "",
  position: "",
  networkId: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit, showTable }) => {
  // Define states for the form and network options
  const [form, setForm] = useState(initialForm);
  const [networkOptions, setNetworkOptions] = useState([]);
  const api = helpHttp(); // Instance of the HTTP request utility
  const token = localStorage.getItem('jwtToken'); // Recupera el token JWT del almacenamiento local

  // Effect to update the 'form' state when 'dataToEdit' changes
  useEffect(() => {
    if (dataToEdit && dataToEdit.idInstructor !== undefined && dataToEdit.idInstructor !== "") {
      // If dataToEdit exists and has a defined idInstructor, set the 'form' state to dataToEdit
      setForm(dataToEdit);
    } else {
      // If not editing, set the 'form' state to the initial empty form
      setForm(initialForm);
    }
  }, [dataToEdit]);

  // Effect to load network options from an API when the component mounts
  useEffect(() => {
    const urlNetwork = "http://www.mendezmrf10.somee.com/api/Network/List";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
    };

    api.get(urlNetwork, options).then((res) => {
      if (!res.err) {
        setNetworkOptions(res.response); // Store network options in the state
      } else {
        console.error("Error al obtener las opciones de red:", res.err);
      }
    });
  }, [api]);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.position.trim() || !form.networkId) {
      Swal.fire({
        icon: 'error',
        title: 'Datos Incompletos',
        text: '',
      })
      return;
    }

    // Call 'createData' or 'updateData' based on whether creating or updating
    if (dataToEdit === null || form.idInstructor === undefined || form.idInstructor === "") {
      createData(form);
    } else {
      updateData(form);
      console.log(dataToEdit);
    }

    handleReset(); // Clear the form
  };

  // Function to clear the form and data being edited
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleCancel = () => {
    // Reset the form by calling the 'handleReset' function
    showTable();
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="center-table-form">
          <h3 className="h3Table">{dataToEdit ? "Editar" : "Agregar"}</h3>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="form-control"
                onChange={handleChange}
                value={form.name}
              />
            </div>
            <div className="mb-3">
              <select
                name="position"
                className="form-select"
                onChange={handleChange}
                value={form.position}
              >
                <option value="">Selecciona una posición</option> 
                <option>Instructor</option>
                <option>Instructor Senova</option>
                <option>Coordinador Academico</option> 
                <option>Otros</option> 
              </select>
            </div>

            <div className="mb-3">
              <select
                name="networkId"
                className="form-select"
                onChange={handleChange}
                value={form.networkId}
              >
                <option value="">Selecciona una red</option> 
                {networkOptions &&
                  networkOptions.map((option) => (
                    <option key={option.idNetwork} value={option.idNetwork}>
                      {option.networkName}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              {dataToEdit ? "Editar" : "Agregar"} 
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              Regresar 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrudForm;
