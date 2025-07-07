import mongoose from "mongoose";
import Ruta from "../schemas/rutas.js";
class RutaModelo {
  constructor() {}

  async create(ruta) {
    return await Ruta.create(ruta);
  }
  async getAll() {
    return await Ruta.find({ activo: true })
      .populate("conductor_id")
      .populate("vehiculo_id");
  }
  async getById(id) {
    return await Ruta.findById(new mongoose.Types.ObjectId(id))
      .populate("conductor_id")
      .populate("vehiculo_id");
  }
  async update(id, ruta) {
    return await Ruta.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      ruta,
      { new: true }
    );
  }
  async delete(id) {
    return await Ruta.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { activo: false },
      { new: true }
    );
  }
}
export default new RutaModelo();
