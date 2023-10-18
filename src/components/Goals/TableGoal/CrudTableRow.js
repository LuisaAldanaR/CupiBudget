import React from 'react';
import '../../../App.scss';

const CrudTableRow = ({ goal, index, goalsKey, handleFormChange }) => {
  const handleChange = (e) => {
    handleFormChange(e, index, goalsKey);
  };

  // Verifica la modalidad y asigna el nombre apropiado
  const levelName = goal.modality === "Presencial" || goal.modality === "Virtual"
    ? "Tecnólogo"
    : "Técnico Laborales y Otros";

  return (
    <tr>

      <td className='tdTableRow'>{levelName}</td>
      
      <td className='tdTableRow'>{goal.modality}</td>

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
          value={goal.passes2021To2022 || ""}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.percentage}</td>

      <td className="tdTableRow">
        <input
          type="number"
          name="firstQuarterEnrollment"
          value={goal.firstQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.firstQuarterTotal}</td>

      <td className='tdTableRow'>{goal.firstQuarterPercentage}</td>

      <td className="tdTableRow">
        <input
          type="number"
          name="secondQuarterEnrollment"
          value={goal.secondQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.secondQuarterTotal}</td>

      <td className='tdTableRow'>{goal.secondQuarterPercentage}</td>
      
      <td className="tdTableRow">
        <input
          type="number"
          name="thirdQuarterEnrollment"
          value={goal.thirdQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.thirdQuarterTotal}</td>

      <td className='tdTableRow'>{goal.thirdQuarterPercentage}</td>

      <td className="tdTableRow">
        <input
          type="number"
          name="fourthQuarterEnrollment"
          value={goal.fourthQuarterEnrollment || ''}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.fourthQuarterTotal}</td>

      <td className='tdTableRow'>{goal.fourthQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.margin}</td>
      
      {/* Agrega más campos de entrada para otros trimestres aquí */}
    </tr>
  );
};

export default CrudTableRow;
