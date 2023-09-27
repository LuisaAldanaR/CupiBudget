import React from 'react';
import * as FaIcons from 'react-icons/fa6';

const Home = () => {
  return (
    <main className='main-container'>
      <div className='main-title' style={{ marginBottom: '70px' }}>
        <h3>TABLERO GENERAL</h3>
      </div>

      <div className='main-cards'>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black' }}>INSTRUCTORES DE PLANTA</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black' }} />
          </div>
          <h1 style={{ color: 'black' }}>47</h1>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black' }}>INSTRUCTORES DE CONTRATO</p>
            <FaIcons.FaClipboardUser className='card_icon' style={{ color: 'black' }} />
          </div>
          <h1 style={{ color: 'black' }}>4</h1>
        </div>
        <div className='card1'>
          <div className='card-inner'>
            <p style={{ color: 'black' }}>PROGRAMAS</p>
            <FaIcons.FaFileContract className='card_icon' style={{ color: 'black' }} />
          </div>
          <h1 style={{ color: 'black' }}>120</h1>
        </div>
        <div className='card-special'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES DE PLANTA</p>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginRight: '40px', marginTop: '45px' }} />
          </div>
          <p className='card-description' >Visualiza, elimina o edita información de instructor.</p>
        </div>
        
        <div className='card-go'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A INSTRUCTORES CONTRATISTAS</p>
            <FaIcons.FaArrowRightToBracket className='card_icon' style={{ color: 'black', marginRight: '40px', marginTop: '45px' }} />
          </div>
          <p className='card-description' > Visualiza, elimina o edita información de instructor.</p>
        </div>

        <div className='card-report'>
          <div className='card-inner'>
            <p style={{ color: 'black', fontSize: '18px', marginTop: '10px', fontWeight: 'bold' }}>IR A REPORTE</p>
            <FaIcons.FaSquareArrowUpRight className='icon_report' style={{ color: 'black', marginRight: '40px', marginTop: '45px' }} />
          </div>
          <p className='card-description' > Genera el reporte necesario.</p>
        </div>

      </div>

      

      <div className='shortcuts'></div>
    </main>
  );
};

export default Home;
