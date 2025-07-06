import { Search, SquarePlus } from "lucide-react";
function SearchInput() {
  return (
    <>
      <div className="w-full flex justify-between pt-6 px-12 ">
        <div className="flex p-2">
          <input
            type="search"
            className="bg-white rounded-l-lg p-1 focus:outline-none w-70"
            placeholder="Buscar Por Placa ...."
          />
          <div className="bg-slate-900 rounded-r-lg p-1 hover:bg-slate-800 transition-all duration-150 ">
            <Search color="white" />
          </div>
        </div>
        <button className="bg-green-600 h-8 w-24 rounded-sm mx-12 hover:bg-green-700 transition-all duration-150 flex justify-center items-center shadow-xl">
          <SquarePlus color="white" size={24} />
        </button>
      </div>
    </>
  );
}

export default SearchInput;
