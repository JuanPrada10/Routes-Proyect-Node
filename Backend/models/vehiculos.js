import mongoose from "mongoose";
import Vehiculo from "../schemas/vehiculos.js";
class vehiculosModelo {
  constructor() {}

  async create(vehiculo) {
    return await Vehiculo.create(vehiculo);
  }
  async getAll() {
    return await Vehiculo.find();
  }
  async getById(id) {
    return await Vehiculo.findById({ _id: new mongoose.Types.ObjectId(id) });
  }
  async update(id, vehiculo) {
    return await Vehiculo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      vehiculo,
      { new: true }
    );
  }
  async delete(id) {
    return await Vehiculo.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
export default new vehiculosModelo();
