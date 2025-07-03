import vehiculosModel from "../models/vehiculos.js";
class vehiculosController {
  constructor() {}
  async create(req, res) {
    try {
      const data = await vehiculosModel.create(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await vehiculosModel.update(id, req.body);
      res.status(200).json({
        status: "ok-update",
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await vehiculosModel.delete(id);
      res.status(206).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getAll(req, res) {
    try {
      const data = await vehiculosModel.getAll();
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await vehiculosModel.getById(id);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default new vehiculosController();
