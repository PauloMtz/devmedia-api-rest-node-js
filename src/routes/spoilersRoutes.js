const express = require('express');
const controller = require('../controller/spoilerController');

const router = express.Router();

// será uma rota para cada evento do spoilerController
router.get('/spoilers/:id', controller.buscarPorId);
router.get('/spoilers', controller.listaPaginada);
router.post('/spoilers', controller.inserir);
router.put('/spoilers/:id', controller.atualizar);
router.delete('/spoilers/:id', controller.excluir);

// exporta para ser usado na aplicação [ deve ser puxado no app.js ]
module.exports = router;