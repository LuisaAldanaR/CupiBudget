import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import CrudTableRowContract from "./CrudTableRowContract";
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import axios, { all } from "axios";
import Swal from "sweetalert2";

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

  const loadPdfGeneratorData = async () => {
    try {
      const response = await fetch(
        "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        setDb(data); // Actualizar el estado db con los datos recuperados
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  
  // Llamar a la función loadPdfGeneratorData cuando sea necesario, por ejemplo, en un botón o en useEffect:
  useEffect(() => {
    loadPdfGeneratorData(); // Cargar datos de la API al montar el componente
  }, []);
  
  const generateBudget = async () => {
    try {
      const data1 = [];
      const data2 = [];
      console.log("formData:", formData);
      console.log("db: " ,db);

      db.forEach((el) => {
        const rowData1 = {
          totalGoal: document.getElementById(`totalGoal${el.idNetwork}`).value,
          oldStudents: document.getElementById(`oldStudents_${el.idNetwork}`).value,
          idNetwork: Number(el.idNetwork),
        };

        const rowData2 = {
          totalGoal: document.getElementById(`totalGoal${el.idNetwork}`).value,
          oldStudents: document.getElementById(`oldStudents_${el.idNetwork}`).value,
          idNetwork: Number(el.idNetwork),
        };

        data1.push(rowData1);
        data2.push(rowData2);
      });

      const requestData = {
        data1,
        data2,
      };

      console.log("requestData:", requestData);

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
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Reporte.pdf";
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

  // Función para cargar datos en la tabla
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/Network/List";

    let options = {
      headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    loadTableData(); // Carga los datos iniciales cuando el componente se monta
  }, []);


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
