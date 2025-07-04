import express from "express";
const route = express.Router();
import conductoresController from "../controllers/conductores.js";

route.post("/conductores", conductoresController.create);
route.get("/conductores/:id", conductoresController.getById);
route.get("/conductores", conductoresController.getAll);
route.put("/conductores/:id", conductoresController.update);
route.delete("/conductores/:id", conductoresController.delete);
export default route;
