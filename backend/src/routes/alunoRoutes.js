const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Listar todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
router.get('/', authMiddleware, alunoController.listar);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Buscar aluno por ID
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do aluno
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', authMiddleware, alunoController.buscarPorId);

/**
 * @swagger
 * /alunos/turma/{turmaId}:
 *   get:
 *     summary: Listar alunos por turma
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de alunos da turma
 *       401:
 *         description: Não autorizado
 */
router.get('/turma/:turmaId', authMiddleware, alunoController.listarPorTurma);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Criar novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               turma_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [ativo, inativo]
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, alunoController.criar);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', authMiddleware, alunoController.atualizar);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deletar aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno deletado
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', authMiddleware, alunoController.deletar);

/**
 * @swagger
 * /alunos/{id}/medias:
 *   get:
 *     summary: Consultar médias do aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médias do aluno
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id/medias', authMiddleware, alunoController.consultarMedias);

module.exports = router;