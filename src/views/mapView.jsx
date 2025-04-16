import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import {getAllZonas} from '../api/api.js'



function MapView({onZonaSelect, zonaSelect, onsetZonaSelectOfMap }) {

  const [zonas, setZonas] = useState([]);
  const [ubicacionLatitud, setLatitud] = useState(5.1009785);
  const [ubicacionLongitud, setLongitud] = useState(-72.6477754);


  useEffect(() => {
    const intervalo = setInterval(() => {
      const ubicacion = JSON.parse(localStorage.getItem('ubicacion'));
      const zonaselect = Array.isArray(zonaSelect) ? zonaSelect[0] : null;
  
      if (zonaselect?.lat && zonaselect?.lng) {
        setLatitud(zonaselect.lat);
        setLongitud(zonaselect.lng);
      } else if (ubicacion?.lat && ubicacion?.lng) {
        setLatitud(ubicacion.lat);
        setLongitud(ubicacion.lng);
        clearInterval(intervalo); // Detenemos el intervalo
      }
    }, 500);
  
    return () => clearInterval(intervalo);
  }, [zonaSelect]);
  


 

    //console.log(ubicacionLatitud)
    //console.log(ubicacionLongitud)


    useEffect(()=>{
      const fetchZonasData = async () => {
        try {
          const data = await getAllZonas();
          setZonas(data); // Guardar los datos en el estado
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchZonasData();
    }, [])


    

  useEffect(() => {
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const map = L.map('map').setView([ubicacionLatitud, ubicacionLongitud], 13)
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    //personalizando ubicacion mia
    const emojiIcon = L.divIcon({
        className: 'custom-icon',
        html: '<span style="font-size: 30px;">📍</span>',  // Aquí puedes usar cualquier emoticono
        iconSize: [30, 30],  // Tamaño del icono
        iconAnchor: [15, 30],  // Ancla del icono
      });

    
    const marker = L.marker([ubicacionLatitud, ubicacionLongitud], { icon: emojiIcon }).addTo(map);
    marker.bindPopup("YO");
 



      
    //aqui para pintar los poligonos ya cargados
      zonas.map(zona => {
        const latLngs = zona?.coordenadas?.map(coord => [coord.lat, coord.lng]);
        const polygon = L.polygon(latLngs, {
          color: zona?.color,
          fillOpacity: 0.3
        }).addTo(map);
      
        polygon.bindPopup(zona.nombre);

        polygon.on('click', () => {
          onsetZonaSelectOfMap(zona); // o zona.nombre, zona.id, lo que necesites
        });


      });
      
      


    // Añadir featureGroup para almacenar los polígonos
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Configurar el control de dibujo
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: drawnItems
      }
    });


    map.addControl(drawControl);


    // Escuchar cuando se dibuja un polígono
    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      // Obtener coordenadas del polígono
      const coordinates = layer.getLatLngs();
      onZonaSelect(coordinates);
    });

  }, [zonas, ubicacionLatitud, ubicacionLongitud]);











   
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}

export default MapView;
