import mongoose from "mongoose";
import DetalleRuta from "../schemas/detalleRuta.js";

class DetalleRutaModelo {
  constructor() {}

  // Crear múltiples puntos de entrega para una ruta
  async createMany(rutaId, detalles) {
    const detallesConRuta = detalles.map((detalle) => ({
      ...detalle,
      id_ruta: new mongoose.Types.ObjectId(rutaId),
    }));
    return await DetalleRuta.insertMany(detallesConRuta);
  }

  // Obtener todos los puntos de una ruta
  async getByRutaId(rutaId) {
    return await DetalleRuta.find({ id_ruta: rutaId });
  }

  // (opcional) Eliminar todos los detalles de una ruta
  async deleteByRutaId(rutaId) {
    return await DetalleRuta.deleteMany({ id_ruta: rutaId });
  }
}

export default new DetalleRutaModelo();
