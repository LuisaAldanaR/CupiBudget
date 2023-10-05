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

    const token = localStorage.getItem("jwtToken"); // Recupera el token JWT del almacenamiento local
    const api = helpHttp(); // Instancia de la utilidad de solicitud HTTP
    const [pdfLink, setPdfLink] = useState(null);

    return (  
        <div className='content'>
            <div className='containerButtons'>
                <button className="btn addButton btn-generate">
                    Enviar
                </button>
            </div>

            <CrudTableGoals
                data={db}
                setDataToEdit={setDataToEdit}
                //updateData={updateData}
                formData={formData} />
            <h1>Goals</h1>
        </div>
    );
}
 
export default Goals;
