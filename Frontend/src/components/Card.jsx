import { Pencil, X } from "lucide-react";

function Card({ logo, children, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      onDelete();
    }
  };
  return (
    <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg overflow-hidden m-auto transition-all duration-200">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-between px-3">
          <button
            onClick={onEdit}
            className="p-2 rounded-full m-2 hover:scale-110 transition-all duration-150 hover:bg-blue-500/10 hover:text-sky-700"
          >
            <Pencil />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full m-2 hover:scale-110 transition-all duration-150 hover:bg-red-300/10 hover:text-red-800"
          >
            <X />
          </button>
        </div>
        <div className="border-2 border-slate-400 rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-2 bg-slate-200 flex items-center justify-center mb-4">
          <img
            src={logo}
            alt="perfil"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}

export default Card;
