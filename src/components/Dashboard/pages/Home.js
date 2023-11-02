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
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRecordsContract, setTotalRecordsContract] = useState(0);
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
          setTotalRecords(res.response.length);
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

    api.get(urlGetContract, options)
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
  }, [urlGet, urlGetContract]);

  return (
    <main className='main-container'>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
    
      <div className='main-title' style={{ marginBottom: '50px', marginTop:"-60px" }}>
        <h3 className='main-title' style={{fontSize: "3vh"}}>TABLERO GENERAL</h3>
      </div>

      {loading ? (
        <Loader /> // Display Loader when loading is true
      ) : (
        <div className='main-cards'>
          <div className='card1'>
            <div className='card-inner'>
              <p style={{ color: 'black', fontWeight: "bold", fontSize: "2vh"  }}>INSTRUCTORES DE PLANTA</p>
              <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '8px'}}  />
            </div>
            <h1 style={{ color: 'black' }}>{totalRecordsContract}</h1>
          </div>
          <div className='card1'>
            <div className='card-inner'>
              <p style={{ color: 'black', fontWeight: "bold", fontSize: "2vh"  }}>INSTRUCTORES DE CONTRATO</p>
              <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '8px'}}  />
            </div>
            <h1 style={{ color: 'black' }}>{totalRecords}</h1>
          </div>
          <div className='card1' onClick={redirectToReporte} style={{cursor:"pointer"}}>
            <div className='card-inner' > 
              <p style={{ color: 'black', fontSize: "2vh", fontWeight: "bold"  }}>PROGRAMACIÓN</p>
              <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '5vh'}}  />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <p className='card-description' style={{marginTop:"0.5vh"}}> Puedes generar un reporte PDF</p>
          </div>
          <div className='card1'>
            <div className='card-inner'>
              <p style={{ color: 'black', fontWeight: "bold", fontSize: "2vh" }}>PROGRAMAS</p>
              <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '1vh'}} />
            </div>
            <h1 style={{ color: 'black' }}>120</h1>
          </div>
          <div className='shortcuts' >
            <div className='card-special'  onClick={redirectToInstructoresPlanta} style={{cursor:"pointer"}}>
              <div className='card-inner' >
                <a  style={{ color: 'black',  marginTop: '2vh', fontWeight: 'bold', fontSize:"2vh" }}>IR A INSTRUCTORES DE PLANTA</a>
               
              </div>
              <p className='card-description' style={{fontSize:"1.4vh", marginTop:"20px"}} >Visualiza, elimina o edita información de instructor.  <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "17vh", marginTop: '4vh', fontSize:"2vh" }} /></p>
            </div>
          
            <div className='card-go'  onClick={redirectToInstructoresContratistas} style={{cursor:"pointer"}}>
              <div className='card-inner' >
                <a  style={{ color: 'black',  marginTop: '2vh', fontWeight: 'bold', fontSize:"2vh" }}>IR A INSTRUCTORES CONTRATISTAS</a>
               
              </div>
              <p className='card-description' style={{fontSize:"1.4vh", marginTop:"20px"}} >Visualiza, elimina o edita información de instructor. <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "17vh", marginTop: '4vh', fontSize:"2vh" }} /></p>
            </div>
          </div>
        </div>
      )}
      <div className='shortcuts'></div>
    </main>
    
  );

};
    
  export default Home;