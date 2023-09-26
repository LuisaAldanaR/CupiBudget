import React, { useState } from "react";
import "../../App.scss";
import Swal from "sweetalert2";

// Define an object with initial values for the form
const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const CrudTableRow = ({ el, setDataToEdit, updateData }) => {
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
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!form.totalGoal || !form.oldStudents) {
      Swal.fire("¡Faltan campos por llenar!", "", "question");
      return;
    }
  
    // Create an object with the desired structure
    const newData = {
      data1: [
        {
          totalGoal: Number(form.totalGoal),
          oldStudents: Number(form.oldStudents),
          idNetwork: Number(el.idNetwork),
        },
      ],
    };
  
    // Convert newData to a JSON string with quotes around keys
    const newDataString = JSON.stringify(newData);
  
    // You can access the newDataString here and send it to your API
    console.log(newDataString);
  
    updateData(newDataString); // Send the JSON string to your API
  
    // Clear the form and reset dataToEdit to null
    handleReset();
  };
  

  // Function to clear the form and edit data
  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
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
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={handleChange}
          value={form.oldStudents}
        />
      </td>
      <td className="tdTableRow">
        <button
          className="btn btn-success btn-send"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </td>
    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
