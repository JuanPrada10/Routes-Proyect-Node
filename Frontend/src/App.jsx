import SideBar from "./components/SideBar";
import Home from "./components/Home";

import Vehiculos from "./components/Vehiculos";

import Map from "./components/Map";

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex">
      <aside>
        <SideBar />
      </aside>
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
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route
            path="/programar"
            element={
              <>
                <h1> Aqui componente Programar Ruta</h1>
              </>
            }
          />
          <Route path="/mapa" element={<Map></Map>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
