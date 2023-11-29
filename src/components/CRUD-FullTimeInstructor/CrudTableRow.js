import React from "react";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CrudTableRow = ({
  el,
  setDataToEdit,
  deleteData,
  showFormViewFullTimeInstructor,

}) => {
  let { idInstructor, name, position, oNetwork, endDateCourse } = el;
  const endDateCourseAsDate = new Date(endDateCourse);

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
      <td className="tdTableRow">{name}</td>

      <td className="tdTableRow">{position}</td>
      <td className="tdTableRow">
        {endDateCourseAsDate.toLocaleDateString("es-ES", options)}
      </td>
      <td className="tdTableRow">
        {oNetwork ? (
          oNetwork.networkName
        ) : el.loading ? (
          <span>Cargando...</span>
        ) : null}
      </td>

      <td className="tdTableRow">
        {role === "Admin" && (
          <>
            <button
              className="btn btn-warning"
              onClick={() => {
                setDataToEdit(el);
                showFormViewFullTimeInstructor();
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
      </td>
    </tr>
  );
};

export default CrudTableRow;
