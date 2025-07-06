import { useState } from "react";
import { ClipLoader } from "react-spinners";

function Modal({ setModalUp, modalUp, actualizar, data }) {
  const { placa, modelo, color, marca, capacidad_carga } = data;
  console.log("data que llega al modal: ", data);
  const [formData, setFormData] = useState({
    placa: placa,
    modelo: modelo,
    color: color,
    marca: marca,
    capacidad_carga: capacidad_carga,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("Datos enviados:", formData);

    try {
      const response = await fetch(
        `http://localhost:5100/api/vehiculos/${placa}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Éxito:", data);
    } catch (err) {
      console.error("Error al crear:", err);
    } finally {
      setIsLoading(false);
      setModalUp(false);
      await actualizar();
    }
  };
  return (
    <>
      <div className=" absolute bottom-0 top-0 left-0 right-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="  bg-white h-auto w-120 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Actualizar Vehiculo
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Placa
              <input
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                placeholder="Example... abc123"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1"
              />
            </label>

            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Color
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Example.. Auzul"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1 "
              />
            </label>
            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Modelo
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Example.. Duster"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1"
              />
            </label>
            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Marca
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Example.. BMW"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1"
              />
            </label>
            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Capacidad de Carga
              <input
                type="Number"
                name="capacidad_carga"
                value={formData.capacidad_carga}
                onChange={handleChange}
                min={0}
                max={100000}
                placeholder="Example.. 1500"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1 "
              />
            </label>
            <div className="flex justify-evenly mt-6">
              <button
                onClick={() => setModalUp(!modalUp)}
                className="bg-red-600 p-2 rounded-sm text-white hover:bg-red-700 transition-all duration-150 shadow-xl"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-green-600 p-2 rounded-sm text-white hover:bg-green-700 transition-all duration-150"
              >
                {isLoading ? <ClipLoader /> : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
