const disciplinaModel = require('../models/disciplinaModel');

const disciplinaController = {
  async listar(req, res) {
    try {
      const disciplinas = await disciplinaModel.findAll();
      res.json(disciplinas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar disciplinas' });
    }
  },
  
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await disciplinaModel.findById(id);
      
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
      
      res.json(disciplina);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar disciplina' });
    }
  },
  
  async criar(req, res) {
    try {
      const { nome, carga_horaria } = req.body;
      
      if (!nome || !carga_horaria) {
        return res.status(400).json({ error: 'Nome e carga horária são obrigatórios' });
      }
      
      const result = await disciplinaModel.create({ nome, carga_horaria });
      res.status(201).json({ message: 'Disciplina criada com sucesso', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar disciplina' });
    }
  },
  
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, carga_horaria } = req.body;
      
      const disciplina = await disciplinaModel.findById(id);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
      
      await disciplinaModel.update(id, { nome, carga_horaria });
      res.json({ message: 'Disciplina atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar disciplina' });
    }
  },
  
  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const disciplina = await disciplinaModel.findById(id);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
      
      await disciplinaModel.delete(id);
      res.json({ message: 'Disciplina deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar disciplina' });
    }
  }
};

module.exports = disciplinaController;