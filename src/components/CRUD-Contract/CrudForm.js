import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { helpHttp } from "../../helpers/helpHttp"; // Import a utility for making HTTP requests
import "../../App.scss";
import Swal from 'sweetalert2';


// Define an object with initial values for the form
const initialForm = {
  name: "",
  startDate: "",
  endDate: "",
  endDateCourse: "",
  networkId: null,
  networkName:null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit, showTable, networkOptions }) => {
  // Define states for the form and network options
  const [form, setForm] = useState(initialForm);
  const api = helpHttp(); // Instance of the HTTP request utility

  console.log(dataToEdit);

  const token = localStorage.getItem('jwtToken'); // Recupera el token JWT del almacenamiento local

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
    
    const token = localStorage.getItem('jwtToken'); // Recupera el token JWT del almacenamiento local

    const inputEndDateCourse= form.endDateCourse.toString();
    const inputEndDate= form.endDate.toString();
    const inputStartDate= form.startDate.toString();

    const currentDate = new Date().toISOString();

    const isEndDateCourseAvaliable = inputEndDateCourse > currentDate;
    const isEndDateAvaliable = inputEndDate > currentDate;
    const isStartDateValid = inputStartDate < inputEndDate;

    if (token){
      if (!form.name.trim() || !form.startDate.trim() || !form.endDate.trim()) {
      
        Swal.fire({
          icon: 'error',
          title: 'Datos Incompletos',
          text: '',
        })
        return;
      }
      
      if (dataToEdit === null || dataToEdit.idInstructor === undefined && dataToEdit.endDateCourse) {
        if (!isEndDateCourseAvaliable || !isEndDateAvaliable || !isStartDateValid) {
          Swal.fire({
            icon: 'error',
            title: 'La fecha digitada no puede ser anterior a la fecha actual',
            text: '',
          })
          return;
        }
      }

      else if (dataToEdit || dataToEdit.idInstructor && dataToEdit.endDateCourse) {
        if (!isEndDateCourseAvaliable || !isEndDateAvaliable || !isStartDateValid) {
          Swal.fire({
            icon: 'error',
            title: 'La fecha digitada no puede ser anterior a la fecha actual',
            text: '',
          })
          return;
        }
      }
  
      // Call 'createData' or 'updateData' depending on whether it's creating or updating
      if (dataToEdit === null || dataToEdit.idInstructor === undefined) {
        createData(form);
        console.log(dataToEdit);
      } else {
        updateData(form);
        console.log(dataToEdit);
      }
    
      // Clear the form and reset dataToEdit to null
      handleReset();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Actualmente no tienes permisos para esta acción',
        text: '',
      })
    }    
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
  <div className="center-table-form">
    <div className="card" style={{padding:"1rem"}}>
      <div className="">
        <h3 className="h3Table">{dataToEdit ? "Editar instructor de contrato" : "Agregar instructor de contrato"}</h3>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label className="label">
                Nombre
              </label>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="form-control inputForm"
              onChange={handleChange}
              value={form.name}
              style={{paddingRight:"20px", paddingLeft:"20px"}}
            />
          </div>
          <div className="mb-3">
          <label className="label">
          Fecha de inicio de contrato
              </label>
            <input
              type="date"
              name="startDate"
              placeholder="Fecha de inicio de contrato"
              className="form-control"
              onChange={handleChange}
              value={form.startDate}
              style={{paddingRight:"20px", paddingLeft:"20px"}}
            />
          </div>
          <div className="mb-3">
          <label className="label">
          Fecha de fin de contrato
              </label>
            <input
              type="date"
              name="endDate"
              placeholder="Fecha fin de contrato"
              className="form-control"
              onChange={handleChange}
              value={form.endDate}
              style={{paddingRight:"20px", paddingLeft:"20px"}}
            />
          </div>
          <div className="mb-3">
          <label className="label">
          Fecha fin de ficha
              </label>
            <input
              type="date"
              name="endDateCourse"
              placeholder="Fecha fin de Ficha"
              className="form-control"
              onChange={handleChange}
              value={form.endDateCourse}
              style={{paddingRight:"20px", paddingLeft:"20px"}}
            />
          </div>
          <div className="mb-3">
          <label className="label">
            Red
              </label>
            <select 
              name="networkId"
              className="select-net"
              onChange={handleChange}
              value={form.networkId}
              style={{paddingRight:"20px", paddingLeft:"20px"}}
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
