import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import "../../App.scss";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function show_alerta(mensaje, icono, foco='')
{
  onfocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title:mensaje,
    icon:icono
  })
}

function onfocus(foco)
{
  if(foco !== '')
  {
    document.getElementById(foco).focus();
  }
}


const CrudAppFullTimeInstructor = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const token = localStorage.getItem('jwtToken');
  let api = helpHttp();

  

  useEffect(() => {
    loadTableData();
  }, []);

  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/List";

  let options = {
    headers: {'Authorization': `Bearer ${token}`, },   
  };

  api.get(urlGet, options).then((res) => {
    if (!res.err) {
      setDb(res.response);

      // Verifica si totalRecords se establece correctamente
      console.log("Total de registros:", res.response.length);

      setTotalRecords(res.response.length);
      setError(null);
    } else {
      setDb([]);
      setTotalRecords(0);
      setError(`Error ${res.status}: ${res.statusText}`);
    }

    setLoading(false);
  });
};

  const createData = (data) => {
    let urlPost = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Save";
  
    let options = {
      body: data,
      headers: { "content-type": "application/json",'Authorization': `Bearer ${token}`, },
    };
  
    api.post(urlPost, options).then((res) => {
      if (!res.err) {
        Swal.fire({
          title: '¡Agregado!',
          text: 'El registro ha sido agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          showTable();
        });
  
        loadTableData();
      } else {
        
        show_alerta('Acceso denegado', 'error');
      }
    });
  };

  const updateData = (data) => {
    let urlPut = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Edit";
  
    let options = { body: data, headers: { "content-type": "application/json" ,'Authorization': `Bearer ${token}`,} };
  
    api.put(urlPut, options).then((res) => {
      if (!res.error) {
        Swal.fire({
          title: '¡Editado!',
          text: 'El registro ha sido editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          let newData = db.map((el) =>
            el.idInstructor === data.idInstructor ? data : el
          );
          setDb(newData);
          showTable();
        });
      } else {
       
        show_alerta('Acceso denegado', 'error');
      }
    });
  };

  const deleteData = (idInstructor, data) => {
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
        let urlDel = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/Delete";
        let endPoint = `${urlDel}/${idInstructor}`;
  
        let options = { headers: { "content-type": "application/json",'Authorization': `Bearer ${token}`, } };
  
        api.del(endPoint, options).then((res) => {
          if (!res.err) {
            let newData = db.filter((el) => el.idInstructor !== idInstructor);
            setDb(newData);
  
            Swal.fire(
              '¡Eliminado!',
              'El registro ha sido eliminado exitosamente.',
              'success'
            );
          } else {
            
            show_alerta('Acceso denegado', 'error');
          }
        });
      }
    });
  };

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

  if (loading) {
    return <Loader />;
  }
  
  if (error) {
    return <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />;
  }

  return (
    <div className="content">
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
          showTable={showTable}
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
  
      <div className="loader">
        {loading && <Loader />}
  
        {error && (
          <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
        )}
      </div>

      

    </div>
  );
};

export default CrudAppFullTimeInstructor;
