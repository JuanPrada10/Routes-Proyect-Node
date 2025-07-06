import 'leaflet/dist/leaflet.css';
import { LocateFixed } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const warehouseOrigin      = [4.757786586246297, -74.04488664305592];
const country = [4.5797067487985, -74.15491972843586];
const warehouseDestination = [4.579852850549576, -74.1570643914546];

/* ───── Botón que siempre tiene el mapa gracias a useMap() ───── */
function FlyToWarehouseButton() {
  const map = useMap();

  return (
    <button
      onClick={() => map.flyTo(warehouseOrigin, 18)} 
      className="
        absolute bottom-5 right-5
        z-[1100] w-14 h-14 text-white rounded-full
        flex items-center justify-center
        hover:bg-blue-600 transition duration-200
      "
    >
      <LocateFixed color="black" size={30} />
    </button>
  );
}

export default function Map() {
  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={warehouseOrigin}
        zoom={20} 
        scrollWheelZoom
        className="h-full w-full relative"
      >
        <FlyToWarehouseButton />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={warehouseOrigin}>
          <Popup>Esta es la bodega de cargar de paquetes</Popup>
        </Marker>

        <Marker position={warehouseDestination}>
          <Popup>Esta es la bodega de descargar de paquetes</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
