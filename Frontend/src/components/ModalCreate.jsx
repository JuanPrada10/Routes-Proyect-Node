import { useState } from "react";
import { ClipLoader } from "react-spinners";

function Modal({ setModal, modal, actualizar }) {
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    color: "",
    marca: "",
    capacidad_carga: 0,
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
      const response = await fetch("http://localhost:5100/api/vehiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Éxito:", data);
    } catch (err) {
      console.error("Error al crear:", err);
    } finally {
      setIsLoading(false);
      setModal(false);
      setFormData({
        placa: "",
        modelo: "",
        color: "",
        marca: "",
        capacidad_carga: 0,
      });
      await actualizar();
    }
  };
  return (
    <>
      <div className=" absolute bottom-0 top-0 left-0 right-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="  bg-white h-auto w-120 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Registro Vehiculo
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col w-full gap-1 text-slate-900 font-semibold">
              Placa
              <input
                type="text"
                name="placa"
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
                onChange={handleChange}
                min={0}
                max={100000}
                placeholder="Example.. 1500"
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1 "
              />
            </label>
            <div className="flex justify-evenly mt-6">
              <button
                onClick={() => setModal(!modal)}
                className="bg-red-600 p-2 rounded-sm text-white hover:bg-red-700 transition-all duration-150 shadow-xl"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className=" bg-green-600 p-2 rounded-sm text-white hover:bg-green-700 transition-all duration-150"
              >
                {isLoading ? <ClipLoader /> : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
