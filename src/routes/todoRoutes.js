const express = require('express');
const postController = require('../controllers/todoController');

const router = express.Router();

const url = '/todo'

router.post(url, postController.create)
router.get(url, postController.findAll)
router.delete('/todo/:id', postController.delete)
router.get('/todo/:id', postController.findOne)
router.put('/todo/:id', postController.update)

module.exports = router;


