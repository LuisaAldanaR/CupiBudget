import React from 'react';
import * as FaIcons from 'react-icons/fa6';

const Home = () => {
  return (
    <main className='main-container'>
      <div className='main-title' style={{ marginBottom: '50px', marginTop:"-60px" }}>
        <h3 className='main-title'>TABLERO GENERAL</h3>
      </div>

      <div className='main-cards'>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>INSTRUCTORES DE PLANTA</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "16rem", marginTop: '8px'}}  />
          </div>
          <h1 style={{ color: 'black' }}>47</h1>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>INSTRUCTORES DE CONTRATO</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black', marginLeft: "16rem", marginTop: '8px'}}  />
          </div>
          <h1 style={{ color: 'black' }}>4</h1>
        </div>
        <div className='card1'>
          <div className='card-inner'> 
            <p style={{ color: 'black', fontSize: "20px", fontWeight: "bold" }}>REPORTE</p>
            <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "16rem", marginTop: '8px'}}  />
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <p className='card-description' > Generar reporte </p>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontWeight: "bold"  }}>PROGRAMAS</p>
            <FaIcons.FaFileContract className='card_icon' style={{ color: 'black', marginLeft: "16rem", marginTop: '8px'}} />
          </div>
          <h1 style={{ color: 'black' }}>120</h1>
        </div>

     
        
        

        <div className='shortcuts'>
        <div className='card-special'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES DE PLANTA</p>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "37rem", marginTop: '8px' }} />
          </div>
          <p className='card-description' >Visualiza, elimina o edita información de instructor.</p>
        </div>

        <div className='card-go'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES CONTRATISTAS</p>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginLeft: "37rem", marginTop: '8px' }} />
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
