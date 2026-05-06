const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerSPec = require('./src/config/swagger');
const app = require('./src/app');

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSPec));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});