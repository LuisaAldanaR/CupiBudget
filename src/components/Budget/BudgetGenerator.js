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

  // Función para manejar la descarga del informe de presupuesto
  const generateBudget = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", {
      month: "long",
    }); // Obtiene el nombre completo del mes actual
    const fileName = `Reporte_${month}.pdf`; // Nombre del archivo con el mes

    const urlGet = "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate";
    const downloadOptions = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Indica que esperamos una respuesta binaria (blob)
    };

    axios
      .get(urlGet, downloadOptions)
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

  // Function to update an existing instructor
  const updateData = (data) => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/InPerson/List";

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

const handleAllSubmit = () => {
  // Crear arreglos para almacenar los datos de todas las filas
  const data1 = [];
  const data2 = [];

  // Recorrer las filas y agregar sus datos a los arreglos correspondientes
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

    // Agregar datos de la primera tabla al arreglo data1
    data1.push(rowData1);

    // Agregar datos de la segunda tabla al arreglo data2
    data2.push(rowData2);
  });

  // Crear el objeto con la estructura esperada
  const requestData = {
    data1,
    data2,
  };

  // Ahora tienes los datos de ambas tablas en la estructura esperada
  console.log("requestData:", requestData);

  // Llama al método updateData con el objeto requestData como argumento
  updateData(requestData);

  // Limpiar el estado formData
  setFormData({});
};


  return (
    <div>
      <h1 className="h3Table">Generador de Reporte</h1>
      <div className="containerButtons">
        <button className="btn addButton btn-generate" onClick={generateBudget}>
          Generar Reporte
        </button>
        <button className="btn btn-success btn-send" onClick={handleAllSubmit}>
          Enviar Todos &nbsp;
          <FontAwesomeIcon icon={faPaperPlane} />
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





