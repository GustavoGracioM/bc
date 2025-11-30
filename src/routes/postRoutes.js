const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const postController = require('../controllers/postController');
const upload = require('../middlewares/uploadImage');

const router = express.Router();

// Upload de imagem
router.post('/upload', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }
    console.log(req)
    // Retorna só o caminho da imagem (que o frontend vai usar depois)
    res.status(200).json({ path: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const url = '/posts'

router.post(url, postController.create)
router.get(url, postController.findAll)
router.delete('/post/:id', postController.delete)
router.get('/post/:id', postController.findOne)

module.exports = router;


