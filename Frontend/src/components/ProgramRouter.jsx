import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DatabaseBackup } from "lucide-react";
import { PacmanLoader } from "react-spinners";

// Estilos de PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function ProgramRouter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const transformData = (apiData) => {
    return apiData
      .filter((item) => item.conductor_id && item.vehiculo_id)
      .map((item) => ({
        id: item._id,
        fecha: item.fecha
          ? new Date(item.fecha).toISOString().split("T")[0]
          : "N/A",
        conductor: item.conductor_id
          ? `${item.conductor_id.nombres || ""} ${
              item.conductor_id.apellidos || ""
            }`
          : "N/A",
        telefono: item.conductor_id?.telefono || "N/A",
        vehiculo: item.vehiculo_id
          ? `${item.vehiculo_id.marca || ""} ${item.vehiculo_id.modelo || ""}`
          : "N/A",
        placa: item.vehiculo_id?.placa || "N/A",
        capacidad: item.vehiculo_id?.capacidad_carga || "N/A",
      }));
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:5100/api/rutas");
        const json = await result.json();
        const transformedData = transformData(json);
        setData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <button
          className="p-button p-component p-button-success"
          onClick={() => navigate("/programar-ruta")}
        >
          <span className="p-button-icon p-c pi pi-plus mr-2"></span>
          Programar ruta
        </button>
        <span className="p-input-icon-left w-full md:w-auto"></span>
      </div>
    );
  };

  const capacidadBodyTemplate = (rowData) => {
    return `${rowData.capacidad} kg`;
  };

  const header = renderHeader();

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <div className="flex-1 flex justify-center items-center pb-50">
          <PacmanLoader />
        </div>
      ) : data.length > 0 ? (
        <div className="flex flex-col p-4 md:p-8 lg:p-12 w-full max-w-full">
          <div className="card flex-1 flex flex-col min-h-0 w-full max-w-full">
            <div className="flex-1 min-h-0 w-full max-w-full overflow-x-auto">
              <DataTable
                value={data}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                className="h-full w-full max-w-full"
                loading={loading}
                header={header}
                scrollable
                scrollHeight="flex"
                style={{ width: "100%", maxWidth: "100vw" }}
              >
                <Column
                  field="fecha"
                  header="Fecha"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="conductor"
                  header="Conductor"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="telefono"
                  header="Teléfono"
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="vehiculo"
                  header="Vehículo"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="placa"
                  header="Placa"
                  style={{ minWidth: "8rem" }}
                />
                <Column
                  field="capacidad"
                  header="Capacidad"
                  body={capacidadBodyTemplate}
                  style={{ minWidth: "8rem" }}
                />
                <Column
                  body={(rowData) => (
                    <button
                      className="p-button p-component"
                      title="Editar"
                      onClick={() => navigate(`/programar-ruta/${rowData.id}`)}
                    >
                      <span className="p-button-icon p-c pi pi-pencil"></span>
                    </button>
                  )}
                />
                <Column
                  body={(rowData) => (
                    <button
                      className="p-button p-component p-button-danger"
                      title="Eliminar"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "¿Seguro que deseas eliminar esta ruta?"
                          )
                        ) {
                          try {
                            setLoading(true);
                            await fetch(
                              `http://localhost:5100/api/rutas/${rowData.id}`,
                              { method: "DELETE" }
                            );
                            setData((prev) =>
                              prev.filter((r) => r.id !== rowData.id)
                            );
                          } catch (e) {
                            alert("Error al eliminar la ruta", e);
                          } finally {
                            setLoading(false);
                          }
                        }
                      }}
                    >
                      <span className="p-button-icon p-c pi pi-trash"></span>
                    </button>
                  )}
                />
              </DataTable>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col w-full items-center justify-center pb-50">
          <h1 className="text-4xl font-semibold">No hay datos</h1>
          <DatabaseBackup size={64} />
        </div>
      )}
    </div>
  );
}

export default ProgramRouter;
