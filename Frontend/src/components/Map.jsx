import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { LocateFixed, Car, UserRound, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function Map() {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ubicaciones importantes
  const locations = {
    warehouse: [4.757786586246297, -74.04488664305592], // Bodega principal
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5100/api/detalleRuta");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const apiData = await response.json();
        console.log("Datos API recibidos:", apiData);

        const processedDrivers = [];
        const processedVehicles = [];
        
        apiData.forEach(item => {
          // Procesar conductores
          if (item.id_ruta?.conductor_id) {
            const driverId = item.id_ruta.conductor_id._id;
            const driverExists = processedDrivers.some(d => d.id === driverId);
            
            if (!driverExists && item.id_ruta.conductor_id.nombres) {
              processedDrivers.push({
                id: driverId,
                name: item.id_ruta.conductor_id.nombres,
                location: [item.latitud || 0, item.longitud || 0],
                vehicleId: item.id_ruta.vehiculo_id?._id
              });
            }
          }

          // Procesar vehículos
          if (item.id_ruta?.vehiculo_id) {
            const vehicleId = item.id_ruta.vehiculo_id._id;
            const vehicleExists = processedVehicles.some(v => v.id === vehicleId);
            
            if (!vehicleExists) {
              processedVehicles.push({
                id: vehicleId,
                description: `${item.id_ruta.vehiculo_id.marca || ''} ${item.id_ruta.vehiculo_id.modelo || ''}`.trim(),
                plate: item.id_ruta.vehiculo_id.placa || 'Sin placa'
              });
            }
          }
        });

        setDrivers(processedDrivers);
        setVehicles(processedVehicles);
        
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Componente para el botón de centrar (FlyToLocationButton)
  const FlyToLocationButton = () => {
    const map = useMap();
    return (
      <button
        onClick={() => map.flyTo(locations.warehouse, 18)}
        className="absolute bottom-5 right-5 z-[1100] w-14 h-14 text-white bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-600 transition duration-200"
      >
        <LocateFixed color="white" size={30} />
      </button>
    );
  };

  // Componente para los marcadores (DynamicMarkers)
  const DynamicMarkers = ({ selectedDriver }) => {
    return (
      <>
        {/* Marcador de la bodega (siempre visible) */}
        <Marker position={locations.warehouse}>
          <Popup>Bodega de Carga</Popup>
        </Marker>

        {/* Marcadores de conductores */}
        {drivers.map(driver => (
          <Marker 
            key={driver.id} 
            position={driver.location}
            opacity={selectedDriver === driver.id ? 1 : 0.6}
          >
            <Popup>
              <div className="font-bold">{driver.name}</div>
              <div>Vehículo: {vehicles.find(v => v.id === driver.vehicleId)?.description || 'No asignado'}</div>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  // Componente para los selects (SelectControls)
  const SelectControls = ({ 
    drivers, 
    vehicles,
    onDriverChange,
    onVehicleChange
  }) => {
    const map = useMap();

    const handleDriverChange = (e) => {
      const driverId = e.target.value;
      onDriverChange(driverId);
      
      if (driverId) {
        const driver = drivers.find(d => d.id === driverId);
        if (driver) {
          map.flyTo(driver.location, 16);
        }
      }
    };

    const handleVehicleChange = (e) => {
      onVehicleChange(e.target.value);
    };

    return (
      <div className="absolute top-5 right-5 z-[1100] flex gap-4">
        {/* Select de Conductores */}
        <div className="relative w-64">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <UserRound className="text-gray-500" size={20} />
            <div className="h-5 w-px bg-gray-300 mx-2"></div>
          </div>
          <select
            value={selectedDriver}
            onChange={handleDriverChange}
            className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
          >
            <option value="">Seleccione conductor</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select de Vehículos */}
        <div className="relative w-64">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <Car className="text-gray-500" size={20} />
            <div className="h-5 w-px bg-gray-300 mx-2"></div>
          </div>
          <select
            value={selectedVehicle}
            onChange={handleVehicleChange}
            className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
          >
            <option value="">Seleccione vehículo</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.description} ({vehicle.plate})
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={locations.warehouse}
        zoom={15}
        scrollWheelZoom
        className="h-full w-full relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Componentes restaurados */}
        <FlyToLocationButton />
        <DynamicMarkers selectedDriver={selectedDriver} />
        <SelectControls
          drivers={drivers}
          vehicles={vehicles}
          onDriverChange={setSelectedDriver}
          onVehicleChange={setSelectedVehicle}
        />
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
          <Loader2 className="animate-spin text-white w-12 h-12" />
        </div>
      )}

      {error && (
        <div className="absolute top-20 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-[2000]">
          Error: {error}
        </div>
      )}
      <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 p-2 rounded-lg text-xs z-[1000]">
        <div>Conductores: {drivers.length}</div>
        <div>Vehículos: {vehicles.length}</div>
        <div>Driver seleccionado: {selectedDriver}</div>
        <div>Vehículo seleccionado: {selectedVehicle}</div>
      </div>
    </div>
  );
}

export default Map;