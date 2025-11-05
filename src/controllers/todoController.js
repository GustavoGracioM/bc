const service = require("../services/todoService")

const controller = {
  async create (req, res) {
    const { description, data } = req.body;
    const newTodo = await service.create({
      description, 
      data 
    });
    res.status(201).json(newTodo);
  },
  async findAll(_req, res) {
    const todo = await service.findAll()
    res.status(200).json({todo})
  },
  async findOne (req, res) {
    const { id } = req.params;
    const todo = await service.findByPk(id)
    res.status(200).json({todo})
  },

  async delete(req, res) {
    const { id } = req.params;
    await service.deleteById(id)
    res.status(204).send()
  },

  async update(req, res) {
    const { id } = req.params;
    const { data, check, position, description } = req.body
    await service.updateById(id, { data, check, position, description })
    res.status(200).json({message: "updated"})
  }
}

module.exports = controller