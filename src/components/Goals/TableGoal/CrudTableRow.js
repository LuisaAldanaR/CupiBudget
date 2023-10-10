import React, { useState } from "react";
import "../../../App.scss";

// Define an object with initial values for the form
const initialForm = {
  nivelFormacion: null,
};

const CrudTableRow = ({ el }) => {
  // Destructure the properties of the 'el' object passed as an argument
  const [form, setForm] = useState(initialForm);

  console.log(el);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  let tecnologo = "Tecnologo";
  let tecnico = "Tecnicos Laborales y otros";

  // Variable para determinar cuál valor se debe usar en cad
  let valorNivel = el.id <= 2 ? tecnologo : tecnico;
  
  return (
    // Render a table row with the data from the 'el' object
    <tr>
      {/* Render the network name ('oNetwork.networkName') or a loading message if it's not defined */}
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">
        {el ? (
          el.name
        ) : (
          el.loading ? (<span>Cargando...</span>) : null // Check if the 'el' object has a 'loading' property
        )}
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name={`totalGoalTechnological${el.target}`}
          id={`totalGoalTechnological${el.target}`}
          placeholder="Meta"
          className="form-control"
          onChange={handleChange}
          value={form[`totalGoalTechnological${el.target}`]}
        /> 
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${el.passes2021To2022}`}
          id={`oldStudentsTechnological${el.passes2021To2022}`}
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${el.passes2021To2022}`]} // Cambia el valor para la tabla 1
        />
      </td>

      <td className="tdTableRow">{el.percentage}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${el.firstQuarterEnrollment}`}
          id={`oldStudentsTechnological${el.firstQuarterEnrollment}`}
          placeholder="1er trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${el.firstQuarterEnrollment}`]} // Cambia el valor para la tabla 1
        />
      </td>
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${el.secondQuarterEnrollment}`}
          id={`oldStudentsTechnological${el.secondQuarterEnrollment}`}
          placeholder="2do trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${el.secondQuarterEnrollment}`]} // Cambia el valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${el.thirdQuarterEnrollment}`}
          id={`oldStudentsTechnological${el.thirdQuarterEnrollment}`}
          placeholder="3er trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${el.thirdQuarterEnrollment}`]} // Cambia el valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${el.fourthQuarterEnrollment}`}
          id={`oldStudentsTechnological${el.fourthQuarterEnrollment}`}
          placeholder="4to trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${el.fourthQuarterEnrollment}`]} // Cambia el valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">{valorNivel}</td>
      


    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
