import SideBar from "./components/SideBar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex">
      <aide>
        <SideBar />
      </aide>
      <section className="flex-1">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route
            path="/conductores"
            element={
              <>
                <h1>Aqui componente CRUD de Conductores</h1>
              </>
            }
          />
          <Route
            path="/vehiculos"
            element={
              <>
                <h1> Aqui componente CRUD de Vehiciulos</h1>
              </>
            }
          />
          <Route
            path="/programar"
            element={
              <>
                <h1> Aqui componente Programar Ruta</h1>
              </>
            }
          />
          <Route
            path="/mapa"
            element={
              <>
                <h1> Aqui componente Visualizacion de Mapa</h1>
              </>
            }
          />
          <Route
            path="/buscar"
            element={
              <>
                <h1> Aqui componente Buscar Ruta</h1>
              </>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
