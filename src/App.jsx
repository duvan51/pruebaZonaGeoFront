import { useState } from 'react'
import './App.css'
import MapView from './views/mapView'
import CreateZonas from './components/createZonas'
import SearchingZonas from './components/searchingZonas'





function App() {

  const [zonaData, setZonaData] = useState(null);
  const [zonaSelect, setZonaSelect] = useState(null);
  
  
  const handleZonaSeleccionada = (zona) => {
    console.log("Zona seleccionada:", zona);
    setZonaSelect(zona);
  };

  console.log(zonaSelect)


  return (
  <div className='w-min-full  bg-[#072042] p-6 contenedor'
    style={{
      padding: '24px', 
    
    }}
    >
    <div className='w-autoflex flex h-full'>
      <div className='w-1/3 h-auto flex flex-col justify-around'
        style={{
        paddingLeft: '24px', 
        paddingRight: '24px', 
        }}
      >
        <div className='w-full'>
          <SearchingZonas onSelectZona={handleZonaSeleccionada}  />
        </div>


        <div className=''>
          <div>

          </div>
        </div>

        <div className='text-white pt-8'>
          <div className='font-bold text-xl'>ubicacion</div>
          <div>Calle 24 a sur # 38 b17- barrio alamos</div>
        </div>

        <div className='text-white pt-8'>
          <div className='font-bold text-xl'> {zonaSelect?.nombre} </div>
          <div className=''>
            <div className='font-bold'>Horarios de atencion</div>

            <div>
              Lunes : 6:00 am - 12:00 pm
            </div>
            <div>
              Martes : 6:00 am - 12:00 pm
            </div>
            <div>
              Miercoles : 6:00 am - 12:00 pm
            </div>
            <div>
              Jueves : 6:00 am - 12:00 pm
            </div>
            <div>
              Viernes : 6:00 am - 12:00 pm
            </div>
            <div>
              Sabado : 6:00 am - 12:00 pm
            </div>
            <div>
              Domingo : 6:00 am - 12:00 pm
            </div>

          </div>

        </div>


        <div className='w-full flex justify-center'>
          <CreateZonas zonaData={zonaData} />
          <button 
            className="btn btn-active btn-warning text-white bg-yellow-600 px-2" 
            onClick={()=>document.getElementById('my_modal_1').showModal()}
          >
            Crear Zona
          </button>
        </div>
        

      </div>  
    <div className='w-2/3 h-full'>
      <MapView  onZonaSelect={setZonaData} />
    </div>
  </div>
</div>
  ) 
}

export default App
