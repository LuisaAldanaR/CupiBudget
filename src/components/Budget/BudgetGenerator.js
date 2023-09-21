import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const BudgetGenerator = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkOptions, setNetworkOptions] = useState([]);

  const token = localStorage.getItem("jwtToken"); // Recupera el token JWT del almacenamiento local
  const api = helpHttp(); // Instancia de la utilidad de solicitud HTTP

  // Función para manejar la descarga del informe de presupuesto
  const generateBudget = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" }); // Obtiene el nombre completo del mes actual
    const fileName = `Reporte_${month}.pdf`; // Nombre del archivo con el mes
  
    const urlGet = "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate";
    const downloadOptions = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Indica que esperamos una respuesta binaria (blob)
    };
  
    axios.get(urlGet, downloadOptions)
      .then((res) => {
        // Verifica si la respuesta es un archivo PDF (content-type: application/pdf)
        const contentType = res.headers["content-type"];
        if (contentType === "application/pdf") {
          // Crea un objeto Blob a partir de la respuesta
          const blob = new Blob([res.data], { type: contentType });
  
          // Crea un objeto URL para el Blob
          const url = window.URL.createObjectURL(blob);
  
          // Crea un enlace <a> para descargar el archivo con el nombre personalizado
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName; // Establece el nombre de archivo personalizado
  
          // Dispara el evento de clic en el enlace para iniciar la descarga
          a.click();
  
          // Libera el objeto URL creado
          window.URL.revokeObjectURL(url);
        } else {
          console.error("La respuesta no es un archivo PDF.");
        }
      })
      .catch((error) => {
        console.error("Error al descargar el archivo PDF:", error);
      });
  };
  

  useEffect(() => {
    loadTableData(); // Carga los datos iniciales cuando el componente se monta
  }, []);

  // Función para cargar datos en la tabla
  // Function to load table data
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/Network/List";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
    };
    
    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDb(res.response); // Store data in the 'db' state
        setError(null); // Clear errors
      } else {
        setDb([]); // Set an empty array in 'db' in case of an error
        setError(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); // Set 'loading' to false after data is loaded
    });
  };

  return (
    <div>
      <h1 className="h3Table">Generador de Reporte</h1>
      <div className="containerButtons">
         <button className="btn addButton btn-generate" onClick={generateBudget}>
    Generar Reporte
  </button>
  <button className="btn btn-success btn-send">
    Enviar         &nbsp;
    <FontAwesomeIcon icon={faPaperPlane} />
  </button>

        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </div>

      <CrudTable data={db} setDataToEdit={setDataToEdit} />
    </div>
  );
};

export default BudgetGenerator;

