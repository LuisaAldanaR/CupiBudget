import React , {useEffect, useState} from 'react';
import { helpHttp } from '../../../helpers/helpHttp';
import CrudTable from '../SchedulingTechnical/CrudTable';
import CrudTableVirtual from './CrudTableVirtual';
import Loader from "./Loader"; 
import Message from "./Message"; 

const SchedulingTechnological = () => {
  const [db, setDb] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 


  // States from virtual levels
  const [dbVirtual, setDbVirtual] = useState([]); 
  const [errorVirtual, setErrorVirtual] = useState(null); 
  const [loadingVirtual, setLoadingVirtual] = useState(true); 
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const token = localStorage.getItem('jwtToken'); 
  let api = helpHttp(); 

  useEffect(() => {
    loadTableData(); 
  }, []);

  // Function to load table data of List Technical InPerson
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/TrainingProgram/ListTechnicalInPerson";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
    };
    
    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDb(res.response); 
        setError(null); 
      } else {
        setDb([]); 
        setError(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); 
    });
  };

  useEffect(() => {
    loadTableDataVirtual(); 
  }, []);

  // Function to load table data List Technical Virtual
  const loadTableDataVirtual = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/TrainingProgram/ListTechnicalVirtual";

    let options = {
      headers: {'Authorization': `Bearer ${token}`, },   
    };
    
    api.get(urlGet, options).then((res) => {
      if (!res.err) {
        setDbVirtual(res.response); 
        setErrorVirtual(null); 
      } else {
        setDbVirtual([]); 
        setErrorVirtual(`Error ${res.status}: ${res.statusText}`);
      }

      setLoadingVirtual(false); 
    });
  };

    // Search Function

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
      setShowSearch(!showSearch); 
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