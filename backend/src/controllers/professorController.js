let professores = [];

function listar(req, res) {
  res.json(professores);
}

function buscarPorId(req, res) {
  const prof = professores.find(p => p.id == req.params.id);
  if (!prof) return res.status(404).json({ erro: "Não encontrado" });

  res.json(prof);
}

function criar(req, res) {
  const novo = {
    id: Date.now(),
    ...req.body
  };

  professores.push(novo);

  // 🔥 CORREÇÃO AQUI
  res.status(201).json(novo);
}

function atualizar(req, res) {
  const index = professores.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  professores[index] = { ...professores[index], ...req.body };

  res.json(professores[index]);
}

function deletar(req, res) {
  professores = professores.filter(p => p.id != req.params.id);

  res.status(200).json({ mensagem: "Deletado" });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};