import conductoresModelo from "../models/conductores.js";
class conductoresController {
  constructor() {}
  async create(req, res) {
    try {
      const data = await conductoresModelo.create(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await conductoresModelo.update(id, req.body);
      res.status(200).json({ status: "Conductor actualizado" });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      // Verificar si el conductor tiene rutas asociadas
      const rutas = await import("../models/rutas.js").then((m) =>
        m.default.getAll()
      );
      const tieneRutas = rutas.some(
        (r) => r.conductor_id && r.conductor_id._id.toString() === id
      );
      if (tieneRutas) {
        return res
          .status(400)
          .json({
            error:
              "No se puede eliminar el conductor porque tiene rutas asociadas.",
          });
      }
      const data = await conductoresModelo.delete(id);
      res.status(206).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getAll(req, res) {
    try {
      const data = await conductoresModelo.getAll();
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await conductoresModelo.getById(id);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default new conductoresController();
