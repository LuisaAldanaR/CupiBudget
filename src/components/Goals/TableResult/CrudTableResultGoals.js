import React, { useState } from "react";
import "../../../App.scss";

// Define an object with initial values for the form
const initialForm = {
  totales: null,
};

const CrudTableRow = ({ elTotals }) => {
  // Destructure the properties of the 'elTotals' object passed as an argument
  const [form, setForm] = useState(initialForm);

  // Function to handle changes in form fielTotalsds
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
  let valorNivelTotals = elTotals.id <= 2 ? tecnologo : tecnico;
  
  return (
    // Render a table row with the data from the 'elTotals' object
    <tr>
      
      <td className="tdTableRow">
        {elTotals ? (
          elTotals.nombre
        ) : (
          elTotals.loading ? (<span>Cargando...</span>) : null // Check if the 'elTotals' object has a 'loading' property
        )}
      </td>

     
      <td className="tdTableRow">
        <input
          type="number"
          name={`totalGoalTechnological${elTotals.idNetwork}`}
          id={`totalGoalTechnological${elTotals.idNetwork}`}
          placeholder="Meta"
          className="form-control"
          onChange={handleChange}
          value={form[`totalGoalTechnological${elTotals.idNetwork}`]}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${elTotals.idNetwork}`}
          id={`oldStudentsTechnological${elTotals.idNetwork}`}
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${elTotals.idNetwork}`]} // Cambia elTotals valor para la tabla 1
        />
      </td>

      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${elTotals.idNetwork}`}
          id={`oldStudentsTechnological${elTotals.idNetwork}`}
          placeholder="1er trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${elTotals.idNetwork}`]} // Cambia elTotals valor para la tabla 1
        />
      </td>
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${elTotals.idNetwork}`}
          id={`oldStudentsTechnological${elTotals.idNetwork}`}
          placeholder="2do trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${elTotals.idNetwork}`]} // Cambia elTotals valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${elTotals.idNetwork}`}
          id={`oldStudentsTechnological${elTotals.idNetwork}`}
          placeholder="3er trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${elTotals.idNetwork}`]} // Cambia elTotals valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name={`oldStudentsTechnological${elTotals.idNetwork}`}
          id={`oldStudentsTechnological${elTotals.idNetwork}`}
          placeholder="4to trimestre"
          className="form-control"
          onChange={handleChange}
          value={form[`oldStudentsTechnological${elTotals.idNetwork}`]} // Cambia elTotals valor para la tabla 1
        />
      </td>      
      <td className="tdTableRow">{valorNivelTotals}</td>
      <td className="tdTableRow">{valorNivelTotals}</td>
      


    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
