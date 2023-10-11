import React, { useState } from "react";
import "../../../App.scss";

const CrudTableRow = ({ el, formData, handleFormChange }) => {
  let tecnologo = "Tecnologo";
  let tecnico = "Tecnicos Laborales y otros";

  let valorNivel = el.id <= 2 ? tecnologo : tecnico;

  return (
    <tr>
      <td className="tdTableRow">{valorNivel}</td>
      <td className="tdTableRow">
        {el ? (
          el.name
        ) : (
          el.loading ? (<span>Cargando...</span>) : null
        )}
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="target"
          id={el.target}
          placeholder="Meta"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].target : 0}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="passes2021To2022"
          id={el.passes2021To2022}
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].passes2021To2022 : 0}
        />
      </td>

      <td className="tdTableRow">{el.percentage}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name="firstQuarterEnrollment"
          id={el.firstQuarterEnrollment}
          placeholder="1er trimestre"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].firstQuarterEnrollment : 0}
        />
      </td>
      <td className="tdTableRow">{el.firstQuarterTotal}</td>
      <td className="tdTableRow">{el.firstQuarterPercentage}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name="secondQuarterEnrollment"
          id={el.secondQuarterEnrollment}
          placeholder="2do trimestre"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].secondQuarterEnrollment : 0}
        />
      </td>      
      <td className="tdTableRow">{el.secondQuarterTotal}</td>
      <td className="tdTableRow">{el.secondQuarterPercentage}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name="thirdQuarterEnrollment"
          id={el.thirdQuarterEnrollment}
          placeholder="3er trimestre"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].thirdQuarterEnrollment : 0}
        />
      </td>      
      <td className="tdTableRow">{el.thirdQuarterTotal}</td>
      <td className="tdTableRow">{el.thirdQuarterPercentage}</td>
      <td className="tdTableRow">
        <input
          type="number"
          name="fourthQuarterEnrollment"
          id={el.fourthQuarterEnrollment}
          placeholder="4to trimestre"
          className="form-control"
          onChange={(e) => handleFormChange(el.name, e.target.name, e.target.value)}
          value={formData[el.name] ? formData[el.name].fourthQuarterEnrollment : 0}
        />
      </td>      
      <td className="tdTableRow">{el.fourthQuarterTotal}</td>
      <td className="tdTableRow">{el.fourthQuarterPercentage}</td>
    </tr>
  );
};

export default CrudTableRow;
