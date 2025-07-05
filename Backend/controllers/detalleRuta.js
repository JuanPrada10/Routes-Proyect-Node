import detallerutaModelo from "../models/detalleRuta.js";
class DetalleRutasController {
  constructor() {}

  async create(req, res) {
    try {
      const data = await detallerutaModelo.create(req.body);

      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await detallerutaModelo.update(id, req.body);
      res.status(200).json({ status: " actualizado" });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await detallerutaModelo.delete(id);
      res.status(206).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getAll(req, res) {
    try {
      const data = await detallerutaModelo.getAll();
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await detallerutaModelo.getById(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new DetalleRutasController();
