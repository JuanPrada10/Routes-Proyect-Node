import express from "express";
const route = express.Router();
import rutasController from "../controllers/rutas.js";

route.post("/rutas", rutasController.create);
route.get("/rutas/:id", rutasController.getById);
route.get("/rutas", rutasController.getAll);
route.put("/rutas/:id", rutasController.update);
route.delete("/rutas/:id", rutasController.delete);
route.post("/programar-ruta", rutasController.programarRuta);

export default route;
