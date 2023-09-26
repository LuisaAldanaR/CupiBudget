import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import CrudTableRowContract from "./CrudTableRowContract";
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import axios, { all } from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const BudgetGenerator = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({}); // Nuevo estado para los datos de los formularios

  const token = localStorage.getItem("jwtToken"); // Recupera el token JWT del almacenamiento local
  const api = helpHttp(); // Instancia de la utilidad de solicitud HTTP
  const [pdfLink, setPdfLink] = useState(null);

  // Función para manejar la descarga del informe de presupuesto
  const generateBudget = async () => {
    const data1 = [];
    const data2 = [];

    db.forEach((el) => {
      const rowData1 = {
        totalGoal: Number(formData[el.idNetwork]?.data1?.totalGoal || 0),
        oldStudents: Number(formData[el.idNetwork]?.data1?.oldStudents || 0),
        idNetwork: Number(el.idNetwork),
      };

      const rowData2 = {
        totalGoal: Number(formData[el.idNetwork]?.data2?.totalGoal || 0),
        oldStudents: Number(formData[el.idNetwork]?.data2?.oldStudents || 0),
        idNetwork: Number(el.idNetwork),
      };

      data1.push(rowData1);
      data2.push(rowData2);
    });

    const requestData = {
      data1,
      data2,
    };

    try {
      const response = await fetch(
        "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 200) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Forzar la descarga del archivo PDF
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Reporte.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        setPdfLink(url);
        
        Swal.fire({
          title: "Éxito",
          text: "Informe generado y enviado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setFormData({});
    }
  };
  

  useEffect(() => {
    loadTableData(); // Carga los datos iniciales cuando el componente se monta
  }, []);

  // Función para cargar datos en la tabla
  const loadTableData = () => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/Network/List";

    let options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    api.get(urlPost, options).then((res) => {
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

  // Function to update an existing instructor
  const updateData = (data) => {
    const urlPost = "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate";

    let options = {
      body: data,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    };

    api.post(urlPost, options).then((res) => {
      if (!res.error) {
        Swal.fire({
          title: "Enviado!", // Corregir el mensaje de éxito
          text: "Datos enviados correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          let newData = db.map((el) =>
            el.idInstructor === data.idInstructor ? data : el
          );
          setDb(newData); // Actualizar 'db' con los nuevos datos
        });
      } else {
        setError(res);
      }
    });
  };

  // Function to handle changes in form fields
const handleFormChange = (idNetwork, name, value) => {
  
  // Crear una copia del estado formData
  const updatedFormData = { ...formData };

  // Crear un objeto de datos para esta fila
  const rowData = {
    ...updatedFormData[idNetwork],
    [name]: value,
  };

  // Actualizar el estado con los datos de esta fila
  updatedFormData[idNetwork] = rowData;

  // Actualizar el estado formData con los nuevos datos
  setFormData(updatedFormData);

 // Agregar algunos console.log para verificar los valores
   console.log("formData:", updatedFormData);
   console.log("idNetwork:", idNetwork);
   console.log("name:", name);
   console.log("value:", value);
};



  return (
    <div>
      <h1 className="h3Table">Generador de Reporte</h1>
      <div className="containerButtons">
        <button className="btn addButton btn-generate" onClick={generateBudget}>
          Generar Reporte
        </button>
    
        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </div>

      <CrudTable 
      data={db} 
      setDataToEdit={setDataToEdit} 
      updateData={updateData} 
      handleFormChange={handleFormChange} 
      formData={formData} />
    </div>
  );
};

export default BudgetGenerator;





