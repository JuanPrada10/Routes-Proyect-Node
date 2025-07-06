import Card from "./Card";
import logo from "../assets/car.svg";
function Vehiculos() {
  const cars = [
    {
      id: 1,
      placa: "ABCD123",
      modelo: "2001",
      color: "Verde",
      marca: "BMW",
      capacidad_carga: 1200,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-items-center m-20">
        <Card data={cars} logo={logo}></Card>
        <Card data={cars} logo={logo}></Card>
        <Card data={cars} logo={logo}></Card>
      </div>
    </>
  );
}

export default Vehiculos;
