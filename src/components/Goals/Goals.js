import React, {useEffect, useState} from 'react';
import CrudTableGoals from './TableGoal/CrudTableGoals';
import CrudTableTotalGoals from './TableResult/CrudTableTotalGoals';
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import Swal from "sweetalert2";


const Goals = () => {

    const [db, setDb] = useState([]);
    const [dbTotals, setDbTotals] = useState([]);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({}); // Nuevo estado para los datos de los formularios
    const [error, setError] = useState(null); 

    const token = localStorage.getItem("jwtToken"); // Recupera el token JWT del almacenamiento local
    const api = helpHttp(); // Instancia de la utilidad de solicitud HTTP


    useEffect(() => {
        loadTableData(); // Load initial data when the component mounts
      }, []);
    
      // Function to load table data
      const loadTableData = () => {
        let presencial = "Presencial";
        let virtual = "Virtual";
        let auxiliares = "Auxiliares";
        let operarios = "Operarios";
        let laboralPresencial = "Laboral Presencial";
        let laboralVirtual = "Laboral Virtual";
        let modality= "";
        let target = 0;
        let passes2021To2022= 0;
        let percentage = 0;
        let firstQuarterEnrollment = 0;
        let firstQuarterTotal = 0;
        let firstQuarterPercentage = 0;
        let secondQuarterEnrollment =  0;
        let secondQuarterTotal = 0;
        let secondQuarterPercentage = 0;
        let thirdQuarterEnrollment= 0;
        let thirdQuarterTotal = 0;
        let thirdQuarterPercentage = 0;
        let fourthQuarterEnrollment= 0;
        let fourthQuarterTotal = 0;
        let fourthQuarterPercentage = 0;
        let margin = 0;

        const nivelFormacion = [
            {name : presencial, id : 1},
            {name : virtual, id : 2},
            {name : auxiliares, id : 3},
            {name : operarios, id : 4},
            {name : laboralPresencial, id : 5},
            {name : laboralVirtual, id : 6},
            {modality},
            {target},
            {passes2021To2022},
            {percentage},
            {firstQuarterEnrollment},
            {firstQuarterTotal},
            {firstQuarterPercentage},
            {secondQuarterEnrollment},
            {secondQuarterTotal},
            {secondQuarterPercentage},
            {thirdQuarterEnrollment},
            {thirdQuarterTotal},
            {thirdQuarterPercentage},
            {fourthQuarterEnrollment},  
            {fourthQuarterTotal},
            {fourthQuarterPercentage},
            {margin},         
        ];

        setDb(nivelFormacion);
      };

  useEffect(() => {
    loadTableTotalsData(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableTotalsData = () => {
    let totalEducacionSuperior = "Total Educación Superior";
    let totalTecnicos = "Total Tecnicos y otros";

    const totales = [
      { nombre: totalEducacionSuperior },
      { nombre: totalTecnicos },
    ];

    setDbTotals(totales);
  };
    
  // Function to create a new instructor

  const createData = (data) => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/Simulator/CalculateSimulator";

    let options = {
      body: data,
      headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, },
    };

    api.post(urlPost, options).then((res) => {
      if (!res.err) {
        // Show a success SweetAlert message for the record addition
        Swal.fire({
          title: '¡Exito!', // Translate: Added!
          text: 'El metas desplegadas exitosamente.', // Translate: The record has been successfully added.
          icon: 'success',
          confirmButtonText: 'OK', // Translate: OK
        })
        // After adding a record, reload the data
        loadTableData();
      } else {
        setError(res);
      }
    });
  };
    

    return (  
        <div className='content'>
            <div className='containerButtons'>
                <button className="btn addButton btn-generate">
                    Enviar Meta
                </button>
            </div>

            <CrudTableGoals
                data={db}
                setDataToEdit={setDataToEdit}
                //updateData={updateData}
                formData={formData}     
            />

            <CrudTableTotalGoals
                dataTotals={dbTotals}
                setDataToEdit={setDataToEdit}
                //updateData={updateData}
                formData={formData}     
            />
        </div>
    );
}
 
export default Goals;

