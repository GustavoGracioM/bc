const service = require("../services/reelService");

const controller = {
  async create(req, res) {
    try {
      const { description, data, local } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'Arquivo de vídeo é obrigatório.' });
      }

      // Cloudinary já retorna a URL pública
      const url = req.file.path;

      const newReels = await service.create({ description, url, data, local });
      res.status(201).json(newReels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar reel' });
    }
  },

  async findAll(_req, res) {
    try {
      const reels = await service.findAll({ order: [['id', 'DESC']] });
      res.json(reels);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar reels' });
    }
  },

  async findOne(req, res) {
    const { id } = req.params;
    const reel = await service.findByPk(id);
    res.status(200).json({ reel });
  },

  async delete(req, res) {
    const { id } = req.params;
    await service.deleteById(id);
    res.status(204).send();
  },
};

module.exports = controller;
