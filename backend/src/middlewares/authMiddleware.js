const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt.js");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token);

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    console.log("TOKEN DECODED:", decoded);

    req.usuario = decoded;
    next();
  } catch (error) {
    console.log("ERRO JWT:", error.message);

    return res.status(401).json({ mensagem: "Token inválido" });
  }
};

module.exports = verificarToken;