// CrudTableRow.js

import React from 'react';
import '../../../App.scss';

const CrudTableRow = ({ goal, index, goalsKey, handleFormChange }) => {
  const handleChange = (e) => {
    handleFormChange(e, index, goalsKey);
  };

  return (
    <tr>
      <td className="tdTableRow">
        <input
          type="text"
          name="modality"
          placeholder="Modalidad"
          value={goal.modality || ''}
          onChange={handleChange}
        />
      </td>
      <td className="tdTableRow">
        <input
          type="number"
          name="target"
          placeholder="Meta"
          value={goal.target || ''}
          onChange={handleChange}
        />
      </td>
      <td className="tdTableRow">
        <input
          type="number"
          name="passes2021To2022"
          value={goal.passes2021To2022 || ''}
          onChange={handleChange}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="firstQuarterEnrollment"
          value={goal.firstQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="secondQuarterEnrollment"
          value={goal.secondQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>
      
      <td className="tdTableRow">
        <input
          type="number"
          name="thirdQuarterEnrollment"
          value={goal.thirdQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="fourthQuarterEnrollment"
          value={goal.fourthQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>
      
      {/* Agrega más campos de entrada para otros trimestres aquí */}
    </tr>
  );
};

export default CrudTableRow;
