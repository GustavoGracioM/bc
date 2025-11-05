const service = require("../services/postService")

const port = process.env.API_PORT || 3001; 

const controller = {
  async create (req, res) {
    try {
      const { legend, local, data, urls } = req.body;
      
      console.log(legend, local, data, urls)
      const novoPost = await service.create({
        legend,
        local,
        data,
        urls
      });
  
      res.status(201).json(novoPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async findAll(req, res) {
    const posts = await service.findAll()
    res.status(200).json({posts})
  },
  async findOne (req, res) {
    const { id } = req.params;
    const post = await service.findByPk(id)
    res.status(200).json({post})
  },
  async delete(req, res) {
    const { id } = req.params;
    const { status, message } = await service.deleteById(id)
    res.status(status).json({message})
  },
  uploadImg: (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    // o multer-storage-cloudinary já faz o upload e devolve a URL
    const imageUrl = req.file.path; 

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = controller