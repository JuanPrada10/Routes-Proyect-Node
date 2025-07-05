import express from "express";
import routesVehiculos from "./routes/vehiculos.js";
import routesConductores from "./routes/conductores.js";
import routesRutas from "./routes/rutas.js";
import routesDetalleRutas from "./routes/detalleRuta.js";
import "dotenv/config";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routesVehiculos);
app.use("/api", routesConductores);
app.use("/api", routesRutas);
app.use("/api", routesDetalleRutas);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`server:http://localhost:${PORT}/api-docs/`));
} catch (error) {
  console.log(error);
}
process.on("SIGINT", async () => {
  dbClient.cerrarConexion();
  process.exit(0);
});

export default app;
