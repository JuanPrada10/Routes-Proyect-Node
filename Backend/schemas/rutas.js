import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  conductor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conductores",
    required: true,
  },
  vehiculo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehiculos",
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("rutas", rutaSchema);
