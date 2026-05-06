const { conexao } = require("../config/db.js");
const alunoModel = require('../models/alunoModel');

const alunoController = {
  async listar(req, res) {
    try {
      const alunos = await alunoModel.findAll();
      res.json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar alunos' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const aluno = await alunoModel.findById(id);

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      res.json(aluno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
  },

  async listarPorTurma(req, res) {
    try {
      const { turmaId } = req.params;
      const alunos = await alunoModel.findByTurma(turmaId);
      res.json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar alunos da turma' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = req.body;

      if (!nome || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
      }

      const result = await alunoModel.create({ nome, cpf, email, telefone, data_nascimento, turma_id, status });
      res.status(201).json({ message: 'Aluno criado com sucesso', id: result.insertId });
    } catch (error) {
      console.error(error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      res.status(500).json({ error: 'Erro ao criar aluno' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = req.body;

      const aluno = await alunoModel.findById(id);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await alunoModel.update(id, { nome, cpf, email, telefone, data_nascimento, turma_id, status });
      res.json({ message: 'Aluno atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const aluno = await alunoModel.findById(id);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await alunoModel.delete(id);
      res.json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
  },

  async consultarMedias(req, res) {
    try {
      const { id } = req.params;

      const aluno = await alunoModel.findById(id);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      const medias = await alunoModel.getMedias(id);
      res.json({
        aluno: aluno.nome,
        turma: aluno.turma_nome,
        medias
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar médias' });
    }
  }
};

module.exports = alunoController;