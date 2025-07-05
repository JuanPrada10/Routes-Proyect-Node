import {
  Car,
  SquareUser,
  LocationEdit,
  MapPinned,
  Locate,
  House,
} from "lucide-react";
function SideBar() {
  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-800 min-h-screen w-80 text-white flex flex-col  gap-20">
        <div className="flex justify-center mt-10">
          <h1 className="text-3xl font-bold">Gestor de Rutas</h1>
        </div>
        <ul className="flex flex-col text-xl font-semibold gap-4  p-6 ">
          <li className="flex gap-2 items-center p-2 rounded-xl  hover:bg-white/10 hover:scale-105 transition duration-150 ">
            <House />
            <a href="">Home</a>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <Car />
            <a href="">Vehiculos</a>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <SquareUser />
            <a href="">Conductores</a>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <LocationEdit />
            <a href="">Programar Ruta</a>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <MapPinned />
            <a href="">Ver Mapa</a>
          </li>
          <li className="flex gap-2 items-center p-2 rounded-xl hover:scale-105 hover:bg-white/10 transition duration-150">
            <Locate />
            <a href="">Buscar Ruta</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
