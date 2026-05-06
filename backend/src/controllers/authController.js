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

      if (!nome || !email || !senha) {
        return res.status(400).json({ msg: "Nome, email e senha são obrigatórios" })
      }

      conn = await db.getConnection();

      const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

      if (rows.length > 0) {
        return res.status(400).json({ msg: "Email já cadastrado" })
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      await conn.query(`INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)`, [nome, email, senhaCriptografada, perfil || "admin"]);

      res.status(201).json({ msg: "Usuário criado com sucesso" })
    } catch (error) {
      res.status(500).json({ msg: "Erro ao registrar", error: error.message })
    } finally {
      if (conn) conn.release();
    }
  },
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Validação básica de entrada
      if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios" });
      }

      // Busca o usuário através do Model
      const usuario = await usuarioModel.buscarPorEmail(email);

      if (!usuario) {
        return res.status(400).json({ msg: "Senha ou usuário não encontrado" });
      }

      // Validação da senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ msg: "Senha inválida" });
      }

      // Geração do Token
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        jwtConfig.secret,
        { expiresIn: "8h" }
      );

      return res.json({ msg: "Login realizado com sucesso", token });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro no servidor durante o login" });
    }
  }
}

module.exports = authController;