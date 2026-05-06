const db = require('../config/db');

// 🔹 LISTAR TODAS AS NOTAS
async function listarTodos(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM notas
    `);

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 LISTAR POR ALUNO
async function listarPorAluno(req, res) {
  try {
    const { alunoId } = req.params;

    const [rows] = await db.execute(
      `SELECT * FROM notas WHERE aluno_id = ?`,
      [alunoId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 BUSCAR POR ID
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT * FROM notas WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 CRIAR NOTA
async function criar(req, res) {
  try {
    const { aluno_id, disciplina_id, nota, bimestre } = req.body;

    const result = await db.execute(
      `INSERT INTO notas (aluno_id, disciplina_id, nota, bimestre)
       VALUES (?, ?, ?, ?)`,
      [aluno_id, disciplina_id, nota, bimestre]
    );

    return res.status(201).json({
      message: "Nota criada com sucesso",
      id: result[0].insertId
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 ATUALIZAR NOTA
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nota } = req.body;

    const [result] = await db.execute(
      `UPDATE notas SET nota = ? WHERE id = ?`,
      [nota, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    return res.status(200).json({ message: "Nota atualizada com sucesso" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 DELETAR NOTA
async function deletar(req, res) {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      `DELETE FROM notas WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    return res.status(200).json({ message: "Nota deletada com sucesso" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarTodos,
  listarPorAluno,
  buscarPorId,
  criar,
  atualizar,
  deletar
};