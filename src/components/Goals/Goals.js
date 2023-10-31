import React, { useState, useEffect } from 'react';
import CrudTableGoals from './TableGoal/CrudTableGoals';
import CrudTableTotalGoals from './TableResult/CrudTableTotalGoals';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';
import { Exception } from 'sass';

const Goals = () => {
  const token = localStorage.getItem('jwtToken');
  const api = helpHttp();

  const [data, setData] = useState({
    goals1: [
      {
        modality: "Presencial",
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      },
      {
        modality: 'Virtual',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      }
    ],
    goals2: [
      {
        modality: 'Auxiliar',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      },
      {
        modality: 'Operario',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      },
      {
        modality: 'Laboral Presencial',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      },
      {
        modality: 'Laboral Virtual',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      },
    ],
    goal3: [
      {
        modality: 'Tecnologo',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
      }
    ],
      goal4: [
      {
        modality: 'Tecnico',
        target: 0,
        passes2021To2022: 0,
        percentage: 0,  
        firstQuarterEnrollment: 0,
        firstQuarterGroups:0,
        firstQuarterTotal:0, 
        firstQuarterPercentage:0,
        secondQuarterEnrollment: 0,
        secondQuarterGroups:0,
        secondQuarterTotal:0,
        secondQuarterPercentage:0,
        thirdQuarterEnrollment: 0,
        thirdQuarterGroups:0,
        thirdQuarterTotal:0,
        thirdQuarterPercentage:0,
        fourthQuarterEnrollment: 0,
        fourthQuarterGroups:0,
        fourthQuarterTotal:0,
        fourthQuarterPercentage:0,
        margin:0,
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
      const urlPost = 'https://www.cupibudget.somee.com/api/Simulator/CalculateSimulator';
  
      const options = {
        body: data, // Aquí estás enviando los datos actuales al servidor
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
  
        // Actualiza el estado 'data' con los nuevos datos de la API
        setData(res);
        console.log(res);
      } else {
        console.error('Error en la respuesta de la API:', res);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  useEffect(() => {
    // Este efecto se ejecutará cada vez que db cambie.
    console.log(data);
  }, [data]);
  

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
