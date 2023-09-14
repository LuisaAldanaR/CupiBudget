import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm"; // Importa el componente de formulario
import CrudTable from "./CrudTable"; // Importa el componente de tabla
import { helpHttp } from "../../helpers/helpHttp"; // Ajusta la ruta de importación
import Loader from "./Loader"; // Importa el componente de carga
import Message from "./Message"; // Importa el componente de mensajes
import "./main.css";
import Swal from 'sweetalert2';



const CrudApp = () => {
  const [db, setDb] = useState([]); // Estado para almacenar los datos de instructores
  const [dataToEdit, setDataToEdit] = useState(null); // Estado para datos de edición
  const [error, setError] = useState(null); // Estado para gestionar errores
  const [loading, setLoading] = useState(true); // Estado para mostrar una carga en progreso

  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [showRecords, setShowRecords] = useState(true); // Estado para mostrar registros

  let api = helpHttp(); // Instancia de la utilidad de solicitud HTTP

  useEffect(() => {
    loadTableData(); // Cuando el componente se monta, carga los datos iniciales
  }, []);

  // Función para cargar los datos de la tabla
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/ContractInstructor/List";

    api.get(urlGet).then((res) => {
      if (!res.err) {
        setDb(res.response); // Almacena los datos en el estado 'db'
        setError(null); // Limpia los errores
      } else {
        setDb([]); // Establece un arreglo vacío en 'db' en caso de error
        setError(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); // Establece 'loading' en falso después de cargar los datos
    });
  };

  // Función para crear un nuevo instructor
  const createData = (data) => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Save";

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(urlPost, options).then((res) => {
      if (!res.err) {
        // Después de agregar un registro, recarga los datos
        loadTableData();
      } else {
        setError(res);
      }
    });
  };

  // Función para actualizar un instructor existente
  const updateData = (data) => {
    let urlPut = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Edit";

    let options = { body: data, headers: { "content-type": "application/json" } };

    api.put(urlPut, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) =>
          el.idInstructor === data.idInstructor ? data : el
        );
        setDb(newData); // Actualiza 'db' con los nuevos datos
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (idInstructor, data) => {
    // Usa SweetAlert para mostrar un cuadro de diálogo de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de eliminar al Instructor: '${data.name}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let urlDel = "http://www.mendezmrf10.somee.com/api/ContractInstructor/Delete";
        let endPoint = `${urlDel}/${idInstructor}`;
  
        let options = { headers: { "content-type": "application/json" } };
  
        api.del(endPoint, options).then((res) => {
          if (!res.err) {
            let newData = db.filter((el) => el.idInstructor !== idInstructor);
            setDb(newData); // Actualiza 'db' eliminando el instructor
            
            // Muestra un mensaje SweetAlert de éxito
            Swal.fire(
              '¡Eliminado!',
              'El registro ha sido eliminado exitosamente.',
              'success'
            );
          } else {
            setError(res);
          }
        });
      }
    });
  };
  

  const showFormView = () => {
    setShowForm(true);
    setShowRecords(false);
    if (dataToEdit) {
      setDataToEdit(null);
    }
  };

  return (
    <div>
      {showRecords && (
        <>
          <h3 className="h3Table">Instructores Contratistas</h3>
          <div className="containerButtons">
            <button className="btn addButton" onClick={showFormView}>
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
