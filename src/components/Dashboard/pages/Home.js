import React, { useEffect, useState } from "react";
import * as FaIcons from 'react-icons/fa6';
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "./Loader";


const redirectToInstructoresPlanta = () => {
  window.location.href = 'CrudAppFullTimeInstructor';
};

const redirectToInstructoresContratistas = () => {
  window.location.href = 'CrudApp';
};

const redirectToReporte = () => {
  window.location.href = 'BudgetGenerator';
};

const Home = () => {
  const urlGet = "https://www.cupibudget.somee.com/api/ContractInstructor/List";
  const urlGetContract = "https://www.cupibudget.somee.com/api/FullTimeInstructor/List";
  const urlGetPrograms = "https://www.cupibudget.somee.com/api/TrainingProgram/List";
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRecordsContract, setTotalRecordsContract] = useState(0);
  const [totalRecordsPrograms, setTotalRecordsPrograms] = useState(0);
  const token = localStorage.getItem('jwtToken');
  let api = helpHttp();
  const [loading, setLoading] = useState(true);

  const options = {
    headers: { 'Authorization': `Bearer ${token}` },
  };

  useEffect(() => {
    setLoading(true);
  
    api.get(urlGet, options)
      .then((res) => {
        if (!res.err) {
          setTotalRecordsContract(res.response.length);
        } else {
          console.error("Error in API response");
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  
    api.get(urlGetContract, options)
      .then((res) => {
        if (!res.err) {
          setTotalRecords(res.response.length);
        } else {
          console.error("Error in API response");
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  
    api.get(urlGetPrograms, options)
      .then((res) => {
        if (!res.err) {
          setTotalRecordsPrograms(res.response.length);
        } else {
          console.error("Error in API response");
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [urlGet, urlGetContract, urlGetPrograms]);

  let role = "";

  function isTokenExpired(token) {
    const arrayToken = token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role =
      tokenPayload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    return Math.floor(new Date().getTime / 1000) >= tokenPayload?.sub;
  }

  isTokenExpired(token);
  return (
    <>
      <main className='main-container'>
        <div className='main-title'>
          <h3>TABLERO GENERAL</h3>
        </div>
        {loading ? (
          <Loader /> // Display Loader when loading is true
        ) : (
          <div className='main-cards'>
            <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Instructores de planta</h3>
                    <div style={{ fontSize:"30px", marginLeft:"8vh"}}><FaIcons.FaClipboardUser/></div>
                </div>
                <h1 style={{ color: 'black' }}>{totalRecords}</h1>
            </div>
            <div className='card' onClick={redirectToInstructoresPlanta} style={{cursor:"pointer"}} >
                <div className='card-inner'>
                <h3 style={{ marginLeft:"4vh"}}>Ir a instructores de planta</h3>
                    <div style={{ fontSize:"30px", marginLeft:"8vh"}}><FaIcons.FaArrowRightToBracket/></div>
                </div>
                <p style={{marginTop:"10px", marginRight:"10px"}}>Visualiza, edita o elimina información de instructor.</p>
            </div>
            
            
            <div className='card'>
                <div className='card-inner'>
                    <h3>Programas</h3>
                    <div style={{ fontSize:"30px", marginLeft:"8vh"}}><FaIcons.FaFileContract/></div>
                </div>
                <h1 style={{ color: 'black' }}>{totalRecordsPrograms}</h1>
            </div>

            <div className='card' onClick={redirectToInstructoresContratistas} style={{cursor:"pointer"}}>
                <div className='card-inner'>
                <h3 style={{ marginLeft:"2vh"}}>Ir a instructores de contrato</h3>
                    <div style={{ fontSize:"30px", marginLeft:"8vh"}}><FaIcons.FaArrowRightToBracket/></div>
                </div>
                <p style={{marginTop:"10px", marginRight:"10px"}}>Visualiza, edita o elimina información de instructor.</p>
            </div>
            
            
            
            <div className='card'>
                <div className='card-inner'>
                    <h3>Instructores de contrato</h3>
                    <div style={{ fontSize:"30px", marginLeft:"8vh"}}><FaIcons.FaClipboardUser/></div>
                </div>
                <h1 style={{ color: 'black' }}>{totalRecordsContract}</h1>
            </div>
            {role==='Admin' && (
            <>
            <div className='card' onClick={redirectToReporte} style={{cursor:"pointer"}}>
                <div className='card-inner'>
                    <h3 style={{ marginLeft:"5vh"}}>Programación</h3>
                    <div style={{ fontSize:"30px", marginLeft:"3vh"}}><FaIcons.FaArrowRightToBracket/></div>
                </div>
                <p style={{marginTop:"10px"}}>Puedes generar un reporte PDF</p>                
            </div> 
            </>  
            )}
        </div>
          </div>
        )}
      </main>
    </>
  );
 
  
  
  

};

    
  export default Home;


