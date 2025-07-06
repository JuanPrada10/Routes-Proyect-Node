import Card from "./Card";
import logo from "../assets/car.svg";
import SearchInput from "./SearchInput";
import { DatabaseBackup } from "lucide-react";
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import Modal from "./ModalCreate";
import ModalUp from "./ModalActualizar";
function Vehiculos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [isModalUp, setIsModalUp] = useState(false);
  const [placaUp, setVehiculoUp] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetch("http://localhost:5100/api/vehiculos");
      const json = await result.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        {modal ? (
          <Modal setModal={setModal} modal={modal} actualizar={fetchData} />
        ) : (
          isModalUp && (
            <ModalUp
              setModalUp={setIsModalUp}
              modalUp={isModalUp}
              actualizar={fetchData}
              data={placaUp}
            />
          )
        )}
        <SearchInput setModal={setModal} modal={modal} />
        {loading ? (
          <div className="flex-1 flex justify-center items-center pb-50">
            <PacmanLoader />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 lg:p-12">
            {data?.map((car) => (
              <Card
                key={car._id}
                data={car}
                logo={logo}
                actualizar={fetchData}
                setModalUp={setIsModalUp}
                modalUp={isModalUp}
                vehiculoUp={setVehiculoUp}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col w-full items-center justify-center pb-50">
            <h1 className="text-4xl font-semibold">No hay datos</h1>
            <DatabaseBackup size={64} />
          </div>
        )}
      </div>
    </>
  );
}

export default Vehiculos;
