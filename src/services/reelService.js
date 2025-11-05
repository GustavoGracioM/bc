const models = require('../../db/models/index.js')

const { Reels } = models

const service = {

  async create({ description, data, url, local }) {
    const reels = await Reels.create({ description, data, url, local });
    return reels;
  },

  async findAll() {
    return await Reels.findAll({
      order: [['data', 'ASC']]
    });
  },

  async findByPk(id) {
    return await Reels.findByPk(id)
  },

  async deleteById(id) {
    const reel = await Reels.findByPk(Number(id));
    if (!reel) throw new Error('Reels não encontrado');
    await Reels.destroy({ where: { id: Number(id) } });
  },
}



module.exports = service;