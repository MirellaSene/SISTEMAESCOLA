import request from "supertest";
import app from "../../server.js";

let authToken;
let disciplinaId;

describe('Disciplinas CRUD', () => {
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });
    
    authToken = loginResponse.body.token;
  });
  
  test('Deve criar uma nova disciplina', async () => {
    const response = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Matemática',
        carga_horaria: 80
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Disciplina criada com sucesso');
    disciplinaId = response.body.id;
  });
  
  test('Deve retornar erro ao criar disciplina sem carga horária', async () => {
    const response = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Português'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome e carga horária são obrigatórios');
  });
  
  test('Deve listar todas as disciplinas', async () => {
    const response = await request(app)
      .get('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve buscar disciplina por ID', async () => {
    const response = await request(app)
      .get(`/disciplinas/${disciplinaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Matemática');
  });
  
  test('Deve atualizar disciplina', async () => {
    const response = await request(app)
      .put(`/disciplinas/${disciplinaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Matemática Avançada',
        carga_horaria: 100
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Disciplina atualizada com sucesso');
  });
  
  test('Deve deletar disciplina', async () => {
    const response = await request(app)
      .delete(`/disciplinas/${disciplinaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Disciplina deletada com sucesso');
  });
});