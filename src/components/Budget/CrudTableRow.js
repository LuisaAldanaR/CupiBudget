import React, { useState } from "react";
import "../../App.scss";
import Swal from "sweetalert2";

// Define an object with initial values for the form
const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const CrudTableRow = ({ el, setDataToEdit, updateData,  handleFormChange, formData }) => {
  // Destructure the properties of the 'el' object passed as an argument
  let { networkName, idNetwork } = el;
  const [form, setForm] = useState(initialForm);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  
    handleFormChange(el.idNetwork, name, value); // Envía el valor actualizado
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
          name="totalGoal"
          id={`totalGoal${el.idNetwork}`} // Add the ID to the input ID property          
          placeholder="Meta del trimestre"
          className="form-control"
          onChange={handleChange}
          value={form.totalGoal}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="oldStudents"
          id={`oldStudents_${el.idNetwork}`} // Add the ID to the input ID property          
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={handleChange}
          value={form.oldStudents}
        />
      </td>
    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
