import express from "express";
const route = express.Router();
import detallerutaModelo from "../controllers/detalleRuta.js";

route.post("/detalleRuta", detallerutaModelo.create);
route.get("/detalleRuta/:id", detallerutaModelo.getById);
route.get("/detalleRuta", detallerutaModelo.getAll);
route.put("/detalleRuta/:id", detallerutaModelo.update);
route.delete("/detalleRuta/:id", detallerutaModelo.delete);
export default route;