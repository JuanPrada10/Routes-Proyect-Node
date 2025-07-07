import Card from "./Card";
import logo from "../assets/car.svg";
import SearchInput from "./SearchInput";
import { DatabaseBackup } from "lucide-react";
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import Modal from "./Modal";
import Details from "./Details";
function Vehiculos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [vehiculoEditar, setVehiculoEditar] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetch("http://localhost:5100/api/vehiculos");
      const json = await result.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrado por placa
  const filteredData = data.filter((car) =>
    car.placa.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <Modal
          isOpen={modalOpen || !!vehiculoEditar}
          onClose={() => {
            setModalOpen(false);
            setVehiculoEditar(null);
          }}
          title={vehiculoEditar ? "Actualizar Vehículo" : "Registrar Vehículo"}
          initialData={vehiculoEditar}
          fields={[
            {
              label: "Placa",
              name: "placa",
              type: "text",
              disabled: !!vehiculoEditar,
            },
            { label: "Color", name: "color", type: "text" },
            { label: "Modelo", name: "modelo", type: "text" },
            { label: "Marca", name: "marca", type: "text" },
            {
              label: "Capacidad de Carga",
              name: "capacidad_carga",
              type: "number",
            },
          ]}
          onSubmit={async (formData) => {
            if (vehiculoEditar) {
              // Actualizar
              await fetch(
                `http://localhost:5100/api/vehiculos/${formData.placa}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                }
              );
            } else {
              // Crear
              await fetch("http://localhost:5100/api/vehiculos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
            }
            await fetchData();
          }}
        />
        <SearchInput
          setModal={setModalOpen}
          modal={modalOpen}
          onSearch={setSearch}
        />
        {loading ? (
          <div className="flex-1 flex justify-center items-center pb-50">
            <PacmanLoader />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 lg:p-12">
            {filteredData?.map((car) => (
              <Card
                key={car._id}
                logo={logo}
                onEdit={() => setVehiculoEditar(car)}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `http://localhost:5100/api/vehiculos/${car.placa}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    await response.json();
                    await fetchData();
                  } catch (error) {
                    console.error("error al eliminar:", error);
                  }
                }}
              >
                <>
                  <Details property="Placa" value={car.placa} />
                  <Details property="Modelo" value={car.modelo} />
                  <Details property="Color" value={car.color} />
                  <Details property="Marca" value={car.marca} />
                  <Details property="Capacidad" value={car.capacidad_carga} />
                </>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col w-full items-center justify-center pb-50">
            <h1 className="text-4xl font-semibold">No hay datos</h1>
            <DatabaseBackup size={64} />
          </div>
        )}
      </div>
    </>
  );
}

export default Vehiculos;
