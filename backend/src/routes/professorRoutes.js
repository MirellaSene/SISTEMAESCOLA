const express = require("express");
const router = express.Router();

const professorController = require("../controllers/professorController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// LISTAR
router.get("/", authMiddleware, professorController.listar);

// BUSCAR POR ID
router.get("/:id", authMiddleware, professorController.buscarPorId);

// CRIAR
router.post("/", authMiddleware, professorController.criar);

// ATUALIZAR
router.put("/:id", authMiddleware, professorController.atualizar);

// DELETAR
router.delete("/:id", authMiddleware, professorController.deletar);

module.exports = router;