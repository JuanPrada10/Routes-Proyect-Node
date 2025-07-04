import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  conductor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conductores", // nombre exacto del modelo
    required: true,
  },
  vehiculo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehiculos", // este modelo debe usar _id (más abajo te muestro cómo)
    required: true,
  },
});

export default mongoose.model("rutas", rutaSchema);
