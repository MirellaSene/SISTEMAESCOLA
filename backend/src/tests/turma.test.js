const request = require('supertest');
const app = require('../app');

let authToken;
let turmaId;

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

describe('Turmas CRUD', () => {

  test('Criar turma', async () => {
    const res = await request(app)
      .post('/turmas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ nome: 'Turma A', ano_letivo: 2024 });

    turmaId = res.body.id;
    expect(res.status).toBe(201);
  });

  test('Listar turmas', async () => {
    const res = await request(app)
      .get('/turmas')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });

  test('Buscar turma', async () => {
    const res = await request(app)
      .get(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });

  test('Atualizar turma', async () => {
    const res = await request(app)
      .put(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ nome: 'Turma B' });

    expect(res.status).toBe(200);
  });

  test('Deletar turma', async () => {
    const res = await request(app)
      .delete(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });

});