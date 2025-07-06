import Details from "./Details";
import { Pencil, X } from "lucide-react";

function Card({ data, logo, actualizar, setModalUp, modalUp, vehiculoUp }) {
  const { placa, modelo, color, marca, capacidad_carga } = data;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/vehiculos/${placa}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("elemento Eliminado:", data);
      await actualizar();
    } catch (error) {
      console.error("error al eliminar:", error);
    }
  };
  return (
    <>
      <div className="bg-white w-full max-w-xs h-auto rounded-2xl shadow-lg  overflow-hidden ">
        <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
          <div className="w-full flex justify-between px-3">
            <button
              className="p-2 rounded-full m-2 hover:scale-110 transition-all duration-150 hover:bg-blue-500/10 hover:text-sky-700"
              onClick={() => {
                setModalUp(!modalUp);
                vehiculoUp(data);
              }}
            >
              <Pencil />
            </button>
            <button
              onClick={handleDelete}
              className=" p-2 rounded-full m-2 hover:scale-110 transition-all duration-150 hover:bg-red-300/10 hover:text-red-800 "
            >
              <X />
            </button>
          </div>
          <div className=" border-2 border-slate-400 rounded-full size-24 p-2 bg-slate-200 flex items-center justify-center mb-4">
            <img src={logo} alt="perfil" />
          </div>
          <div className="flex justify-center"></div>
        </div>
        <div className="flex flex-col gap-4 justify-start p-6">
          <Details property="Placa" value={placa} />
          <Details property="Modelo" value={modelo} />
          <Details property="Color" value={color} />
          <Details property="Marca" value={marca} />
          <Details property="capacidad" value={capacidad_carga} />
        </div>
      </div>
    </>
  );
}

export default Card;
