function Card({ data, logo }) {
  return (
    <>
      <div className="bg-white w-80 h-auto rounded-2xl shadow-2xl flex flex-col overflow-hidden hover:scale-105 transition-all duration-250">
        <div className=" flex justify-center items-center py-12 bg-gradient-to-r from-slate-300 to-slate-500">
          <div className=" border-3 rounded-full size-24  p-2 flex bg-slate-200 ">
            <img src={logo} alt="perfil" />
          </div>
        </div>

        {data.map(({ id, placa, modelo, color, marca, capacidad_carga }) => (
          <div key={id} className="flex flex-col gap-4 justify-start p-6">
            <p className="font-semibold">
              Placa:{" "}
              <span className=" py-1 px-4 rounded-2xl  shadow-slate-400 shadow-xs bg-slate-300">
                {placa}
              </span>
            </p>
            <p className="font-semibold">
              Modelo:{" "}
              <span className=" py-1 px-4 rounded-2xl p-1 shadow-slate-400 shadow-xs bg-slate-300 ">
                {modelo}
              </span>
            </p>
            <p className="font-semibold">
              Color:{" "}
              <span className=" py-1 px-4 rounded-2xl p-1 shadow-slate-400 shadow-xs bg-slate-300">
                {color}
              </span>
            </p>
            <p className="font-semibold">
              Marca:{" "}
              <span className=" py-1 px-4 rounded-2xl p-1 shadow-slate-400 shadow-xs bg-slate-300">
                {marca}
              </span>
            </p>
            <p className="font-semibold">
              Capacidad:{" "}
              <span className=" py-1 px-4 rounded-2xl p-1 shadow-slate-400 shadow-xs bg-slate-300">
                {capacidad_carga}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
