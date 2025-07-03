import express from "express";
const route = express.Router();
import vehiculoController from "../controllers/vehiculos.js";

route.post("/vehiculos", vehiculoController.create);
route.get("/vehiculos/:id", vehiculoController.getById);
route.get("/vehiculos", vehiculoController.getAll);
route.put("/vehiculos/:id", vehiculoController.update);
route.delete("/vehiculos/:id", vehiculoController.delete);
export default route;
