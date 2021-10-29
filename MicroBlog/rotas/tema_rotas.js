const express = require('express');
const router = express.Router();
const temaController = require('../controller/tema_controller')

router.get('/', temaController.listar);
router.post('/', temaController.inserir);
router.get('/:id', temaController.buscarPorId);
router.put('/:id', temaController.atualizar);
router.delete('/:id', temaController.deletar);
//router.get('/search', temaController.procurar)

module.exports = router;