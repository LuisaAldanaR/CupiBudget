import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm"; // Import the form component
import CrudTable from "./CrudTable"; // Import the table component
import { helpHttp } from "../../helpers/helpHttp"; // Adjust the import path
import Loader from "./Loader"; // Import the loader component
import Message from "./Message"; // Import the message component
import "./main.css";
import Swal from 'sweetalert2';

const CrudApp = () => {
  // States for storing instructor data, edit data, errors, etc.
  const [db, setDb] = useState([]); 
  const [dataToEdit, setDataToEdit] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // States for showing/hiding the form and records
  const [showForm, setShowForm] = useState(false); 
  const [showRecords, setShowRecords] = useState(true); 

  let api = helpHttp(); // Instance of the HTTP request utility

  useEffect(() => {
    loadTableData(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/ContractInstructor/List";

    api.get(urlGet).then((res) => {
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

  // Function to create a new instructor

    const createData = (data) => {
      let urlPost = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Save";
    
      let options = {
        body: data,
        headers: { "content-type": "application/json" },
      };
    
      api.post(urlPost, options).then((res) => {
        if (!res.err) {
          // Show a success SweetAlert message for the record addition
          Swal.fire({
            title: '¡Agregado!', // Translate: Added!
            text: 'El registro ha sido agregado exitosamente.', // Translate: The record has been successfully added.
            icon: 'success',
            confirmButtonText: 'OK', // Translate: OK
          }).then(() => {
            // After the user clicks OK in the success message, redirect to the table view
            showTable();
          });
    
          // After adding a record, reload the data
          loadTableData();
        } else {
          setError(res);
        }
      });
    };

  // Function to update an existing instructor
  const updateData = (data) => {
    let urlPut = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Edit";
  
    let options = { body: data, headers: { "content-type": "application/json" } };
  
    api.put(urlPut, options).then((res) => {
      if (!res.error) { // Corregir la verificación de error
        Swal.fire({
          title: '¡Editado!', // Corregir el mensaje de éxito
          text: 'El registro ha sido editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          let newData = db.map((el) =>
            el.idInstructor === data.idInstructor ? data : el
          );
          setDb(newData); // Actualizar 'db' con los nuevos datos
          showTable();
        });
      } else {
        setError(res);
      }
    });
  };
  
  

  // Function to delete an instructor
  const deleteData = (idInstructor, data) => {
    // Use SweetAlert to show a confirmation dialog
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas seguro de borrar al Instructor: '${data.name}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        let urlDel = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Delete";
        let endPoint = `${urlDel}/${idInstructor}`;
  
        let options = { headers: { "content-type": "application/json" } };
  
        api.del(endPoint, options).then((res) => {
          if (!res.err) {
            let newData = db.filter((el) => el.idInstructor !== idInstructor);
            setDb(newData); // Update 'db' by removing the instructor
            
            // Show a success SweetAlert message
            Swal.fire(
              'Borrado!',
              'El registro fue borrado exitosamente.',
              'success'
            );
          } else {
            setError(res);
          }
        });
      }
    });
  };
  
  // Function to show the form
  const showFormView = () => {
      if (dataToEdit) {
      setDataToEdit(null);
    }
    setShowForm(true);
    setShowRecords(false);
  
  };

  // Function to show the record table
  const showTable = () => {
    setShowForm(false);
    setShowRecords(true);
  };

  return (
    <div>
      {showRecords && (
        <>
          <h3 className="h3Table">Instructores Contratistas</h3>
          <div className="containerButtons">
            <button className="btn addButton" onClick={showFormView}>
              Registar Nuevo Instructor
            </button>
          </div>
        </>
      )}

      {showForm && (
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          showTable={showTable} // Pass the showTable function to the CrudForm component
        />
      )}

      {showRecords && !loading && !error && db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          showFormView={showFormView}
        />
      )}

      {loading && <Loader />}

      {error && (
        <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
      )}
    </div>
  );
};

export default CrudApp;
