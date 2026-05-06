const db = require('../config/db.js');

const alunoModel = {
  async findAll() {
    const [rows] = await db.execute(`
      SELECT a.*, t.nome as turma_nome, t.ano_letivo 
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
      ORDER BY a.id DESC
    `);
    return rows;
  },
  
  async findById(id) {
    const [rows] = await db.execute(`
      SELECT a.*, t.nome as turma_nome, t.ano_letivo 
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
      WHERE a.id = ?
    `, [id]);
    return rows[0];
  },
  
  async findByTurma(turmaId) {
    const [rows] = await db.execute(`
      SELECT a.*, t.nome as turma_nome 
      FROM alunos a
      INNER JOIN turmas t ON a.turma_id = t.id
      WHERE a.turma_id = ?
      ORDER BY a.nome
    `, [turmaId]);
    return rows;
  },
  
  async create(aluno) {
    const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = aluno;
    const [result] = await db.execute(
      'INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento, turma_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, cpf, email, telefone, data_nascimento, turma_id, status || 'ativo']
    );
    return result;
  },
  
  async update(id, aluno) {
    const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = aluno;
    const [result] = await db.execute(
      'UPDATE alunos SET nome = ?, cpf = ?, email = ?, telefone = ?, data_nascimento = ?, turma_id = ?, status = ? WHERE id = ?',
      [nome, cpf, email, telefone, data_nascimento, turma_id, status, id]
    );
    return result;
  },
  
  async delete(id) {
    const [result] = await db.execute('DELETE FROM alunos WHERE id = ?', [id]);
    return result;
  },
  
  async getMedias(alunoId) {
    const [rows] = await db.execute(`
      SELECT 
        d.nome as disciplina,
        AVG(n.nota) as media,
        COUNT(n.id) as total_notas,
        MAX(n.nota) as maior_nota,
        MIN(n.nota) as menor_nota
      FROM notas n
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.aluno_id = ?
      GROUP BY d.id, d.nome
    `, [alunoId]);
    return rows;
  }
};

module.exports = alunoModel;