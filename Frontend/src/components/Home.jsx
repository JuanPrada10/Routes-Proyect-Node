import { PackageSearch } from "lucide-react";
function Home() {
  return (
    <>
      <div className=" flex flex-1 justify-center items-center  min-h-screen">
        <div className=" flex bg-white rounded-xl shadow-2xl h-96 w-250 gap-6">
          <div className="w-125 flex justify-center items-center">
            <PackageSearch size={125} color="#111A2E" />
          </div>
          <div className=" h-full w-140 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-800 text-white flex flex-col justify-center items-center gap-6 p-4 rounded-r-xl ">
            <h2 className="text-4xl font-bold text-center">
              ¡Bienvenido a Rutas Expres!
            </h2>
            <p className=" font-semibold text-center text-wrap p-4">
              Bienvenido al sistema de gestión de rutas de entrega. Utiliza el
              menú de navegación superior para acceder a las diferentes
              funcionalidades de la aplicación.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
