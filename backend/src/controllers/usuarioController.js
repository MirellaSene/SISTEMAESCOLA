const usuarioModel = require("../models/usuarioModel.js");

const usuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },
  
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioModel.findById(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },
  
  async criar(req, res) {
    try {
      const { nome, email, senha, perfil } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
      }
      
      const result = await usuarioModel.create({ nome, email, senha, perfil });
      res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId });
    } catch (error) {
      console.error(error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },
  
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, perfil } = req.body;
      
      const usuario = await usuarioModel.findById(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      await usuarioModel.update(id, { nome, email, perfil });
      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
  
  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const usuario = await usuarioModel.findById(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      await usuarioModel.delete(id);
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};

module.exports = usuarioController;