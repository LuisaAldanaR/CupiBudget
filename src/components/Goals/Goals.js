import React, { useEffect, useState } from 'react';
import CrudTableGoals from './TableGoal/CrudTableGoals';
import CrudTableTotalGoals from './TableResult/CrudTableTotalGoals';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';

const Goals = () => {
  const [formData, setFormData] = useState({
    goals1: [
      {
        modality: 'presencial',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
      {
        modality: 'virtual',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
    ],
    goals2: [
      {
        modality: 'auxiliar',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
      {
        modality: 'operario',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
      {
        modality: 'laboral presencial',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
      {
        modality: 'laboral virtual',
        target: 300,
        passes2021To2022: 0,
        firstQuarterEnrollment: 0,
        secondQuarterEnrollment: 0,
        thirdQuarterEnrollment: 0,
        fourthQuarterEnrollment: 0,
      },
    ],
  });

  const [db, setDb] = useState({
    goals1: [
      {
        name: 'Presencial', // Nombre de la modalidad
        id: 1, // ID u otro identificador
      },
      {
        name: 'Virtual',
        id: 2,
      },
    ],
    goals2: [
      {
        name: 'Auxiliares',
        id: 3,
      },
      {
        name: 'Operarios',
        id: 4,
      },
      {
        name: 'Laboral Presencial',
        id: 5,
      },
      {
        name: 'Laboral Virtual',
        id: 6,
      },
    ],
  });

  const [dbTotals, setDbTotals] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('jwtToken');
  const api = helpHttp();

  const handleFormChange = (modality, name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [modality]: {
        ...prevFormData[modality],
        [name]: value,
      },
    }));
  };
  
  const createData = async () => {
    let urlPost = 'http://www.mendezmrf10.somee.com/api/Simulator/CalculateSimulator';
  
    let options = {
      body: formData,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const res = await api.post(urlPost, options);
  
      if (!res.err) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Metas desplegadas exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        setDb({
          goals1: res.goals1,
          goals2: res.goals2,
        });
  
        console.log(res);
        loadTableTotalsData();
      } else {
        setError(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    // Este efecto se ejecutará cada vez que db cambie.
    console.log(db);
  }, [db]);

  useEffect(() => {
    loadTableTotalsData();
  }, []);

  const loadTableTotalsData = () => {
    let totalEducacionSuperior = 'Total Educación Superior';
    let totalTecnicos = 'Total Tecnicos y otros';

    const totales = [
      { nombre: totalEducacionSuperior },
      { nombre: totalTecnicos },
    ];

    setDbTotals(totales);
  };

  return (
    <div className='content'>
      <div className='containerButtons'>
        <button className='btn addButton btn-generate' onClick={createData}>
          Enviar Meta
        </button>
      </div>

      <CrudTableGoals
        data={db}
        setDataToEdit={() => {}}
        handleFormChange={handleFormChange}
        formData={formData}
      />

      <CrudTableTotalGoals
        dataTotals={dbTotals}
        setDataToEdit={() => {}}
        formData={formData}
      />
    </div>
  );
};

export default Goals;
