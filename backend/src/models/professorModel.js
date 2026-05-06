const db = require('../config/db.js');

const professorModel = {
  async findAll() {
    const [rows] = await db.execute(`
      SELECT * FROM professores
      ORDER BY id DESC
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM professores WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  // 🔥 NOVO: buscar professor por nome (usado na turma)
  async findByNome(nome) {
    const [rows] = await db.execute(
      `SELECT * FROM professores WHERE nome = ? LIMIT 1`,
      [nome]
    );
    return rows[0];
  },

  async create(professor) {
    const { nome, email, telefone, especialidade } = professor;

    const [result] = await db.execute(
      `INSERT INTO professores (nome, email, telefone, especialidade)
       VALUES (?, ?, ?, ?)`,
      [
        nome ?? null,
        email ?? null,
        telefone ?? null,
        especialidade ?? null
      ]
    );

    return result;
  },

  async update(id, professor) {
    const { nome, email, telefone, especialidade } = professor;

    const [result] = await db.execute(
      `UPDATE professores 
       SET nome = ?, email = ?, telefone = ?, especialidade = ?
       WHERE id = ?`,
      [
        nome ?? null,
        email ?? null,
        telefone ?? null,
        especialidade ?? null,
        id
      ]
    );

    return result;
  },

  async delete(id) {
    const [result] = await db.execute(
      `DELETE FROM professores WHERE id = ?`,
      [id]
    );
    return result;
  }
};

module.exports = professorModel;