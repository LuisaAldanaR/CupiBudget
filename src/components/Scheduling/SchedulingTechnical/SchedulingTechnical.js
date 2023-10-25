import React , {useEffect, useState} from 'react';
import { helpHttp } from '../../../helpers/helpHttp';
import CrudTable from '../SchedulingTechnical/CrudTable';
import CrudTableVirtual from './CrudTableVirtual';
import Loader from "./Loader"; // Import the loader component
import Message from "./Message"; // Import the message component

const SchedulingTechnological = () => {

    // States for storing instructor data, edit data, errors, etc.
  const [db, setDb] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 


  // States from virtual levels
  const [dbVirtual, setDbVirtual] = useState([]); 
  const [errorVirtual, setErrorVirtual] = useState(null); 
  const [loadingVirtual, setLoadingVirtual] = useState(true); 
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const token = localStorage.getItem('jwtToken'); // Recupera el token JWT del almacenamiento local
  let api = helpHttp(); // Instance of the HTTP request utility

  useEffect(() => {
    loadTableData(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/TrainingProgram/ListTechnicalInPerson";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
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
    loadTableDataVirtual(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableDataVirtual = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/TrainingProgram/ListTechnicalVirtual";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
    };
    
    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDbVirtual(res.response); // Store data in the 'db' state
        setErrorVirtual(null); // Clear errors
      } else {
        setDbVirtual([]); // Set an empty array in 'db' in case of an error
        setErrorVirtual(`Error ${res.status}: ${res.statusText}`);
      }

      setLoadingVirtual(false); // Set 'loading' to false after data is loaded
    });
  };

    // Search Func

    const searcher = (e) => {
      setSearch(e.target.value);
      console.log(e.target.value);
    }
  
    // Filter Method
  
    const results = !search ? db : db.filter((info)=> info.name.toLowerCase().includes(search.toLowerCase()))
    const clearInput = () => {
      document.getElementById('mysearch').value = '';
      setSearch(''); // Restablece la búsqueda a una cadena vacía
    };
  
    
  
    const toggleSearch = () => {
      setShowSearch(!showSearch); // Alternar la visibilidad de la barra de búsqueda
    };

    return (  
        <div className='content'>
            <h1 className='h3Table'>Técnico Presencial</h1>
            <div className={`searchBar ${showSearch ? 'active' : ''}`}>
          </div>

            {!loading && !error && db && (
                <CrudTable
                    data={results}
                />
            )}

            <h1 className='h3Table'>Técnico Virtual</h1>

            {!loading && !errorVirtual && db && (
                <CrudTableVirtual
                    data={dbVirtual}
                />
            )}

            <div className="loader">
                {loading && <Loader />}

                {error && (
                    <Message msg={`${error}`} bgColor="#dc3545" />
                )}
            </div>

        </div>
    );
}
 
export default SchedulingTechnological;