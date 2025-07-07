import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { LocateFixed, Car, UserRound, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function Map() {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ubicación de la bodega principal
  const warehouseLocation = [4.757786586246297, -74.04488664305592];

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

        // Procesar conductores únicos
        const uniqueDrivers = [];
        // Procesar vehículos únicos
        const uniqueVehicles = [];
        // Almacenar todas las rutas
        const allRoutes = [];
        
        apiData.forEach(item => {
          // Guardar todas las rutas
          allRoutes.push({
            id: item._id,
            driverId: item.id_ruta.conductor_id._id,
            vehicleId: item.id_ruta.vehiculo_id._id,
            location: [item.latitud, item.longitud],
            address: item.direccion,
            package: item.numero_paquete,
            driverName: `${item.id_ruta.conductor_id.nombres} ${item.id_ruta.conductor_id.apellidos}`,
            vehicleDescription: `${item.id_ruta.vehiculo_id.marca} ${item.id_ruta.vehiculo_id.modelo}`,
            vehiclePlate: item.id_ruta.vehiculo_id.placa
          });

          // Procesar conductores únicos
          const driverExists = uniqueDrivers.some(d => d.id === item.id_ruta.conductor_id._id);
          if (!driverExists) {
            uniqueDrivers.push({
              id: item.id_ruta.conductor_id._id,
              name: `${item.id_ruta.conductor_id.nombres} ${item.id_ruta.conductor_id.apellidos}`,
              license: item.id_ruta.conductor_id.numero_licencia,
              phone: item.id_ruta.conductor_id.telefono
            });
          }

          // Procesar vehículos únicos
          const vehicleExists = uniqueVehicles.some(v => v.id === item.id_ruta.vehiculo_id._id);
          if (!vehicleExists) {
            uniqueVehicles.push({
              id: item.id_ruta.vehiculo_id._id,
              description: `${item.id_ruta.vehiculo_id.marca} ${item.id_ruta.vehiculo_id.modelo}`,
              plate: item.id_ruta.vehiculo_id.placa,
              capacity: item.id_ruta.vehiculo_id.capacidad_carga,
              color: item.id_ruta.vehiculo_id.color
            });
          }
        });

        setDrivers(uniqueDrivers);
        setVehicles(uniqueVehicles);
        setRoutes(allRoutes);
        
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener rutas filtradas por conductor seleccionado
  const filteredRoutes = selectedDriver 
    ? routes.filter(route => route.driverId === selectedDriver)
    : routes;

  // Componente para el botón de centrar en bodega
  const FlyToLocationButton = () => {
    const map = useMap();
    return (
      <button
        onClick={() => map.flyTo(warehouseLocation, 18)}
        className="absolute bottom-5 right-5 z-[1100] w-14 h-14 text-white bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-600 transition duration-200"
      >
        <LocateFixed color="white" size={30} />
      </button>
    );
  };

  // Componente para los marcadores en el mapa
  const DynamicMarkers = ({ routes, selectedDriver }) => {
    const map = useMap();
    
    // Centrar en la primera ruta si hay un conductor seleccionado
    useEffect(() => {
      if (selectedDriver && routes.length > 0) {
        map.flyTo(routes[0].location, 14);
      }
    }, [selectedDriver, routes, map]);

    return (
      <>
        {/* Marcador de la bodega */}
        <Marker position={warehouseLocation}>
          <Popup>
            <div className="font-bold">Bodega Principal</div>
            <div>Calle 123 #45-67, Bogotá</div>
          </Popup>
        </Marker>

        {/* Marcadores de rutas */}
        {routes.map(route => (
          <Marker 
            key={route.id} 
            position={route.location}
            opacity={selectedDriver === route.driverId ? 1 : 0.6}
          >
            <Popup>
              <div className="font-bold">{route.driverName}</div>
              <div>Vehículo: {route.vehicleDescription} ({route.vehiclePlate})</div>
              <div>Paquete: {route.package}</div>
              <div className="text-sm mt-1">{route.address}</div>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  // Componente para los controles de selección
  const SelectControls = ({ 
    drivers, 
    vehicles,
    onDriverChange,
    onVehicleChange
  }) => {
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
            onChange={(e) => onDriverChange(e.target.value)}
            className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
          >
            <option value="">Todos los conductores</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>
                {driver.name} ({driver.license})
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
            onChange={(e) => onVehicleChange(e.target.value)}
            className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
          >
            <option value="">Todos los vehículos</option>
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
        center={warehouseLocation}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FlyToLocationButton />
        <SelectControls
          drivers={drivers}
          vehicles={vehicles}
          onDriverChange={setSelectedDriver}
          onVehicleChange={setSelectedVehicle}
        />
        <DynamicMarkers 
          routes={filteredRoutes} 
          selectedDriver={selectedDriver} 
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

      {/* Panel de información */}
      <div className="absolute bottom-5 left-5 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg z-[1000] max-w-xs">
        <h3 className="font-bold mb-2">
          {selectedDriver 
            ? `Rutas de ${drivers.find(d => d.id === selectedDriver)?.name || 'conductor'}`
            : 'Todas las rutas'}
        </h3>
        <div className="max-h-40 overflow-y-auto">
          {filteredRoutes.length > 0 ? (
            <ul className="space-y-2">
              {filteredRoutes.map(route => (
                <li key={route.id} className="border-b pb-2">
                  <div className="font-medium">{route.package}</div>
                  <div className="text-sm">{route.address}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay rutas para mostrar</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;