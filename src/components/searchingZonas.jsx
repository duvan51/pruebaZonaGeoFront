import { useEffect, useState } from "react";
import { searchZonas } from "../api/api.js"; 


const BuscadorZonas = ({onSelectZona}) => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);



  useEffect(() => {
    const temp = setTimeout(() => {
      if (busqueda.trim() !== "") {
        searchZonas(busqueda).then(setResultados);
      } else {
        setResultados([]); 
      }
    }, 400); 

    return () => clearTimeout(temp);
  }, [busqueda]);





  return (
    <div className="w-full position-relative">
        <label className="input w-full h-12">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input
                type="text"
                placeholder="Buscar zonas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
        />
        </label>

        <div className="h-auto bg-white position-absolute max-h-60 overflow-y-auto mt-1 w-full rounded-lg shadow-lg z-10">
            <ul className="flex flex-col gap-2 px-4  ">
                {Array.isArray(resultados) &&
                    resultados.map((zona) => (
                        <li
                        key={zona.id}
                        onClick={() => onSelectZona(zona)}
                        className="border-b-2 py-2  px-2 cursor-pointer hover:text-gray-500 transition"
                      >
                        {zona.nombre}
                      </li>
            ))}
            </ul>
        </div>

        
    </div>
  );
};


export default BuscadorZonas;