import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  capacidad_carga: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("vehiculos", vehiculoSchema);
