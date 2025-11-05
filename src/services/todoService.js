const models = require('../../db/models/index.js')


const { Todo } = models

const service = {
  async getNextPosition() {
    const max = await Todo.max('position');
    return (max || 0) + 1;
  },

  async create({ description, data }) {
    const position = await this.getNextPosition();
    const post = await Todo.create({ description, data, check: false, position });
    return post;
  },

  async findAll() {
    return await Todo.findAll({
      order: [['position', 'ASC']]
    });
  },

  async findByPk(id) {
    return await Todo.findByPk(id)
  },

  async deleteById(id) {
    const todo = await Todo.findByPk(Number(id));
    if (!todo) throw new Error('ToDo não encontrado');
    await Todo.destroy({ where: { id: Number(id) } });
  },
  async updateById(id, { description, data, check, position }) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new Error('ToDo não encontrado');

  // Faz a atualização dos campos enviados (parciais ou completos)
  await todo.update({
    description: description !== undefined ? description : todo.description,
    data: data !== undefined ? data : todo.data,
    check: check !== undefined ? check : todo.check,
    position: position !== undefined ? position : todo.position
  });

  return todo;
}
}



module.exports = service;