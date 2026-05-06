const db = require("../config/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt.js");
const usuarioModel = require("../models/usuarioModel.js");

const authController = {
  async registrar(req, res) {
    let conn;

    try {
      const { nome, email, senha, perfil } = req.body;

      // VALIDAÇÃO
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
      }

      conn = await db.getConnection();

      const [rows] = await conn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );

      if (rows.length > 0) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      await conn.query(
        `INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)`,
        [nome, email, senhaCriptografada, perfil || "admin"]
      );

      return res.status(201).json({
        message: "Usuário registrado com sucesso"
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao registrar",
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // VALIDAÇÃO
      if (!email || !senha) {
        return res.status(400).json({
          error: "Email e senha são obrigatórios"
        });
      }

      const usuario = await usuarioModel.buscarPorEmail(email);

      // USUÁRIO NÃO EXISTE
      if (!usuario) {
        return res.status(401).json({
          error: "Email ou senha inválidos"
        });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      // SENHA ERRADA
      if (!senhaValida) {
        return res.status(401).json({
          error: "Email ou senha inválidos"
        });
      }

      // TOKEN
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        jwtConfig.secret,
        { expiresIn: "8h" }
      );

      // RESPOSTA CORRETA (igual ao teste espera)
      return res.status(200).json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro no servidor durante o login"
      });
    }
  }
};

module.exports = authController;