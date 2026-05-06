const request = require('supertest');
const app = require('../app');

let authToken;
let disciplinaId;

beforeAll(async () => {
  await request(app).post('/auth/registrar').send({
    nome: 'Teste',
    email: 'teste@email.com',
    senha: '123456'
  });

  const login = await request(app).post('/auth/login').send({
    email: 'teste@email.com',
    senha: '123456'
  });

  authToken = login.body.token;
});

describe('Disciplinas CRUD', () => {

  test('Criar disciplina', async () => {
    const res = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ nome: 'Matemática', carga_horaria: 60 });

    disciplinaId = res.body.id;
    expect(res.status).toBe(201);
  });

  test('Listar disciplinas', async () => {
    const res = await request(app)
      .get('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });

});