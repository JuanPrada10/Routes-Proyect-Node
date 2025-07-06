import 'leaflet/dist/leaflet.css';
import { LocateFixed, Car, UserRound } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState } from 'react';

const locations = {
  warehouseOrigin: [4.757786586246297, -74.04488664305592],  // Fijo
  country: [4.5797067487985, -74.15491972843586],           // Dinámico
  warehouseDestination: [4.579852850549576, -74.1570643914546] // Dinámico
};

const drivers = [
  { id: 'county', name: 'County', location: 'country' },
  { id: 'ud', name: 'Ud', location: 'warehouseDestination' }
];

function FlyToLocationButton() {
  const map = useMap();
  return (
    <button
      onClick={() => map.flyTo(locations.warehouseOrigin, 18)}
      className="absolute bottom-5 right-5 z-[1100] w-14 h-14 text-white bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-600 transition duration-200"
    >
      <LocateFixed color="white" size={30} />
    </button>
  );
}

function DynamicMarkers({ selectedLocation }) {
  return (
    <>
      {/* Marcador FIJO (siempre visible) */}
      <Marker position={locations.warehouseOrigin}>
        <Popup>Bodega de Carga</Popup>
      </Marker>

      {/* Marcadores DINÁMICOS (solo al seleccionar) */}
      {selectedLocation && (
        <Marker position={locations[selectedLocation]}>
          <Popup>
            {selectedLocation === 'country' ? 'Ubicación County' : 'Bodega Ud'}
          </Popup>
        </Marker>
      )}
    </>
  );
}

function SelectControls({ onLocationChange }) {
  const map = useMap();
  const [selectedDriver, setSelectedDriver] = useState('');

  const handleDriverChange = (e) => {
    const driverId = e.target.value;
    setSelectedDriver(driverId);
    
    if (driverId) {
      const driver = drivers.find(d => d.id === driverId);
      if (driver) {
        map.flyTo(locations[driver.location], 18);
        onLocationChange(driver.location);
      }
    } else {
      onLocationChange(null);
    }
  };

  return (
    <div className="absolute top-5 right-5 z-[1100] flex gap-4">
      <div className="relative w-64">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          <UserRound className="text-gray-500" size={20} />
          <div className="h-5 w-px bg-gray-300 mx-2"></div>
        </div>
        <select
          name="ubicaciones"
          value={selectedDriver}
          onChange={handleDriverChange}
          className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
        >
          <option value="" disabled hidden className="text-gray-400">
            Seleccione ubicación
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id} className="text-gray-500">
              {driver.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative w-64">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          <Car className="text-gray-500" size={20} />
          <div className="h-5 w-px bg-gray-300 mx-2"></div>
        </div>
        <select
          name="vehiculos"
          className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
        >
          <option value="" disabled selected hidden className='text-gray-500'>
            Seleccione vehículo
          </option>
          <option value="1" className='text-gray-500'>Camión 1</option>
          <option value="2" className='text-gray-500'>Camión 2</option>
        </select>
      </div>
    </div>
  );
}

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={locations.warehouseOrigin}
        zoom={18}
        scrollWheelZoom
        className="h-full w-full relative"
      >
        <FlyToLocationButton />
        <SelectControls onLocationChange={setSelectedLocation} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <DynamicMarkers selectedLocation={selectedLocation} />
      </MapContainer>
    </div>
  );
}