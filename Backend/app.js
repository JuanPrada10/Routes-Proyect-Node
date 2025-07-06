import express from "express";
import routesVehiculos from "./routes/vehiculos.js";
import routesConductores from "./routes/conductores.js";
import routesRutas from "./routes/rutas.js";
import routesDetalleRutas from "./routes/detalleRuta.js";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con tu URL de frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api", routesVehiculos);
app.use("/api", routesConductores);
app.use("/api", routesRutas);
app.use("/api", routesDetalleRutas);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`server:http://localhost:${PORT}/api-docs/`)
  );
} catch (error) {
  console.log(error);
}
process.on("SIGINT", async () => {
  dbClient.cerrarConexion();
  process.exit(0);
});

export default app;
