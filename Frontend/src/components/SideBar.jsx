import { Car, SquareUser, LocationEdit, MapPinned, House } from "lucide-react";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <>
      <nav className="bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-800 min-h-full w-60 xl:w-80 text-white flex flex-col  gap-20">
        <div className="flex justify-center mt-10">
          <h1 className="text-xl xl:text-3xl font-bold">Gestor de Rutas</h1>
        </div>

        <ul className="flex flex-col text-xl font-semibold gap-4 p-4 mt-10">
          <Link to="/">
            <li className="flex gap-2 items-center p-2 rounded-xl  hover:bg-white/10 hover:scale-105 transition duration-150 ">
              <House />
              Home
            </li>
          </Link>
          <Link to="/Vehiculos">
            <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
              <Car />
              Vehiculos
            </li>
          </Link>
          <Link to="/Conductores">
            <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
              <SquareUser />
              Conductores
            </li>
          </Link>
          <Link to="/Programar">
            <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
              <LocationEdit />
              Programar Ruta
            </li>
          </Link>
          <Link to="/Mapa">
            <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
              <MapPinned />
              Ver Mapa
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
