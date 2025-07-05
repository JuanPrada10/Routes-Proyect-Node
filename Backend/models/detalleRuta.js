import mongoose from "mongoose";
import DetalleRuta from "../schemas/detalleRuta.js";

class DetalleRutaModelo {
  constructor() {}

  async create(detalleRuta) {
    return await DetalleRuta.create(detalleRuta);
  }
  async getAll() {
    return await DetalleRuta.find().populate({
      path: 'id_ruta',
      populate: [
        { path: 'conductor_id', model: 'conductores' },
        { path: 'vehiculo_id', model: 'vehiculos' }
      ]
    });
  }
  async getById(id) {
    return await DetalleRuta.findById(id).populate({
      path: 'id_ruta',
      populate: [
        { path: 'conductor_id', model: 'conductores' },
        { path: 'vehiculo_id', model: 'vehiculos' }
      ]
    });
  }
  async update(id, detalleRuta) {
    return await DetalleRuta.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      detalleRuta,
      { new: true }
    );
  }
  async delete(id) {
    return await DetalleRuta.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}

export default new DetalleRutaModelo();
