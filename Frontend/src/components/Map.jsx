import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {

  return (
    <div className="h-screen w-full">
      <MapContainer center={[4.757786586246297, -74.04488664305592]} zoom={100} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[4.757786586246297, -74.04488664305592]}>
          <Popup>Esta es la bodega de cargar de paquetes</Popup>
        </Marker>
        <Marker position={[4.579852850549576, -74.1570643914546]}>
          <Popup>Esta es la bodega de descargar de paquetes</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
