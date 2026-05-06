const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const app = require('./src/app');

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// 🚨 IMPORTANTE: não subir servidor em teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
}