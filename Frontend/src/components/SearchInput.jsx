import { useState } from "react";
import { Search, SquarePlus } from "lucide-react";

function SearchInput({ setModal, modal, onSearch }) {
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center pt-6 px-12 ">
        <form className="flex p-2" onSubmit={handleSearch}>
          <input
            type="search"
            className="bg-white rounded-l-lg p-1 focus:outline-none w-70"
<<<<<<< Updated upstream
            placeholder="Buscar"
=======
            placeholder="Buscar Por Placa ...."
            value={search}
            onChange={handleInput}
>>>>>>> Stashed changes
          />
          <button
            type="submit"
            className="bg-slate-900 rounded-r-lg p-1 hover:bg-slate-800 transition-all duration-150 "
          >
            <Search color="white" />
          </button>
        </form>
        <button
          onClick={() => setModal(!modal)}
          className="bg-green-600 h-8 w-24 rounded-sm mx-12 hover:bg-green-700 transition-all duration-150 flex justify-center items-center shadow-xl gap-2 p-2 text-white"
        >
          <SquarePlus color="white" size={24} />
        </button>
      </div>
    </>
  );
}

export default SearchInput;
