import rutasModelo from "../models/rutas.js";
import detalleRutaModelo from "../models/detalleRuta.js";
import mongoose from "mongoose";
class rutasController {
  constructor() {}
  // Método especial para crear ruta y detalles en un solo paso
  async programarRuta(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { conductor_id, vehiculo_id, fecha, detalles } = req.body;
      // Crear la ruta principal
      const ruta = await rutasModelo.create({
        conductor_id,
        vehiculo_id,
        fecha,
      });
      // Crear los detalles asociados
      const detallesDocs = await Promise.all(
        detalles.map((d) =>
          detalleRutaModelo.create({
            id_ruta: ruta._id,
            direccion: d.direccion,
            latitud: d.lat,
            longitud: d.lng,
            numero_paquete: d.paquete,
          })
        )
      );
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({ ruta, detalles: detallesDocs });
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ error: e.message });
    }
  }
  async create(req, res) {
    try {
      const data = await rutasModelo.create(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await rutasModelo.update(id, req.body);
      res.status(200).json({ status: " actualizado" });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await rutasModelo.delete(id);
      res.status(206).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getAll(req, res) {
    try {
      const data = await rutasModelo.getAll();
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await rutasModelo.getById(id);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default new rutasController();
