const express = require('express');
const router = express.Router();

const disciplinaController = require('../controllers/disciplinaController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: Gerenciamento de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Listar disciplinas
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, disciplinaController.listar);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Buscar disciplina por ID
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authMiddleware, disciplinaController.buscarPorId);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Criar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, disciplinaController.criar);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualizar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, disciplinaController.atualizar);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Deletar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, disciplinaController.deletar);

module.exports = router;