import SideBar from "./components/SideBar";
import Home from "./components/Home";
import ProgramRouter from "./components/ProgramRouter";
import Vehiculos from "./components/Vehiculos";
import Map from "./components/Map";
import { Routes, Route } from "react-router-dom";
import Conductores from "./components/Conductores";

function App() {
  return (
    <div className="flex">
      <aside>
        <SideBar />
      </aside>
      <section className="flex-1">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/conductores" element={<Conductores />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/programar" element={<ProgramRouter />} />
          <Route path="/mapa" element={<Map></Map>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
