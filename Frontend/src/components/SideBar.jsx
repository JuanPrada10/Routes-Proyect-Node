import {
  Car,
  SquareUser,
  LocationEdit,
  MapPinned,
  Locate,
  House,
} from "lucide-react";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <>
      <nav className="bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-800 min-h-screen w-60 xl:w-80 text-white flex flex-col  gap-20">
        <div className="flex justify-center mt-10">
          <h1 className="text-xl xl:text-3xl font-bold">Gestor de Rutas</h1>
        </div>
        <ul className="flex flex-col text-xl font-semibold gap-4  p-6 ">
          <li className="flex gap-2 items-center p-2 rounded-xl  hover:bg-white/10 hover:scale-105 transition duration-150 ">
            <House />
            <Link to="/">Home</Link>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <Car />
            <Link to="/Vehiculos">Vehiculos</Link>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <SquareUser />
            <Link to="/Conductores">Conductores</Link>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <LocationEdit />
            <Link to="/Programar">Programar Ruta</Link>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <MapPinned />
            <Link to="/Mapa">Ver Mapa</Link>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <Locate />
            <Link to="/Buscar"> Buscar Ruta</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
