import React from 'react'
import * as FaIcons from "react-icons/fa6";

const Home = () => {
  return (
    <main className='main-container'>
        <div className='main-title'>
          <h3>
            DASHBOARD
          </h3>
        </div>

        <div className='main-cards'>
          <div className='card'>
              <div className='card-inner'>
                    <p>INSTRUCTORES DE PLANTA</p>
                    <FaIcons.FaClipboardUser className='card_icon'/>
              </div>
              <h1>300</h1>
           </div>
           <div className='card'>
              <div className='card-inner'>
              <p>INSTRUCTORES DE CONTRATO</p>
                    <FaIcons.FaClipboardUser className='card_icon'/>
              </div>
              <h1>200</h1>
           </div>
           <div className='card'>
              <div className='card-inner'>
              <p>PROGRAMAS</p>
                    <FaIcons.FaFileContract className='card_icon'/>
              </div>
              <h1>120</h1>
           </div>
        </div>

        <div className='shortcuts'>

        </div>
    </main>
  )
}

export default Home