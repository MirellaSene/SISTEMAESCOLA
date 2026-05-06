import express from "express"
import cors from "cors"
import { db } from "./db.js"

const app = express()


app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Bom dia povo🩷🩷🩷🩷" })
})

app.get("/alunos", async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM tbAluno"
        )

        res.status(200).json(rows)
    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

app.get("/alunos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        const [rows] = await db.execute(
            "SELECT * FROM tbAluno WHERE aluno_id = ?",
            [id]
        )

        if (rows.length === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" })
        }

        res.status(200).json(rows[0])

    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

app.post("/alunos", async (req, res) => {
    try {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({
                msg: "Nome é obrigatório"
            })
        }

        await db.execute(
            "INSERT INTO tbAluno (aluno_nome) VALUES (?)",
            [nome]
        )

        res.status(201).json({
            msg: "Aluno cadastrado com sucesso"
        })

    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

app.delete("/alunos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        const [result] = await db.execute(
            "DELETE FROM tbAluno WHERE aluno_id = ?",
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                msg: "Aluno não encontrado"
            })
        }

        res.status(200).json({
            msg: "Aluno excluído com sucesso"
        })

    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

app.put("/alunos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({
                msg: "Nome é obrigatório"
            })
        }

        const [result] = await db.execute(
            "UPDATE tbAluno SET aluno_nome = ? WHERE aluno_id = ?",
            [nome, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                msg: "Aluno não encontrado"
            })
        }

        res.status(200).json({
            msg: "Aluno atualizado com sucesso"
        })

    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

app.listen(5000, () => {
    console.log("🚀 Servidor rodando em http://localhost:5000")
})