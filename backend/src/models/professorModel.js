const db = require('../config/db.js');

exports.listar = async () => {
    const [rows] = await db.execute("SELECT * FROM professores");
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM professores WHERE id = ?",
        [id]
    );
    return rows[0];
};

exports.criar = async (professor) => {
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

    return result.insertId;
};

exports.atualizar = async (id, professor) => {
    const { nome, email, telefone, especialidade } = professor;

    await db.execute(
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
};

exports.deletar = async (id) => {
    await db.execute(
        "DELETE FROM professores WHERE id = ?",
        [id]
    );
};