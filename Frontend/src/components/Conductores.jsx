import Card from "./Card";
import logo from "../assets/user.svg";
import SearchInput from "./SearchInput";
import { DatabaseBackup } from "lucide-react";
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import Modal from "./Modal";
import Details from "./Details";
function Conductores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [conductorEditar, setConductorEditar] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetch("http://localhost:5100/api/conductores");
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

  const filteredData = data.filter(
    (user) =>
      user.nombres.toLowerCase().includes(search.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <Modal
          isOpen={modalOpen || !!conductorEditar}
          onClose={() => {
            setModalOpen(false);
            setConductorEditar(null);
          }}
          title={
            conductorEditar ? "Actualizar Conductor" : "Registrar Conductor"
          }
          initialData={conductorEditar}
          fields={[
            { label: "Nombres", name: "nombres", type: "text" },
            { label: "Apellidos", name: "apellidos", type: "text" },
            { label: "Telefono", name: "telefono", type: "text" },
            {
              label: "Numero de Licencia",
              name: "numero_licencia",
              type: "text",
            },
            {
              label: "Correo",
              name: "correo",
              type: "text",
            },
          ]}
          onSubmit={async (formData) => {
            if (conductorEditar) {
              await fetch(
                `http://localhost:5100/api/conductores/${formData._id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                }
              );
            } else {
              await fetch("http://localhost:5100/api/conductores", {
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
            {filteredData?.map((user) => (
              <Card
                key={user._id}
                logo={logo}
                onEdit={() => setConductorEditar(user)}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `http://localhost:5100/api/conductores/${user._id}`,
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
                  <Details property="Nombre" value={user.nombres} />
                  <Details property="Apellido" value={user.apellidos} />
                  <Details property="Telefono" value={user.telefono} />
                  <Details property="Correo" value={user.correo} />
                  <Details
                    property="Numero de licencia"
                    value={user.numero_licencia}
                  />
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

export default Conductores;
