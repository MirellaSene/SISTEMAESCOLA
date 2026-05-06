const notaModel = require('../models/notaModel');

const notaController = {
  async listar(req, res) {
    try {
      const notas = await notaModel.findAll();
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar notas' });
    }
  },
  
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const nota = await notaModel.findById(id);
      
      if (!nota) {
        return res.status(404).json({ error: 'Nota não encontrada' });
      }
      
      res.json(nota);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar nota' });
    }
  },
  
  async listarPorAluno(req, res) {
    try {
      const { alunoId } = req.params;
      const notas = await notaModel.findByAluno(alunoId);
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar notas do aluno' });
    }
  },
  
  async criar(req, res) {
    try {
      const { aluno_id, disciplina_id, nota, bimestre, observacao } = req.body;
      
      if (!aluno_id || !disciplina_id || !nota || !bimestre) {
        return res.status(400).json({ error: 'Aluno, disciplina, nota e bimestre são obrigatórios' });
      }
      
      if (nota < 0 || nota > 10) {
        return res.status(400).json({ error: 'Nota deve estar entre 0 e 10' });
      }
      
      const result = await notaModel.create({ aluno_id, disciplina_id, nota, bimestre, observacao });
      res.status(201).json({ message: 'Nota criada com sucesso', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nota' });
    }
  },
  
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { aluno_id, disciplina_id, nota, bimestre, observacao } = req.body;
      
      const notaExistente = await notaModel.findById(id);
      if (!notaExistente) {
        return res.status(404).json({ error: 'Nota não encontrada' });
      }
      
      if (nota && (nota < 0 || nota > 10)) {
        return res.status(400).json({ error: 'Nota deve estar entre 0 e 10' });
      }
      
      await notaModel.update(id, { aluno_id, disciplina_id, nota, bimestre, observacao });
      res.json({ message: 'Nota atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar nota' });
    }
  },
  
  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const nota = await notaModel.findById(id);
      if (!nota) {
        return res.status(404).json({ error: 'Nota não encontrada' });
      }
      
      await notaModel.delete(id);
      res.json({ message: 'Nota deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar nota' });
    }
  }
};

module.exports = notaController;