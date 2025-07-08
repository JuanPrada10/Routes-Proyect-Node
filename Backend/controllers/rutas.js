import rutasModelo from "../models/rutas.js";
import detalleRutaModelo from "../models/detalleRuta.js";
import mongoose from "mongoose";
class rutasController {
  constructor() {}

  async programarRuta(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { conductor_id, vehiculo_id, fecha, detalles } = req.body;

      const ruta = await rutasModelo.create({
        conductor_id,
        vehiculo_id,
        fecha,
      });

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
      const { conductor_id, vehiculo_id, fecha, detalles } = req.body;

      await rutasModelo.update(id, { conductor_id, vehiculo_id, fecha });

      const detallesActuales = await detalleRutaModelo.getAll();
      const detallesDeRuta = detallesActuales.filter(
        (d) => d.id_ruta && d.id_ruta._id.toString() === id
      );
      const detallesIdsEnviado = detalles.filter((d) => d._id);

      await Promise.all(
        detalles.map(async (d) => {
          if (d._id) {
            await detalleRutaModelo.update(d._id, {
              direccion: d.direccion,
              latitud: d.lat,
              longitud: d.lng,
              numero_paquete: d.paquete,
            });
          } else {
            await detalleRutaModelo.create({
              id_ruta: id,
              direccion: d.direccion,
              latitud: d.lat,
              longitud: d.lng,
              numero_paquete: d.paquete,
            });
          }
        })
      );

      const idsEnviados = detalles
        .filter((d) => d._id)
        .map((d) => d._id.toString());
      await Promise.all(
        detallesDeRuta
          .filter((d) => !idsEnviados.includes(d._id.toString()))
          .map((d) => detalleRutaModelo.delete(d._id))
      );

      res.status(200).json({ status: "Ruta y detalles actualizados" });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      const data = await rutasModelo.delete(id);

      await detalleRutaModelo.deleteManyByRuta(id);
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
