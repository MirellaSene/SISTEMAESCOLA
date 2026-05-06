const express = require("express");

const app = express();
app.use(express.json());

app.get("/mensagem", () => {
    res.status(200).json({msg: "API funcionando"});
});

let usuarios = [
    {id: 1, nome: "João"},
    {id: 2, nome: "Henry"},
    {id: 3, nome: "Mirella"}
]

app.get("/usuarios", (req, res)=>{
    res.status(200).json(usuarios)
})

app.post("/usuarios",()=>{
    const {nome} = req.body;

    if(!nome){
        return res.status(400).json({erro:"O nome é obrigatorio"})
    }

    const novoUsuario = {
        id: usuarios.lenght + 1,
        nome
    };
})
module.exports = app;