const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turmaController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

router.get('/', authMiddleware, turmaController.listar);
router.get('/:id', authMiddleware, turmaController.buscarPorId);
router.post('/', authMiddleware, turmaController.criar);
router.put('/:id', authMiddleware, turmaController.atualizar);
router.delete('/:id', authMiddleware, turmaController.deletar);

module.exports = router;