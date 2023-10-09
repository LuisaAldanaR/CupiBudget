import React, {useEffect, useState} from 'react';
import CrudTableGoals from "./CrudTableGoals";
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import Swal from "sweetalert2";


const Goals = () => {

    const [db, setDb] = useState([]);
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

        const nivelFormacion = [
            {name : presencial, id : 1},
            {name : virtual, id : 2},
            {name : auxiliares, id : 3},
            {name : operarios, id : 4},
            {name : laboralPresencial, id : 5},
            {name : laboralVirtual, id : 6},
        ];

        setDb(nivelFormacion);
      };
    
      // Function to create a new instructor
    
        const createData = (data) => {
          let urlPost = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Save";
        
          let options = {
            body: data,
            headers: { "content-type": "application/json",'Authorization': `Bearer ${token}`, },   
          };
        
          api.post(urlPost, options).then((res) => {
            if (!res.err) {
              // Show a success SweetAlert message for the record addition
              Swal.fire({
                title: '¡Agregado!', // Translate: Added!
                text: 'El registro ha sido agregado exitosamente.', // Translate: The record has been successfully added.
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
                formData={formData} />
        </div>
    );
}
 
export default Goals;
