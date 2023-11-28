import React, { useEffect, useState } from "react";
import "../../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const CrudTableRow = ({ el}) => {
  // Destructure the properties of the 'el' object passed as an argument
  let { level, mode,  name, } = el;

  // Convert DateTime dates to Date objects


  // Options to format the date in Spanish


  return (
    // Render a table row with the data from the 'el' object
    <tr>
      <th className="tdTableRow">{level}</th>
      <th className="tdTableRow">{mode}</th>
      <th className="tdTableRow">{name}</th>
    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
