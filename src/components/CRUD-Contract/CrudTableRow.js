import React from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CrudTableRow = ({ el, setDataToEdit, deleteData, showFormView }) => {
  // Destructure the properties of the 'el' object passed as an argument
  let { idInstructor, name, startDate, endDate, oNetwork,endDateCourse } = el;

  // Convert DateTime dates to Date objects
  const startDateAsDate = new Date(startDate);
  const endDateAsDate = new Date(endDate);
  const endDateCourseAsDate = new Date(endDateCourse);

  // Options to format the date in Spanish
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    // Render a table row with the data from the 'el' object
    <tr>
      <th className="tdTableRow">{name}</th>
      <td className="tdTableRow">{startDateAsDate.toLocaleDateString('es-ES', options)}</td>
      <td className="tdTableRow">{endDateAsDate.toLocaleDateString('es-ES', options)}</td>
      <td className="tdTableRow">{endDateCourseAsDate.toLocaleDateString('es-ES', options)}</td>
      {/* Render the network name ('oNetwork.networkName') or a loading message if it's not defined */}
      <td className="tdTableRow">
        {oNetwork ? (
          oNetwork.networkName
        ) : (
          el.loading ? (<span>Cargando...</span>) : null // Check if the 'el' object has a 'loading' property
        )}
      </td>
      <th className="tdTableRow">
        {/* Edit button with FontAwesome icon */}
        <button className="btn btn-warning" onClick={() => {
          setDataToEdit(el); // Set the 'el' object as the data to edit
          showFormView(); // Call the 'showFormView' function to display the form
        }}><FontAwesomeIcon icon={faUserPen} /></button>&nbsp;

        {/* Delete button that calls the 'deleteData' function with 'idInstructor' as an argument */}
        <button className="btn btn-danger" onClick={() => deleteData(idInstructor, el)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </th>
    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
