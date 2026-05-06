const request = require('supertest');
const app = require('../app');

let authToken;
let professorId;

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

describe('Professores CRUD', () => {

  test('Criar professor', async () => {
    const res = await request(app)
      .post('/professores')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ nome: 'Professor X' });

    professorId = res.body.id;
    expect(res.status).toBe(201);
  });

  test('Listar professores', async () => {
    const res = await request(app)
      .get('/professores')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });

});