// Goals.js

import React, { useState } from 'react';
import CrudTableGoals from './TableGoal/CrudTableGoals';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';

const Goals = () => {
  const token = localStorage.getItem('jwtToken');
  const api = helpHttp();

  const [data, setData] = useState({
    goals1: [
      {
        modality: '',
        target: 0,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
    ],
    goals2: [
      {
        modality: '',
        target: 0,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
    ],
  });

  const handleFormChange = (e, index, goalsKey) => {
    const { name, value } = e.target;

    // Crear una copia de los datos existentes
    const newData = { ...data };

    // Actualizar los datos según el índice y la clave de los objetivos
    newData[goalsKey][index] = {
      ...newData[goalsKey][index],
      [name]: value,
    };

    setData(newData);
  };

  const handleSendGoals = async () => {
    try {
      const urlPost = 'http://www.mendezmrf10.somee.com/api/Simulator/CalculateSimulator';

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
    </div>
  );
};

export default Goals;
