import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la importación según tu estructura de archivos
import Swal from "sweetalert2";
import Loader from "./Loader"; // Import the loader component
import Message from "./Message"; // Import the message component

const BudgetGenerator = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({}); // Nuevo estado para los datos de los formularios

  const token = localStorage.getItem("jwtToken"); // Recupera el token JWT del almacenamiento local
  const api = helpHttp(); // Instancia de la utilidad de solicitud HTTP
  const [pdfLink, setPdfLink] = useState(null);
  

  const generateBudget = async () => {
    try {
      const data1 = [];
      const data2 = [];

      // Obtén el mes actual como una cadena (por ejemplo, "enero", "febrero", etc.)
      const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const currentMonth = monthNames[new Date().getMonth()];

      db.forEach((el) => {
        const totalGoalInputTechnological = document.getElementById(`totalGoalTechnological${el.idNetwork}`);
        const oldStudentsInputTechnological = document.getElementById(`oldStudentsTechnological${el.idNetwork}`);

        // Obtén el valor del campo de entrada o establece 0 si está vacío
        const totalGoalValueTechnological = totalGoalInputTechnological.value.trim() !== '' ? parseFloat(totalGoalInputTechnological.value) : 0;
        const oldStudentsValueTechnological = oldStudentsInputTechnological.value.trim() !== '' ? parseFloat(oldStudentsInputTechnological.value) : 0;

        const totalGoalInputTechnical = document.getElementById(`totalGoalTechnical${el.idNetwork}`);
        const oldStudentsInputTechnical = document.getElementById(`oldStudentsTechnical${el.idNetwork}`);

        // Obtén el valor del campo de entrada o establece 0 si está vacío
        const totalGoalValueTechnical = totalGoalInputTechnical.value.trim() !== '' ? parseFloat(totalGoalInputTechnical.value) : 0;
        const oldStudentsValueTechnical = oldStudentsInputTechnical.value.trim() !== '' ? parseFloat(oldStudentsInputTechnical.value) : 0;

        const rowData1 = {
          totalGoal: totalGoalValueTechnological,
          oldStudents: oldStudentsValueTechnological,
          idNetwork: Number(el.idNetwork),
        };

        const rowData2 = {
          totalGoal: totalGoalValueTechnical, // Cambia esta línea si deseas diferentes valores para data2
          oldStudents: oldStudentsValueTechnical, // Cambia esta línea si deseas diferentes valores para data2
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
        "https://www.cupibudget.somee.com/api/PDFGenerator/Generate",
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

        const pdfFileName = `Reporte_${currentMonth}.pdf`;

        // Forzar la descarga del archivo PDF
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = pdfFileName;
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
        throw new Error(`Error en la solicitud: ${response.status}`);     
       }
    } catch (error) {
      setErrorMessage(`Error en la solicitud: ${error.message}`);;
    } finally {
      setFormData({});
    }
  };



  // Función para cargar datos en la tabla
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/Network/List";

    let options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDb(res.response); // Store data in the 'db' state
        setErrorMessage(null); // Clear errors
      } else {
        setDb([]); // Set an empty array in 'db' in case of an error
        setErrorMessage(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); // Set 'loading' to false after data is loaded
    });
  };

  useEffect(() => {
    loadTableData(); // Carga los datos iniciales cuando el componente se monta
  }, []);


  // Function to update an existing instructor
  const updateData = (data) => {
    const urlPost = "https://www.cupibudget.somee.com/api/PDFGenerator/Generate";

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
        setErrorMessage(res);
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
    <div className="content">

      <div className="containerButtons">
      
        <button className="btn addButton btn-generate" onClick={generateBudget}>
          Generar Reporte
        </button>

      </div>

      { !loading && !errorMessage && db && (
      <CrudTable
        data={db}
        setDataToEdit={setDataToEdit}
        updateData={updateData}
        handleFormChange={handleFormChange}
        formData={formData} />
      )}
      
      <div className="loader">
      {loading && <Loader />}

      {errorMessage && (
        <Message msg={`${errorMessage}`} bgColor="#dc3545" />
      )}
      </div>

    </div>
  );
};

export default BudgetGenerator;
