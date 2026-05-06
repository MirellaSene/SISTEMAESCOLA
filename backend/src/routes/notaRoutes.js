const express = require('express');
const router = express.Router();

const notaController = require('../controllers/notaController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gerenciamento de notas
 */

router.get('/', authMiddleware, notaController.listar);

/**
 * @swagger
 * /notas/aluno/{alunoId}:
 *   get:
 *     summary: Listar notas por aluno
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/aluno/:alunoId', authMiddleware, notaController.listarPorAluno);

router.get('/:id', authMiddleware, notaController.buscarPorId);
router.post('/', authMiddleware, notaController.criar);
router.put('/:id', authMiddleware, notaController.atualizar);
router.delete('/:id', authMiddleware, notaController.deletar);

module.exports = router;