const express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller')

router.get('/', postController.listar)
router.get('/search', postController.procurar)
router.get('/:id', postController.buscarPorId)
router.post('/', postController.inserir)
router.put('/:id', postController.atualizar)
router.delete('/:id', postController.deletar)

module.exports = router;