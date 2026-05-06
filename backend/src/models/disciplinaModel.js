const db = require('../config/db.js');

const disciplinaModel = {
  async findAll() {
    const [rows] = await db.execute('SELECT * FROM disciplinas ORDER BY id DESC');
    return rows;
  },
  
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM disciplinas WHERE id = ?', [id]);
    return rows[0];
  },
  
  async create(disciplina) {
    const { nome, carga_horaria } = disciplina;
    const [result] = await db.execute(
      'INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)',
      [nome, carga_horaria]
    );
    return result;
  },
  
  async update(id, disciplina) {
    const { nome, carga_horaria } = disciplina;
    const [result] = await db.execute(
      'UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE id = ?',
      [nome, carga_horaria, id]
    );
    return result;
  },
  
  async delete(id) {
    const [result] = await db.execute('DELETE FROM disciplinas WHERE id = ?', [id]);
    return result;
  }
};

module.exports = disciplinaModel;