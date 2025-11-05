const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'joker-videos',
    resource_type: 'video', // ⚠️ Importante! Permite vídeos
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
  },
});

const upload = multer({ storage });

module.exports = upload;
