const db = require('../config/db.js');
const bcrypt = require('bcryptjs');

const usuarioModel = {
  async findAll() {
    const [rows] = await db.execute('SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY id DESC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, nome, email, perfil, criado_em FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  async buscarPorEmail(email) {
    let conn;
    try {
      conn = await db.getConnection();
      const [rows] = await conn.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  async create(nome, email, senhaCriptografada, perfil) {
    let conn;
    try {
      conn = await db.getConnection();
      const query = `INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)`;
      const values = [nome, email, senhaCriptografada, perfil || "admin"];

      const [result] = await conn.query(query, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  async update(id, usuario) {
    const { nome, email, perfil } = usuario;
    const [result] = await db.execute(
      'UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?',
      [nome, email, perfil, id]
    );
    return result;
  },

  async updateSenha(id, senha) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const [result] = await db.execute(
      'UPDATE usuarios SET senha = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result;
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result;
  }
};

module.exports = usuarioModel;