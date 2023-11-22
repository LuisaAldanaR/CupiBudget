import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import Swal from 'sweetalert2';

const initialForm = {
  name: "",
  position: "",
  endDateCourse: "",
  networkId: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit, showTable, networkOptions  }) => {
  const [form, setForm] = useState(initialForm);
  const token = localStorage.getItem('jwtToken');

  console.log(dataToEdit);

  useEffect(() => {
    // Si hay datos para editar, establece el formulario con esos datos
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputDate = form.endDateCourse.toString();
    const currentDate = new Date().toISOString();
    const isEndDateCourseAvailable = inputDate > currentDate;

    if (!token) {
      return; // Manejo adicional si no hay un token válido
    }

    if (!form.name.trim() || !form.position.trim() || !form.networkId) {
      Swal.fire({
        icon: 'error',
        title: 'Datos Incompletos',
        text: '',
      });
      return;
    }

    if (!isEndDateCourseAvailable && !dataToEdit) {
      Swal.fire({
        icon: 'error',
        title: 'La fecha digitada no puede ser anterior a la fecha actual',
        text: '',
      });
      console.log(currentDate);
      console.log(inputDate);
      return;
    }

    if (dataToEdit === null || form.idInstructor === undefined || form.idInstructor === "") {
      createData(form);
      console.log(dataToEdit);
    } else {
      updateData(form);
      console.log(dataToEdit);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleCancel = () => {
    showTable();
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="center-table-form">
      <div className="card" style={{padding:"1rem"}}>
        <div className="">
          <h3 className="h3Table">{dataToEdit ? "Editar instructor de planta" : "Agregar instructor de planta"}</h3>
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
                className="select-net"
                onChange={handleChange}
                value={form.name}
                style={{paddingRight:"20px", paddingLeft:"20px"}}
              />
            </div>
            <div className="mb-3">
              <label className="label">
                Fecha fin de Ficha
              </label>
              <input
                type="date"
                name="endDateCourse"
                placeholder="Fecha fin de Ficha"
                className="select-net"
                onChange={handleChange}
                value={form.endDateCourse}
                style={{paddingRight:"20px", paddingLeft:"20px"}}
              />
            </div>
            <div className="mb-3">
              <label className="label">
                Posición
              </label>
              <select
                name="position"
                className="select-net"
                onChange={handleChange}
                value={form.position}
                style={{paddingRight:"20px", paddingLeft:"20px"}}
              >
                <option value="">Selecciona una posición</option>
                <option>Instructor</option>
                <option>Instructor Senova</option>
                <option>Coordinador Académico</option>
                <option>Otros</option>
              </select>
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
                {networkOptions.map((option) => (
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
