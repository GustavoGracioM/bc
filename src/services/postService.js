const models = require('../../db/models/index.js')
const fs = require('fs');
const path = require('path');


const { Post, Img } = models

const service = {
  async create({ legend, local, data, urls }) {
    const post = await Post.create({ legend, data, local });
  
    const images = await Promise.all(urls.map(url => Img.create({ url: url.original }))); 
    
    await Promise.all(images.map(img => {
      return models.PostImg.create({ postId: post.id, imgId: img.id });
    }));
  },
  async findAll() {
    return await Post.findAll({
      include: [{
        model: Img,
        as: 'images', // se tiver alias
        through: { attributes: [] }
      }],
      order: [
        ['data', 'DESC'],          // primeiro ordena pela data (mais recente primeiro)
        ['id', 'DESC'],            // depois pelos IDs do post (mais novo primeiro se for mesmo dia)
        [{ model: Img, as: 'images' }, 'id', 'ASC'] // imagens em ordem crescente de ID
      ]
    });
  },
  async findByPk(id) {
    return await Post.findByPk(id, {
      include: {
        model: Img,
        as: 'images',
        through: { attributes: [] },
        order: [['id', 'ASC']]
      }
    })
  },

  async deleteById(id) {
    const post = await Post.findByPk(id, {
      include: {
        model: Img,
        as: 'images',
        through: { attributes: [] },
      },
    });
    if (!post) throw new Error('Post não encontrado');
    for (const image of post.images) {
      // Aqui extrai só o nome do arquivo, mesmo se for URL completa
      const filename = path.basename(image.url); 
      const imagePath = path.join(__dirname, '../uploads', filename);
  
      // Só tenta deletar se o arquivo realmente existir
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  
    await post.removeImages(post.images); // remove relação
    await Post.destroy({ where: { id } });
  }
}

module.exports = service;