const db = require('../config/db.js');

const turmaModel = {
  async findAll() {
    const [rows] = await db.execute(`
      SELECT t.*, p.nome as professor_nome 
      FROM turmas t
      LEFT JOIN professores p ON t.professor_id = p.id
      ORDER BY t.ano_letivo DESC, t.nome
    `);
    return rows;
  },
  
  async findById(id) {
    const [rows] = await db.execute(`
      SELECT t.*, p.nome as professor_nome 
      FROM turmas t
      LEFT JOIN professores p ON t.professor_id = p.id
      WHERE t.id = ?
    `, [id]);
    return rows[0];
  },
  
  async create(turma) {
    const { nome, ano_letivo, professor_id } = turma;
    const [result] = await db.execute(
      'INSERT INTO turmas (nome, ano_letivo, professor_id) VALUES (?, ?, ?)',
      [nome, ano_letivo, professor_id]
    );
    return result;
  },
  
  async update(id, turma) {
    const { nome, ano_letivo, professor_id } = turma;
    const [result] = await db.execute(
      'UPDATE turmas SET nome = ?, ano_letivo = ?, professor_id = ? WHERE id = ?',
      [nome, ano_letivo, professor_id, id]
    );
    return result;
  },
  
  async delete(id) {
    const [result] = await db.execute('DELETE FROM turmas WHERE id = ?', [id]);
    return result;
  }
};

module.exports = turmaModel;