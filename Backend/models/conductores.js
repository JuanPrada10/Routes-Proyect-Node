import mongoose from "mongoose";
import Conductor from "../schemas/conductores.js";
class conductoresModelo {
  constructor() {}

  async create(conductor) {
    return await Conductor.create(conductor);
  }
  async getAll() {
    return await Conductor.find();
  }
  async getById(id) {
    return await Conductor.findById({ _id: new mongoose.Types.ObjectId(id) });
  }
  async update(id, conductor) {
    return await Conductor.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      conductor,
      { new: true }
    );
  }
  async delete(id) {
    return await Conductor.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
export default new conductoresModelo();
