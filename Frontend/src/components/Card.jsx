import Details from "./Details";
import { Pencil, X } from "lucide-react";

function Card({ data, logo }) {
  const { placa, modelo, color, marca, capacidad_carga } = data;
  return (
    <>
      <div className="bg-white w-full max-w-xs h-auto rounded-2xl shadow-lg  overflow-hidden ">
        <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
          <div className="w-full flex justify-end  p-2">
            <button className=" rounded-tr-2xl hover:scale-110 transition-all duration-150 hover:text-red-800 ">
              <X />
            </button>
          </div>
          <div className=" border-2 border-slate-400 rounded-full size-24 p-2 bg-slate-200 flex items-center justify-center ">
            <img src={logo} alt="perfil" />
          </div>
          <div className="flex justify-center">
            <button className=" p-2 rounded-full m-2 hover:scale-110 transition-all duration-150 hover:bg-white/10">
              <Pencil color="#202D41" />
            </button>
          </div>
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
