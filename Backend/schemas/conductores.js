import mongoose from "mongoose";

const conductorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  numero_licencia: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
});

export default mongoose.model("conductores", conductorSchema);
