const db = require('../config/db.js');

const notaModel = {
  async findAll() {
    const [rows] = await db.execute(`
      SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome 
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      ORDER BY n.id DESC
    `);
    return rows;
  },
  
  async findById(id) {
    const [rows] = await db.execute(`
      SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome 
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.id = ?
    `, [id]);
    return rows[0];
  },
  
  async findByAluno(alunoId) {
    const [rows] = await db.execute(`
      SELECT n.*, d.nome as disciplina_nome 
      FROM notas n
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.aluno_id = ?
      ORDER BY n.bimestre
    `, [alunoId]);
    return rows;
  },
  
  async create(nota) {
    const { aluno_id, disciplina_id, nota: valor, bimestre, observacao } = nota;

    const [result] = await db.execute(
      `INSERT INTO notas (aluno_id, disciplina_id, nota, bimestre, observacao)
       VALUES (?, ?, ?, ?, ?)`,
      [
        aluno_id ?? null,
        disciplina_id ?? null,
        valor ?? null,
        bimestre ?? null,
        observacao ?? null
      ]
    );

    return result;
  },
  
  async update(id, nota) {
    const { aluno_id, disciplina_id, nota: valor, bimestre, observacao } = nota;

    const [result] = await db.execute(
      `UPDATE notas 
       SET aluno_id = ?, disciplina_id = ?, nota = ?, bimestre = ?, observacao = ?
       WHERE id = ?`,
      [
        aluno_id ?? null,
        disciplina_id ?? null,
        valor ?? null,
        bimestre ?? null,
        observacao ?? null,
        id
      ]
    );

    return result;
  },
  
  async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM notas WHERE id = ?',
      [id]
    );
    return result;
  }
};

module.exports = notaModel;