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
