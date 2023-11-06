import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm"; // Import the form component
import CrudTable from "./CrudTable"; // Import the table component
import { helpHttp } from "../../helpers/helpHttp"; // Adjust the import path
import Loader from "./Loader"; // Import the loader component
import Message from "./Message"; // Import the message component
import "../../App.scss";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function show_alerta(mensaje, icono, foco = '') {
  onfocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono
  })
}

function onfocus(foco) {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
}


const CrudApp = () => {
  // States for storing instructor data, edit data, errors, etc.
  const [db, setDb] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  // States for showing/hiding the form and records
  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(true);

  const token = localStorage.getItem('jwtToken'); // Recupera el token JWT del almacenamiento local
  let api = helpHttp(); // Instance of the HTTP request utility

  useEffect(() => {
    loadTableData(); // Load initial data when the component mounts
    loadNetworkOptions();
  }, []);


   // Función para cargar las opciones de red desde la API
   const loadNetworkOptions = () => {
    const urlNetwork = "https://www.cupibudget.somee.com/api/Network/List";
    const options = {
      headers: {'Authorization': `Bearer ${token}`},
    };

    api.get(urlNetwork, options).then((res) => {
      if (!res.err) {
        setNetworkOptions(res.response);
      } else {
        console.error("Error al obtener las opciones de red:", res.err);
      }
    });
  };

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/ContractInstructor/List";

    let options = {
      headers: { 'Authorization': `Bearer ${token}`, },
    };

    api.get(urlGet, options).then((res) => {
      if (!res.err) {

        try {
          setDb(res.response);
          setTotalRecords(res.response.length);
          setError(null);
        } catch (error) {
          show_alerta('Error: Revisa tu conexión a Internet', 'error');
        }
      } else {
        setDb([]); // Set an empty array in 'db' in case of an error
        setTotalRecords(0);
      }

      setLoading(false); // Set 'loading' to false after data is loaded
    });
  };

  // Function to create a new instructor

  const createData = (data) => {
    console.log(data);
    let urlPost = "https://www.cupibudget.somee.com/api/ContractInstructor/Save";

    let options = {
      body: data,
      headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, },
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

        show_alerta('Acceso denegado', 'error');
      }
    });
  };

  // Function to update an existing instructor
  const updateData = (data) => {
    let urlPut = "https://www.cupibudget.somee.com/api/ContractInstructor/Edit";

    let options =
    {
      body: data, headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, },
    };

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
          loadTableData();
          showTable();
        });
      } else {

        show_alerta('Acceso denegado', 'error');
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
        let urlDel = "https://www.cupibudget.somee.com/api/ContractInstructor/Delete";
        let endPoint = `${urlDel}/${idInstructor}`;

        let options =
        {
          headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, },
        };

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

            show_alerta('Acceso denegado', 'error');
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

    <div className="content">
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
          showTable={showTable}
          networkOptions={networkOptions}
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
      <div className="loader">
        {loading && <Loader />}

        {error && (
          <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
        )}
      </div>
    </div>
  );
};

export default CrudApp;
