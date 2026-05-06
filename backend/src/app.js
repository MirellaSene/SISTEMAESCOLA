const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const professorRoutes = require('./routes/professorRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const notaRoutes = require('./routes/notaRoutes');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sistema-de-escola.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/professores', professorRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/turmas', turmaRoutes);
app.use('/alunos', alunoRoutes);
app.use('/notas', notaRoutes);

// ROOT
app.get('/', (req, res) => {
  res.json({ message: 'API rodando 🚀' });
});

module.exports = app;