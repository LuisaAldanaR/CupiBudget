import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { helpHttp } from "../../helpers/helpHttp"; // Import a utility for making HTTP requests
import "./main.css";
import Swal from 'sweetalert2';


// Define an object with initial values for the form
const initialForm = {
  name: "",
  startDate: "",
  endDate: "",
  networkId: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit, showTable }) => {
  // Define states for the form and network options
  const [form, setForm] = useState(initialForm);
  const [networkOptions, setNetworkOptions] = useState([]);
  const api = helpHttp(); // Instance of the HTTP request utility

  // Effect that runs when 'dataToEdit' changes to load edit data
  useEffect(() => {
    if (dataToEdit) {
      // Format dates to ISO 8601 format before setting them to the state
      const formattedStartDate = new Date(dataToEdit.startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(dataToEdit.endDate).toISOString().split('T')[0];

      // Set edit data to the form state
      setForm({
        ...dataToEdit,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      setForm(initialForm); // If there's no edit data, reset the form
    }
  }, [dataToEdit]);

  // Effect that loads network options from an API when the component mounts
  useEffect(() => {
    const urlNetwork = "http://www.mendezmrf10.somee.com/api/Network/List";
    
    api.get(urlNetwork).then((res) => {
      if (!res.err) {
        setNetworkOptions(res.response); // Store network options in the state
      } else {
        console.error("Error fetching network options:", res.err);
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
  
    if (!form.name.trim() || !form.startDate.trim() || !form.endDate.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Datos Incompletos',
        text: '',
      })
      return;
    }
  
    // Call 'createData' or 'updateData' depending on whether it's creating or updating
    if (dataToEdit === null || dataToEdit.idInstructor === undefined) {
      createData(form);
    } else {
      updateData(form);
    }
  
    // Clear the form and reset dataToEdit to null
    handleReset();
  };
  
  

  // Function to clear the form and edit data
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  // Function to cancel and return to the table view
  const handleCancel = () => {
    showTable();
    setForm(initialForm);
    setDataToEdit(null);
  };
  

  return (
  <div className="container">
    <div className="card ">
      <div className="center-table-form">
        <h3 className="h3Table">{dataToEdit ? "Editar" : "Agregar"}</h3>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control inputForm"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="startDate"
              placeholder="Fecha de inicio de contrato"
              className="form-control"
              onChange={handleChange}
              value={form.startDate}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="endDate"
              placeholder="Fecha fin de contrato"
              className="form-control"
              onChange={handleChange}
              value={form.endDate}
            />
          </div>
          <div className="mb-3">
            <select
              name="networkId"
              className="form-select"
              onChange={handleChange}
              value={form.networkId}
            >
              <option value="">Selecciona una red</option>
              {networkOptions && networkOptions.map((option) => (
                <option key={option.idNetwork} value={option.idNetwork}>
                  {option.networkName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            {dataToEdit ? "Editar" : "Agregar"}
          </button>&nbsp;
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
