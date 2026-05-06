const turmaModel = require('../models/turmaModel');
const professorModel = require('../models/professorModel');

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
      const {
        nome,
        ano_letivo,
        anoLetivo,
        professor_id,
        professorId,
        professor,       
        professor_nome     
      } = req.body;

      const anoFinal = ano_letivo ?? anoLetivo;

      let professorFinal =
        professor_id ??
        professorId ??
        null;

      const nomeProfessor = professor ?? professor_nome;

      if (!professorFinal && nomeProfessor) {
        const prof = await professorModel.findByNome(nomeProfessor);

        if (!prof) {
          return res.status(400).json({
            error: 'Professor não encontrado'
          });
        }

        professorFinal = prof.id;
      }

      if (!nome || !anoFinal) {
        return res.status(400).json({
          error: 'Campos obrigatórios faltando'
        });
      }

      const result = await turmaModel.create({
        nome,
        ano_letivo: anoFinal,
        professor_id: professorFinal
      });

      res.status(201).json({
        message: 'Turma criada com sucesso',
        id: result.insertId
      });

    } catch (error) {
      console.error("🔥 ERRO AO CRIAR TURMA:", error);

      res.status(500).json({
        error: error.message,
        sql: error.sqlMessage || null
      });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const turma = await turmaModel.findById(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      const {
        nome,
        ano_letivo,
        anoLetivo,
        professor_id,
        professorId,
        professor,
        professor_nome
      } = req.body;

      let professorFinal =
        professor_id ??
        professorId ??
        turma.professor_id;

      const nomeProfessor = professor ?? professor_nome;

      if ((!professor_id && !professorId) && nomeProfessor) {
        const prof = await professorModel.findByNome(nomeProfessor);

        if (prof) {
          professorFinal = prof.id;
        }
      }

      const dadosAtualizados = {
        nome: nome ?? turma.nome,
        ano_letivo: (ano_letivo ?? anoLetivo) ?? turma.ano_letivo,
        professor_id: professorFinal
      };

      await turmaModel.update(id, dadosAtualizados);

      res.status(200).json({
        message: 'Turma atualizada com sucesso'
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao atualizar turma'
      });
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

      res.status(200).json({
        message: 'Turma deletada'
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao deletar turma'
      });
    }
  }
};

module.exports = turmaController;