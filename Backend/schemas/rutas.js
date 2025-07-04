import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  conductor_id: {
    type: String,
    ref: "Conductor",
    required: true,
  },
  vehiculo_placa: {
    type: String,
    ref: "Vehiculo",
    required: true,
  },
});

export default mongoose.model("rutas", rutaSchema);
