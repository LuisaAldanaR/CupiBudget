import React, { useEffect, useState } from "react";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const CrudTableRow = ({ el, setDataToEdit, deleteData, showFormView }) => {
  let { idInstructor, name, startDate, endDate, oNetwork, endDateCourse } = el;

  // Convert DateTime dates to Date objects
  const startDateAsDate = new Date(startDate);
  const endDateAsDate = new Date(endDate);
  const endDateCourseAsDate = new Date(endDateCourse);

  // Use state to manage the icon to display based on the condition
  const [iconToDisplay, setIconToDisplay] = useState(null);

  const isEndDateCourseAvaliable = endDateAsDate > new Date();

  useEffect(() => {
    if (isEndDateCourseAvaliable) {
      setIconToDisplay(
        <FontAwesomeIcon icon={faCircle} style={{ color: "#0aff00" }} />
      );
    } else {
      setIconToDisplay(
        <FontAwesomeIcon icon={faCircle} style={{ color: "#ff0000" }} />
      );
    }
  }, [isEndDateCourseAvaliable]);

  // Options to format the date in Spanish
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let role = "";
  const token = localStorage.getItem("jwtToken");

  // Function to verify if the token is active
  function isTokenExpired(token) {
    const arrayToken = token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role =
      tokenPayload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    return Math.floor(new Date().getTime / 1000) >= tokenPayload?.sub;
  }

  isTokenExpired(token);

  return (
    <tr>
      <th className="tdTableRow">{iconToDisplay}</th>
      <th className="tdTableRow">{name}</th>
      <td className="tdTableRow">
        {startDateAsDate.toLocaleDateString("es-ES", options)}
      </td>
      <td className="tdTableRow">
        {endDateAsDate.toLocaleDateString("es-ES", options)}
      </td>
      <td className="tdTableRow">
        {endDateCourseAsDate.toLocaleDateString("es-ES", options)}
      </td>
      <td className="tdTableRow">
        {oNetwork ? (
          oNetwork.networkName
        ) : el.loading ? (
          <span>Cargando...</span>
        ) : null
        }
      </td>

      <th className="tdTableRow">
        {role === "Admin" && (
          <>
            <button
              className="btn btn-warning"
              onClick={() => {
                setDataToEdit(el);
                showFormView();
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            &nbsp;
            <button
              className="btn btn-danger"
              onClick={() => deleteData(idInstructor, el)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </th>
    </tr>
  );
};

export default CrudTableRow;
