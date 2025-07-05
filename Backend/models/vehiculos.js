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
  async getById(placa) {
    return await Vehiculo.findOne({ placa });
  }
  async update(placa, vehiculo) {
    return await Vehiculo.findOneAndUpdate({ placa }, vehiculo, { new: true });
  }
  async delete(placa) {
    return await Vehiculo.findOneAndDelete({ placa });
  }
}
export default new vehiculosModelo();
