const turmaModel = require('../models/turmaModel');

const turmaController = {
  async listar(req, res) {
    try {
      const turmas = await turmaModel.findAll();
      res.json(turmas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar turmas' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const turma = await turmaModel.findById(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      res.json(turma);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar turma' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, ano_letivo, professor_id } = req.body;

      if (!nome || !ano_letivo) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }

      const result = await turmaModel.create({ nome, ano_letivo, professor_id });

      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar turma' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const turma = await turmaModel.findById(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      const dadosAtualizados = {
        nome: req.body.nome ?? turma.nome,
        ano_letivo: req.body.ano_letivo ?? turma.ano_letivo,
        professor_id: req.body.professor_id ?? turma.professor_id
      };

      await turmaModel.update(id, dadosAtualizados);

      res.status(200).json({ message: 'Turma atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar turma' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const turma = await turmaModel.findById(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turmaModel.delete(id);

      res.status(200).json({ message: 'Turma deletada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar turma' });
    }
  }
};

module.exports = turmaController;