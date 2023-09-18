import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm"; // Import the form component
import CrudTable from "./CrudTable"; // Import the table component
import { helpHttp } from "../../helpers/helpHttp"; // Adjust the import path
import Loader from "./Loader"; // Import the loader component
import Message from "./Message"; // Import the message component
import "./main.css";
import Swal from 'sweetalert2';

const CrudAppFullTimeInstructor = () => {
  const [db, setDb] = useState([]); // State to store instructor data
  const [dataToEdit, setDataToEdit] = useState(null); // State for edit data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State to show loading state

  const [showForm, setShowForm] = useState(false); // State to show the form
  const [showRecords, setShowRecords] = useState(true); // State to show records

  let api = helpHttp(); // Instance of the HTTP request utility

  useEffect(() => {
    loadTableData(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/List";

    api.get(urlGet).then((res) => {
      if (!res.err) {
        setDb(res.response); // Store the data in the 'db' state
        setError(null); // Clear errors
      } else {
        setDb([]); // Set an empty array in 'db' in case of an error
        setError(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); // Set 'loading' to false after loading the data
    });
  };

  // Function to create a new instructor
  const createData = (data) => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Save";
  
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
    let urlPut = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Edit";

    let options = { body: data, headers: { "content-type": "application/json" } };

    api.put(urlPut, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) =>
          el.idInstructor === data.idInstructor ? data : el
        );
        setDb(newData); // Update 'db' with the new data
      } else {
        setError(res);
      }
    });
  };

  // Function to delete an instructor
const deleteData = (idInstructor, data) => {
  // Use SweetAlert to show a confirmation dialog
  Swal.fire({
    title: '¿Estás seguro?', // Translate: Are you sure?
    text: `¿Estás seguro de eliminar al Instructor: '${data.name}'?`, // Translate: Are you sure you want to delete Instructor: '${data.name}'?
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo', // Translate: Yes, delete it
    cancelButtonText: 'Cancelar', // Translate: Cancel
  }).then((result) => {
    if (result.isConfirmed) {
      let urlDel = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Delete";
      let endPoint = `${urlDel}/${idInstructor}`;

      let options = { headers: { "content-type": "application/json" } };

      api.del(endPoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.idInstructor !== idInstructor);
          setDb(newData); // Update 'db' by removing the instructor

          // Show a success SweetAlert message
          Swal.fire(
            '¡Eliminado!', // Translate: Deleted!
            'El registro ha sido eliminado exitosamente.', // Translate: The record has been successfully deleted.
            'success'
          );
        } else {
          setError(res);
        }
      });
    }
  });
};

  // Functions to control views
  const showFormViewFullTimeInstructor = () => {
    setShowForm(true);
    setShowRecords(false);
    if (dataToEdit) {
      setDataToEdit(null);
    }
  };

  const showTable = () => {
    setShowForm(false);
    setShowRecords(true);
  };

  return (
    <div>
      {showRecords && (
        <>
          <h3 className="h3Table">Instructores de Planta</h3>
          <div className="containerButtons">
            <button className="btn addButton" onClick={showFormViewFullTimeInstructor}>
              Registrar Nuevo Instructor
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
          showFormViewFullTimeInstructor={showFormViewFullTimeInstructor}
        />
      )}
  
      {loading && <Loader />}
  
      {error && (
        <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
      )}
    </div>
  );
};

export default CrudAppFullTimeInstructor;
