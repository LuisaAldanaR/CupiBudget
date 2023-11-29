import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp"; 
import Swal from "sweetalert2";
import Loader from "./Loader"; 
import Message from "./Message"; 

const BudgetGenerator = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({}); 

  const token = localStorage.getItem("jwtToken"); 
  const api = helpHttp(); 
  const [pdfLink, setPdfLink] = useState(null);
  
  //This function sends a request to a server to generate a budget report based on the user-inputted data in the interface.
  const generateBudget = async () => {
    try {
      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];

      // Obtén el mes actual como una cadena (por ejemplo, "enero", "febrero", etc.)
      const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const currentMonth = monthNames[new Date().getMonth()];

      db.forEach((el) => {

        //TECHNOLOGICAL

          //INPERSON

        const totalGoalInputTechnologicalInPerson = document.getElementById(`totalGoalTechnologicalInPerson${el.idNetwork}`);
        const oldStudentsInputTechnologicalInPerson = document.getElementById(`oldStudentsTechnologicalInPerson${el.idNetwork}`);

        const totalGoalValueTechnologicalInPerson = totalGoalInputTechnologicalInPerson.value.trim() !== '' ? parseFloat(totalGoalInputTechnologicalInPerson.value) : 0;
        const oldStudentsValueTechnologicalInPerson = oldStudentsInputTechnologicalInPerson.value.trim() !== '' ? parseFloat(oldStudentsInputTechnologicalInPerson.value) : 0;
          
          //VIRTUAL

        const totalGoalInputTechnologicalVirtual = document.getElementById(`totalGoalTechnologicalVirtual${el.idNetwork}`);
        const oldStudentsInputTechnologicalVirtual = document.getElementById(`oldStudentsTechnologicalVirtual${el.idNetwork}`);

        const totalGoalValueTechnologicalVirtual = totalGoalInputTechnologicalVirtual.value.trim() !== '' ? parseFloat(totalGoalInputTechnologicalVirtual.value) : 0;
        const oldStudentsValueTechnologicalVirtual = oldStudentsInputTechnologicalVirtual.value.trim() !== '' ? parseFloat(oldStudentsInputTechnologicalVirtual.value) : 0;
        
        
        //TECHNICAL

          //INPERSON
        const totalGoalInputTechnicalInPerson = document.getElementById(`totalGoalTechnicalInPerson${el.idNetwork}`);
        const oldStudentsInputTechnicalInPerson = document.getElementById(`oldStudentsTechnicalInPerson${el.idNetwork}`);

        const totalGoalValueTechnicalInPerson = totalGoalInputTechnicalInPerson.value.trim() !== '' ? parseFloat(totalGoalInputTechnicalInPerson.value) : 0;
        const oldStudentsValueTechnicalInPerson = oldStudentsInputTechnicalInPerson.value.trim() !== '' ? parseFloat(oldStudentsInputTechnicalInPerson.value) : 0;

          //VIRTUAL

        const totalGoalInputTechnicalVirtual = document.getElementById(`totalGoalTechnicalVirtual${el.idNetwork}`);
        const oldStudentsInputTechnicalVirtual = document.getElementById(`oldStudentsTechnicalVirtual${el.idNetwork}`);
  
        const totalGoalValueTechnicalVirtual = totalGoalInputTechnicalVirtual.value.trim() !== '' ? parseFloat(totalGoalInputTechnicalVirtual.value) : 0;
        const oldStudentsValueTechnicalVirtual = oldStudentsInputTechnicalVirtual.value.trim() !== '' ? parseFloat(oldStudentsInputTechnicalVirtual.value) : 0;
        
          const rowData1 = {
          totalGoal: totalGoalValueTechnologicalInPerson,
          oldStudents: oldStudentsValueTechnologicalInPerson,
          idNetwork: Number(el.idNetwork),
        };

        const rowData2 = {
          totalGoal: totalGoalValueTechnicalInPerson, 
          oldStudents: oldStudentsValueTechnicalInPerson, 
          idNetwork: Number(el.idNetwork),
        };

        const rowData3 = {
          totalGoal: totalGoalValueTechnologicalVirtual,
          oldStudents: oldStudentsValueTechnologicalVirtual,
          idNetwork: Number(el.idNetwork),
        };

        const rowData4 = {
          totalGoal: totalGoalValueTechnicalVirtual, 
          oldStudents: oldStudentsValueTechnicalVirtual, 
          idNetwork: Number(el.idNetwork),
        };

        data1.push(rowData1);
        data2.push(rowData2);
        data3.push(rowData3);
        data4.push(rowData4);
      });

      const requestData = {
        data1,
        data2,
        data3,
        data4,
      };

      console.log(requestData);

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



  // Function to load data table
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/Network/List";

    let options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDb(res.response); 
        setErrorMessage(null); 
      } else {
        setDb([]); 
        setErrorMessage(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); 
    });
  };

  useEffect(() => {
    loadTableData();
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
          title: "Enviado!", 
          text: "Datos enviados correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          let newData = db.map((el) =>
            el.idInstructor === data.idInstructor ? data : el
          );
          setDb(newData); 
        });
      } else {
        setErrorMessage(res);
      }
    });
  };

  // Function to handle changes in form fields
  const handleFormChange = (idNetwork, name, value) => {
    const updatedFormData = { ...formData };

    const rowData = {
      ...updatedFormData[idNetwork],
      [name]: value,
    };

    updatedFormData[idNetwork] = rowData;

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