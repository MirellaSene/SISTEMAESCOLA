const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

router.get('/', authMiddleware, usuarioController.listar);
router.get('/:id', authMiddleware, usuarioController.buscarPorId);
router.put('/:id', authMiddleware, usuarioController.atualizar);
router.delete('/:id', authMiddleware, usuarioController.deletar);

module.exports = router;