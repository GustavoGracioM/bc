const express = require('express');
const reelController = require('../controllers/reelController');
// const upload = require('../utils/uploadVideo');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = require('../middlewares/uploadVideo');

const router = express.Router();

const url = '/reels'

router.post(url, upload.single('file'), reelController.create)
router.get(url, reelController.findAll)
router.delete('/reels/:id', reelController.delete)
router.get('/reels/:id', reelController.findOne)

module.exports = router;


