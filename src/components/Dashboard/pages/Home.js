import React, { useEffect, useState } from "react";
import * as FaIcons from 'react-icons/fa6';
import { helpHttp } from "../../../helpers/helpHttp";


const redirectToInstructoresPlanta = () => {
  // Redirigir a la sección de Instructores de Planta
  window.location.href = 'CrudAppFullTimeInstructor';
};

const redirectToInstructoresContratistas = () => {
  // Redirigir a la sección de Instructores Contratistas
  window.location.href = 'CrudApp';
};

const redirectToReporte = () => {
  // Redirigir a la sección de Instructores Contratistas
  window.location.href = 'BudgetGenerator';
};



const Home = () => {

  const urlGet = "http://www.mendezmrf10.somee.com/api/FullTimeInstructor/List";
  const urlGetContract = "http://www.mendezmrf10.somee.com/api/ContractInstructor/List";
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRecordsContract, setTotalRecordsContract] = useState(0);
  const token = localStorage.getItem('jwtToken');
  let api = helpHttp();

  const options = {
    headers: { 'Authorization': `Bearer ${token}` },
  };

  api.get(urlGet, options)
    .then((res) => {
      if (!res.err) {
        // Supongo que setDb, setTotalRecords y setError son funciones que se utilizan para actualizar el estado en tu aplicación.
        // Asegúrate de que estas funciones estén definidas y funcionen correctamente.

        // Verifica si totalRecords se establece correctamente
        

        setTotalRecords(res.response.length);
      } else {
        // Si hay un error en la respuesta de la API, maneja el error aquí.
      }
    })
    .catch((error) => {
      // Maneja los errores de la solicitud aquí.
      console.error(error);
    });

    api.get(urlGetContract, options)
    .then((res) => {
      if (!res.err) {
        // Supongo que setDb, setTotalRecords y setError son funciones que se utilizan para actualizar el estado en tu aplicación.
        // Asegúrate de que estas funciones estén definidas y funcionen correctamente.

        // Verifica si totalRecords se establece correctamente
        

        setTotalRecordsContract(res.response.length);
      } else {
        // Si hay un error en la respuesta de la API, maneja el error aquí.
      }
    })
    .catch((error) => {
      // Maneja los errores de la solicitud aquí.
      console.error(error);
    });


  return (
    <main className='main-container'>
      <div className='main-title' style={{ marginBottom: '50px', marginTop:"-60px" }}>
        <h3 className='main-title'>TABLERO GENERAL</h3>
      </div>

      <div className='main-cards'>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>INSTRUCTORES DE PLANTA</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '8px'}}  />
          </div>
          <h1 style={{ color: 'black' }}>{totalRecords}</h1>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>INSTRUCTORES DE CONTRATO</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '8px'}}  />
          </div>
          <h1 style={{ color: 'black' }}>{totalRecordsContract}</h1>
        </div>
        <div className='card1' onClick={redirectToReporte} style={{cursor:"pointer"}}>
          <div className='card-inner' > 
            <p style={{ color: 'black', fontSize: "20px", fontWeight: "bold"  }}>REPORTE</p>
            <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '5vh'}}  />
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <p className='card-description' > Puedes generar un reporte PDF</p>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>PROGRAMAS</p>
            <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "25vh", marginTop: '1vh'}} />
          </div>
          <h1 style={{ color: 'black' }}>120</h1>
        </div>

     
        


        

        <div className='shortcuts' >
        <div className='card-special'  onClick={redirectToInstructoresPlanta} style={{cursor:"pointer"}}>
          <div className='card-inner' >
            <a  style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES DE PLANTA</a>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "60vh", marginTop: '1vh' }} />
          </div>
          <p className='card-description' >Visualiza, elimina o edita información de instructor.</p>
        </div>

        <div className='card-go' onClick={redirectToInstructoresContratistas} style={{cursor:"pointer"}}>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES CONTRATISTAS</p>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "60vh", marginTop: '1vh' }} />
          </div>
          <p className='card-description' > Visualiza, elimina o edita información de instructor.</p>
        </div>
        </div>

      </div>

      <div className='shortcuts'></div>
    </main>
  );
};

export default Home;