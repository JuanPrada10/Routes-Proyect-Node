import mongoose from "mongoose";
import "dotenv/config";
class dbClient {
  constructor() {
    this.conectarBD();
  }
  async conectarBD() {
    try {
      const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}${process.env.SERVER_DB}/routes?retryWrites=true&w=majority`;
      await mongoose.connect(queryString);
      console.log("conectado a la BD");
    } catch (error) {
      console.log("error al conectar la BD : ", error);
    }
  }
  async cerrarConexion() {
    try {
      await mongoose.disconnect();
      console.log("Conexion Cerrada");
    } catch (e) {
      console.log(e);
    }
  }
}
export default new dbClient();
