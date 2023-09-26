import React, { useState } from "react";
import "../../App.scss";

// Define an object with initial values for the form
const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const CrudTableRow = ({ el }) => {
  // Destructure the properties of the 'el' object passed as an argument
  let { networkName } = el;
  const [form, setForm] = useState(initialForm);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  
  
  return (
    // Render a table row with the data from the 'el' object
    <tr>
      {/* Render the network name ('oNetwork.networkName') or a loading message if it's not defined */}
      <td className="tdTableRow">
        {networkName ? (
          networkName
        ) : (
          el.loading ? (<span>Cargando...</span>) : null // Check if the 'el' object has a 'loading' property
        )}
      </td>
      <td className="tdTableRow">
  <input
    type="number"
    name={`totalGoalTechnological${el.idNetwork}`} 
    id={`totalGoalTechnological${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnological${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnological${el.idNetwork}`} 
    id={`oldStudentsTechnological${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnological${el.idNetwork}`]} // Cambia el valor para la tabla 1
  />
</td>

    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
