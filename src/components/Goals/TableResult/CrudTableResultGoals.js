import React from 'react';
import '../../../App.scss';

const CrudTableResultGoals = ({ goal, index, goalsKey }) => {

  console.log(goal);

  // Verifica la modalidad y asigna el nombre apropiado
  const levelName = goal.modality === "Tecnologo"
    ? "Tecnólogo"
    : "Técnico Laborales y Otros";

    return (
    <tr>

      <td className='tdTableRow'>{levelName}</td>
      
      <td className='tdTableRow'>{goal.target}</td>

      <td className='tdTableRow'>{goal.passes2021To2022}</td>

      <td className='tdTableRow'>{goal.percentage}</td>

      <td className='tdTableRow'>{goal.firstQuarterEnrollment}</td>
    
      <td className='tdTableRow'>{goal.firstQuarterTotal}</td>

      <td className='tdTableRow'>{goal.firstQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.secondQuarterEnrollment}</td>

      <td className='tdTableRow'>{goal.secondQuarterTotal}</td>

      <td className='tdTableRow'>{goal.secondQuarterPercentage}</td>
      
      <td className='tdTableRow'>{goal.thirdQuarterEnrollment}</td>

      <td className='tdTableRow'>{goal.thirdQuarterTotal}</td>

      <td className='tdTableRow'>{goal.thirdQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.fourthQuarterEnrollment}</td>

      <td className='tdTableRow'>{goal.fourthQuarterTotal}</td>

      <td className='tdTableRow'>{goal.fourthQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.margin}</td>
      
    </tr>
  );
};

export default CrudTableResultGoals;
