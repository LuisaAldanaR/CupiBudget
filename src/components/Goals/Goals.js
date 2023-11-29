import React, { useState, useEffect } from 'react';
import CrudTableGoals from './TableGoal/CrudTableGoals';
import CrudTableTotalGoals from './TableResult/CrudTableTotalGoals';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';

const createGoal = (modality) => ({
  modality,
  target: 0,
  passes2021To2022: 0,
  percentage: 0,
  firstQuarterEnrollment: 0,
  firstQuarterGroups: 0,
  firstQuarterTotal: 0,
  firstQuarterPercentage: 0,
  secondQuarterEnrollment: 0,
  secondQuarterGroups: 0,
  secondQuarterTotal: 0,
  secondQuarterPercentage: 0,
  thirdQuarterEnrollment: 0,
  thirdQuarterGroups: 0,
  thirdQuarterTotal: 0,
  thirdQuarterPercentage: 0,
  fourthQuarterEnrollment: 0,
  fourthQuarterGroups: 0,
  fourthQuarterTotal: 0,
  fourthQuarterPercentage: 0,
  margin: 0,
});

const Goals = () => {
  const token = localStorage.getItem('jwtToken');
  const api = helpHttp();

  // State to initialize the data to send
  const [data, setData] = useState({
    goals1: [createGoal("Presencial"), createGoal("Virtual")],
    goals2: [
      createGoal("Auxiliar"),
      createGoal("Operario"),
      createGoal("Laboral Presencial"),
      createGoal("Laboral Virtual"),
    ],
    goal3: [createGoal("Tecnologo")],
    goal4: [createGoal("Tecnico")],
  });

  const handleFormChange = (e, index, goalsKey) => {
    const { name, value } = e.target;

    const newData = { ...data };

    newData[goalsKey][index] = {
      ...newData[goalsKey][index],
      [name]: value,
    };

    setData(newData);
  };

  // Function to send data to API
  const handleSendGoals = async () => {
    try {
      const urlPost = 'https://www.cupibudget.somee.com/api/Simulator/CalculateSimulator';

      const options = {
        body: data,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await api.post(urlPost, options);

      if (!res.err) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Metas desplegadas exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setData(res);
        console.log(res);
      } else {
        console.error('Error en la respuesta de la API:', res);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  return (
    <div className='content'>
      <div className='containerButtons'>
        <button className='btn addButton btn-generate' onClick={handleSendGoals}>
          Enviar Metas
        </button>
      </div>
      <CrudTableGoals data={data} handleFormChange={handleFormChange} />
      <CrudTableTotalGoals data={data} />
    </div>
  );
};

export default Goals;
