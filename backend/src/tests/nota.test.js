const request = require('supertest');
const app = require('../app'); // ajusta se seu caminho for diferente

let authToken;
let notaId;

beforeAll(async () => {
  // 🔹 cria usuário
  await request(app)
    .post('/auth/registrar')
    .send({
      nome: 'Teste',
      email: 'teste@email.com',
      senha: '123456'
    });

  // 🔹 faz login
  const response = await request(app)
    .post('/auth/login')
    .send({
      email: 'teste@email.com',
      senha: '123456'
    });

  authToken = response.body.token;
});

describe('Notas CRUD', () => {

  test('Deve criar uma nova nota', async () => {
    const response = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 8.5,
        bimestre: 1
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Nota criada com sucesso');

    notaId = response.body.id;
  });

  test('Deve listar todas as notas', async () => {
    const response = await request(app)
      .get('/notas')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  test('Deve buscar nota por ID', async () => {
    const response = await request(app)
      .get(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  test('Deve atualizar nota', async () => {
    const response = await request(app)
      .put(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nota: 9
      });

    expect(response.status).toBe(200);
  });

  test('Deve deletar nota', async () => {
    const response = await request(app)
      .delete(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

});