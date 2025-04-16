import React, { useState, useEffect } from 'react';

const GeoLocalizacion = () => {
    
  
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);


    useEffect(() => {
        if (!navigator.geolocation) {
          setError('La geolocalización no es soportada por tu navegador.');
          return;
        }
    
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            setError('No se pudo obtener la ubicación: ' + err.message);
          }
        );
      }, []);
      
      localStorage.setItem('ubicacion', JSON.stringify(coords));

   

      


  return (
    <div>
    <h2>Ubicación actual</h2>
    {error && <p>{error}</p>}
    {coords.lat && coords.lng ? (
      <p>
        Latitud: {coords.lat} <br />
        Longitud: {coords.lng}
      </p>
    ) : (
      !error && <p>Obteniendo ubicación...</p>
    )}
  </div>
  )
}

export default GeoLocalizacion