import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RutaForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    conductor: "",
    vehiculo: "",
    fecha: "",
    detalles: [{ direccion: "", lat: "", lng: "", paquete: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  // Cargar vehículos y conductores siempre
  useEffect(() => {
    fetch("http://localhost:5100/api/vehiculos")
      .then((res) => res.json())
      .then(setVehiculos)
      .catch(() => setVehiculos([]));
    fetch("http://localhost:5100/api/conductores")
      .then((res) => res.json())
      .then(setConductores)
      .catch(() => setConductores([]));
  }, []);

  // Si hay id, cargar datos de la ruta para edición
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:5100/api/rutas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la ruta");
        return res.json();
      })
      .then((data) => {
        setForm({
          conductor: data.conductor_id?._id || "",
          vehiculo: data.vehiculo_id?._id || "",
          fecha: data.fecha
            ? new Date(data.fecha).toISOString().split("T")[0]
            : "",
          detalles:
            data.detalles && data.detalles.length > 0
              ? data.detalles.map((d) => ({
                  direccion: d.direccion || "",
                  lat: d.lat || "",
                  lng: d.lng || "",
                  paquete: d.paquete || "",
                }))
              : [{ direccion: "", lat: "", lng: "", paquete: "" }],
        });
      })
      .catch(() => {
        setError("No se pudo cargar la ruta para edición");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = (idx, e) => {
    const newDetalles = [...form.detalles];
    newDetalles[idx][e.target.name] = e.target.value;
    setForm({ ...form, detalles: newDetalles });
  };

  const addDetalle = () => {
    setForm({
      ...form,
      detalles: [
        ...form.detalles,
        { direccion: "", lat: "", lng: "", paquete: "" },
      ],
    });
  };

  const removeDetalle = (idx) => {
    const newDetalles = form.detalles.filter((_, i) => i !== idx);
    setForm({ ...form, detalles: newDetalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const payload = {
      conductor_id: form.conductor,
      vehiculo_id: form.vehiculo,
      fecha: form.fecha,
      detalles: form.detalles.map((d) => ({
        direccion: d.direccion,
        lat: d.lat,
        lng: d.lng,
        paquete: d.paquete,
      })),
    };
    try {
      let res;
      if (id) {
        // Modo edición
        res = await fetch(`http://localhost:5100/api/rutas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Modo creación
        res = await fetch("http://localhost:5100/api/programar-ruta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok)
        throw new Error(
          id ? "Error al actualizar la ruta" : "Error al programar la ruta"
        );
      await res.json();
      setSuccess(
        id
          ? "¡Ruta actualizada exitosamente!"
          : "¡Ruta programada exitosamente!"
      );
      setTimeout(() => navigate("/programar"), 1200);
    } catch (err) {
      setError(
        (id
          ? "Error al actualizar la ruta: "
          : "Error al programar la ruta: ") + err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8 ">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Editar Ruta" : "Programar Nueva Ruta"}
        </h2>
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-center animate-pulse">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Conductor</label>
            <select
              name="conductor"
              value={form.conductor}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
              disabled={loading}
            >
              <option value="">Selecciona un conductor</option>
              {conductores.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nombres} {c.apellidos} ({c.telefono})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Vehículo</label>
            <select
              name="vehiculo"
              value={form.vehiculo}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
              disabled={loading}
            >
              <option value="">Selecciona un vehículo</option>
              {vehiculos.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.placa} - {v.marca} {v.modelo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Detalles de Ruta</label>
            {form.detalles.map((detalle, idx) => (
              <div
                key={idx}
                className="mb-2 p-2 border rounded bg-gray-50 flex flex-wrap gap-2 items-center"
              >
                <input
                  type="text"
                  name="direccion"
                  value={detalle.direccion}
                  onChange={(e) => handleDetalleChange(idx, e)}
                  placeholder="Dirección"
                  className="mb-1 border rounded px-2 py-1 flex-1 min-w-[120px]"
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  name="lat"
                  value={detalle.lat}
                  onChange={(e) => handleDetalleChange(idx, e)}
                  placeholder="Latitud"
                  className="mb-1 border rounded px-2 py-1 w-28"
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  name="lng"
                  value={detalle.lng}
                  onChange={(e) => handleDetalleChange(idx, e)}
                  placeholder="Longitud"
                  className="mb-1 border rounded px-2 py-1 w-28"
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  name="paquete"
                  value={detalle.paquete}
                  onChange={(e) => handleDetalleChange(idx, e)}
                  placeholder="N° Paquete"
                  className="mb-1 border rounded px-2 py-1 w-28"
                  required
                  disabled={loading}
                />
                {form.detalles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetalle(idx)}
                    className="text-red-500 ml-2 text-xs border border-red-300 rounded px-2 py-1 hover:bg-red-100"
                    disabled={loading}
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDetalle}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              + Agregar punto
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Ruta"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/programar")}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              disabled={loading}
            >
              Volver a la tabla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RutaForm;
