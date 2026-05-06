const express = require('express');
const router = express.Router();

const notaController = require('../controllers/notaController');
const authMiddleware = require('../middlewares/authMiddleware');

// 🔥 NOVA ROTA: listar todas as notas
router.get('/', authMiddleware, notaController.listarTodos);

// 🔹 outras rotas
router.get('/aluno/:alunoId', authMiddleware, notaController.listarPorAluno);
router.get('/:id', authMiddleware, notaController.buscarPorId);

router.post('/', authMiddleware, notaController.criar);
router.put('/:id', authMiddleware, notaController.atualizar);
router.delete('/:id', authMiddleware, notaController.deletar);

module.exports = router;