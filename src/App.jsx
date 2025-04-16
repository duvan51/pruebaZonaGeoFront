import { useEffect, useState } from "react";
import "./App.css";
import MapView from "./views/mapView";
import CreateZonas from "./components/createZonas";
import SearchingZonas from "./components/searchingZonas";
import { searchZonaById } from "./api/api";
import GeoLocalizacion from "./components/geoLocalizacion";

function App() {
  const [zonaData, setZonaData] = useState(null);
  const [zonaSelectId, setZonaSelectId] = useState("A3zRcbNcexqCZbIHRbpq");
  const [zona, setZona] = useState(null);
  const [zonaSelect, setZonaSelect] = useState(null);
  const [zonaSelectOfMap, setZonaSelectOfMap] = useState(null)





  const handleZonaSeleccionada = (zona) => {
    setZonaSelectId(zona.id); //envio el id de la zona del buscador
    setZonaSelect(zona.coordenadas) //coordenads de la zona seleccionada
  };

  useEffect(() => {
    const zona = async () => {
      if (!zonaSelectId) return;

      try {
        if(zonaSelectOfMap){
          const data = await searchZonaById(zonaSelectOfMap.id);
          setZona(data);
        } else if(zonaSelectId){
          const data = await searchZonaById(zonaSelectId);
          setZona(data);
        }
      } catch (error) {
        console.error("Error al obtener la zona:", err);
        setError(err.message || "Error inesperado");
      }
    };
    zona();
  }, [zonaSelectId, zonaSelectOfMap]);

 
 




  return (
    <div
      className="w-min-full  bg-[#072042] p-6 contenedor"
      style={{
        padding: "24px",
      }}
    >
      <div className="w-autoflex flex h-full">
        <div
          className="w-1/3 h-auto flex flex-col justify-around"
          style={{
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <div className="w-full">
            <SearchingZonas onSelectZona={handleZonaSeleccionada} />
          </div>

          <div className="">
            <div></div>
          </div>

          <div className="text-white pt-8">
            <GeoLocalizacion />
          </div>

          <div className="text-white pt-8 w-full">
            <div className="flex flex-row gap-2 items-center pb-4">
              <div className="w-4 h-4 rounded-full"
                style={{backgroundColor:`${zona?.color}`}}
              ></div>
              <div className="font-bold text-xl"> {zona?.nombre} </div>
            </div>

            <div className="">
              <div className="font-bold pb-2">Horarios de atencion</div>
              <div className="overflow-x-auto">
                <table className="table bg-white text-black">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Apertura</th>
                      <th>Cierre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zona?.horario &&
                      Object.entries(zona.horario).map(
                        ([dia, horas], index) => (
                          <tr key={dia}>
                            <th>
                              {dia.charAt(0).toUpperCase() + dia.slice(1)}
                            </th>
                            <td>{horas.apertura}</td>
                            <td>{horas.cierre}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <CreateZonas zonaData={zonaData}  />
            <button
              className="btn btn-active btn-warning text-white bg-yellow-600 px-2"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Crear Zona
            </button>
          </div>
        </div>
        <div className="w-2/3 h-full">
          <MapView onZonaSelect={setZonaData} zonaSelect={zonaSelect} onsetZonaSelectOfMap={setZonaSelectOfMap}  />
        </div>
      </div>
    </div>
  );
}

export default App;
