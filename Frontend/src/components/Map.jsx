import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import {
  LocateFixed,
  Car,
  UserRound,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function Map() {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        apiData.forEach((item) => {
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
            vehiclePlate: item.id_ruta.vehiculo_id.placa,
            driverData: {
              license: item.id_ruta.conductor_id.numero_licencia,
              phone: item.id_ruta.conductor_id.telefono,
              email: item.id_ruta.conductor_id.correo,
            },
            vehicleData: {
              capacity: item.id_ruta.vehiculo_id.capacidad_carga,
              color: item.id_ruta.vehiculo_id.color,
            },
          });

          // Procesar conductores únicos
          const driverExists = uniqueDrivers.some(
            (d) => d.id === item.id_ruta.conductor_id._id
          );
          if (!driverExists) {
            uniqueDrivers.push({
              id: item.id_ruta.conductor_id._id,
              name: `${item.id_ruta.conductor_id.nombres} ${item.id_ruta.conductor_id.apellidos}`,
              license: item.id_ruta.conductor_id.numero_licencia,
              phone: item.id_ruta.conductor_id.telefono,
              email: item.id_ruta.conductor_id.correo,
            });
          }

          // Procesar vehículos únicos
          const vehicleExists = uniqueVehicles.some(
            (v) => v.id === item.id_ruta.vehiculo_id._id
          );
          if (!vehicleExists) {
            uniqueVehicles.push({
              id: item.id_ruta.vehiculo_id._id,
              description: `${item.id_ruta.vehiculo_id.marca} ${item.id_ruta.vehiculo_id.modelo}`,
              plate: item.id_ruta.vehiculo_id.placa,
              capacity: item.id_ruta.vehiculo_id.capacidad_carga,
              color: item.id_ruta.vehiculo_id.color,
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

  // Obtener rutas filtradas según selección
  const getFilteredRoutes = () => {
    let filtered = routes;

    if (selectedDriver && selectedVehicle) {
      filtered = routes.filter(
        (route) =>
          route.driverId === selectedDriver &&
          route.vehicleId === selectedVehicle
      );
    } else if (selectedDriver) {
      filtered = routes.filter((route) => route.driverId === selectedDriver);
    } else if (selectedVehicle) {
      filtered = routes.filter((route) => route.vehicleId === selectedVehicle);
    }

    return filtered;
  };

  const filteredRoutes = getFilteredRoutes();

  // Obtener información del conductor seleccionado
  const selectedDriverInfo =
    drivers.find((d) => d.id === selectedDriver) || null;

  // Obtener información del vehículo seleccionado
  const selectedVehicleInfo =
    vehicles.find((v) => v.id === selectedVehicle) || null;

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
  const DynamicMarkers = ({ routes }) => {
    const map = useMap();

    // Centrar en las rutas filtradas
    useEffect(() => {
      if (routes.length > 0 && (selectedDriver || selectedVehicle)) {
        const bounds = routes.map((route) => route.location);
        map.flyToBounds(bounds, { padding: [50, 50] });
      } else if (!selectedDriver && !selectedVehicle) {
        map.flyTo(warehouseLocation, 13);
      }
    }, [selectedDriver, selectedVehicle, routes, map]);

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
        {routes.map((route) => (
          <Marker key={route.id} position={route.location} opacity={1}>
            <Popup>
              <div className="font-bold">{route.driverName}</div>
              <div>
                Vehículo: {route.vehicleDescription} ({route.vehiclePlate})
              </div>
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
    onVehicleChange,
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
            {drivers.map((driver) => (
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
            onChange={(e) => onVehicleChange(e.target.value)}
            className="w-full h-10 pl-14 pr-4 rounded-lg bg-white text-black shadow-md focus:outline-none"
          >
            <option value="">Todos los vehículos</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.description} ({vehicle.plate})
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // Componente para el panel de información expandible
  const InfoPanel = () => {
    const [expanded, setExpanded] = useState(false);
    const [viewMode, setViewMode] = useState("general"); // 'general', 'driver', 'vehicle', 'combined'

    // Determinar el modo de vista basado en las selecciones
    useEffect(() => {
      if (selectedDriver && selectedVehicle) {
        setViewMode("combined");
      } else if (selectedDriver) {
        setViewMode("driver");
      } else if (selectedVehicle) {
        setViewMode("vehicle");
      } else {
        setViewMode("general");
      }
    }, [selectedDriver, selectedVehicle]);

    // Contenido compacto (vista previa)
    const renderCompactContent = () => {
      switch (viewMode) {
        case "combined":
          return (
            <>
              <h3 className="font-bold mb-2">Combinación Seleccionada</h3>
              <p className="text-sm">{selectedDriverInfo?.name || "N/A"}</p>
              <p className="text-sm">
                {selectedVehicleInfo?.description || "N/A"}
              </p>
              <p className="text-sm">{filteredRoutes.length} rutas asignadas</p>
            </>
          );
        case "driver":
          return (
            <>
              <h3 className="font-bold mb-2">Conductor Seleccionado</h3>
              <p className="text-sm">{selectedDriverInfo?.name || "N/A"}</p>
              <p className="text-sm">{filteredRoutes.length} rutas asignadas</p>
            </>
          );
        case "vehicle":
          return (
            <>
              <h3 className="font-bold mb-2">Vehículo Seleccionado</h3>
              <p className="text-sm">
                {selectedVehicleInfo?.description || "N/A"}
              </p>
              <p className="text-sm">{filteredRoutes.length} rutas asignadas</p>
            </>
          );
        default:
          return (
            <>
              <h3 className="font-bold mb-2">Resumen General</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Conductores</p>
                  <p className="text-sm">{drivers.length} registrados</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Vehículos</p>
                  <p className="text-sm">{vehicles.length} registrados</p>
                </div>
              </div>
              <p className="text-sm mt-2">{routes.length} rutas registradas</p>
            </>
          );
      }
    };

    // Contenido expandido (detalle completo)
    const renderExpandedContent = () => {
      switch (viewMode) {
        case "combined":
          return (
            <>
              <h3 className="font-bold mb-2">Información Combinada</h3>
              <div className="mb-3">
                <h4 className="font-semibold">
                  {selectedDriverInfo?.name || "N/A"}
                </h4>
                <p className="text-sm">
                  Licencia: {selectedDriverInfo?.license || "N/A"}
                </p>
                <p className="text-sm">
                  Teléfono: {selectedDriverInfo?.phone || "N/A"}
                </p>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold">
                  {selectedVehicleInfo?.description || "N/A"}
                </h4>
                <p className="text-sm">
                  Placa: {selectedVehicleInfo?.plate || "N/A"}
                </p>
                <p className="text-sm">
                  Capacidad: {selectedVehicleInfo?.capacity || "N/A"} kg
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-1">
                  Rutas Asignadas ({filteredRoutes.length})
                </h4>
                {filteredRoutes.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredRoutes.map((route) => (
                      <li key={route.id} className="border-b pb-2">
                        <div className="font-medium">{route.package}</div>
                        <div className="text-sm">{route.address}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    No hay rutas para esta combinación
                  </p>
                )}
              </div>
            </>
          );
        case "driver":
          return (
            <>
              <h3 className="font-bold mb-2">Información del Conductor</h3>
              <div className="mb-3">
                <h4 className="font-semibold">
                  {selectedDriverInfo?.name || "N/A"}
                </h4>
                <p className="text-sm">
                  Licencia: {selectedDriverInfo?.license || "N/A"}
                </p>
                <p className="text-sm">
                  Teléfono: {selectedDriverInfo?.phone || "N/A"}
                </p>
                <p className="text-sm">
                  Email: {selectedDriverInfo?.email || "N/A"}
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-1">
                  Rutas Asignadas ({filteredRoutes.length})
                </h4>
                {filteredRoutes.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredRoutes.map((route) => (
                      <li key={route.id} className="border-b pb-2">
                        <div className="font-medium">{route.package}</div>
                        <div className="text-sm">
                          Vehículo: {route.vehicleDescription}
                        </div>
                        <div className="text-sm">{route.address}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay rutas asignadas</p>
                )}
              </div>
            </>
          );
        case "vehicle":
          return (
            <>
              <h3 className="font-bold mb-2">Información del Vehículo</h3>
              <div className="mb-3">
                <h4 className="font-semibold">
                  {selectedVehicleInfo?.description || "N/A"}
                </h4>
                <p className="text-sm">
                  Placa: {selectedVehicleInfo?.plate || "N/A"}
                </p>
                <p className="text-sm">
                  Color: {selectedVehicleInfo?.color || "N/A"}
                </p>
                <p className="text-sm">
                  Capacidad: {selectedVehicleInfo?.capacity || "N/A"} kg
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-1">
                  Rutas Asignadas ({filteredRoutes.length})
                </h4>
                {filteredRoutes.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredRoutes.map((route) => (
                      <li key={route.id} className="border-b pb-2">
                        <div className="font-medium">{route.package}</div>
                        <div className="text-sm">
                          Conductor: {route.driverName}
                        </div>
                        <div className="text-sm">{route.address}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay rutas asignadas</p>
                )}
              </div>
            </>
          );
        default:
          return (
            <>
              <h3 className="font-bold mb-2">Resumen General</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <h4 className="font-semibold">Conductores</h4>
                  <p className="text-sm">{drivers.length} registrados</p>
                </div>
                <div>
                  <h4 className="font-semibold">Vehículos</h4>
                  <p className="text-sm">{vehicles.length} registrados</p>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-1">
                  Últimas Rutas ({routes.length})
                </h4>
                {routes.length > 0 ? (
                  <ul className="space-y-2">
                    {routes.slice(0, 5).map((route) => (
                      <li key={route.id} className="border-b pb-2">
                        <div className="font-medium">{route.package}</div>
                        <div className="text-sm">
                          {route.driverName} - {route.vehicleDescription}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {route.address}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay rutas registradas</p>
                )}
              </div>
            </>
          );
      }
    };

    return (
      <div
        className={`absolute bottom-5 left-5 bg-white bg-opacity-90 rounded-lg shadow-lg z-[1000] transition-all duration-300 ${
          expanded ? "w-80 max-h-[70vh]" : "w-64 max-h-40"
        }`}
      >
        <div className="p-4">
          {/* Contenido principal */}
          <div className={expanded ? "hidden" : "block"}>
            {renderCompactContent()}
          </div>

          {/* Contenido expandido */}
          <div className={expanded ? "block" : "hidden"}>
            {renderExpandedContent()}
          </div>

          {/* Botón para expandir/contraer */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                <span className="text-sm">Ver menos</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                <span className="text-sm">Ver más</span>
              </>
            )}
          </button>
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
        <DynamicMarkers routes={filteredRoutes} />
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

      <InfoPanel />
    </div>
  );
}

export default Map;
