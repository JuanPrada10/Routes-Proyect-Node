import mongoose from "mongoose";

const detalleRutaSchema = new mongoose.Schema({
  id_ruta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rutas",
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  numero_paquete: {
    type: String,
    required: true,
  },
});

export default mongoose.model("detallesRuta", detalleRutaSchema);
