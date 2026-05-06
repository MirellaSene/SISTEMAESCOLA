const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema Escolar',
      description: 'API para gerenciamento de sistema escolar com alunos, professores, turmas, disciplinas e notas',
      version: '1.0.0',
      contact: {
        name: 'Suporte',
        email: 'suporte@escola.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSPec = swaggerJsdoc(options);

module.exports = swaggerSPec;

