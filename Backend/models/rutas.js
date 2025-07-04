import mongoose from "mongoose";
import Ruta from "../schemas/rutas.js";
class RutaModelo {
  constructor() {}

  async create(ruta) {
    return await Ruta.create(ruta);
  }
  async getAll() {
    return await Ruta.find();
  }
  async getById(id) {
    return await Ruta.findById({ _id: new mongoose.Types.ObjectId(id) });
  }
  async update(id, ruta) {
    return await Ruta.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      ruta,
      { new: true }
    );
  }
  async delete(id) {
    return await Ruta.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
export default new RutaModelo();
