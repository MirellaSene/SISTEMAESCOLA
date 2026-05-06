import request from "supertest";
import app from "../../server.js";

let authToken;
let turmaId;
let professorId;

describe('Turmas CRUD', () => {
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });
    
    authToken = loginResponse.body.token;
    
    // Criar um professor para associar à turma
    const professorRes = await request(app)
      .post('/professores')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Professor Teste',
        email: 'professor@teste.com',
        especialidade: 'Matemática'
      });
    
    professorId = professorRes.body.id;
  });
  
  test('Deve criar uma nova turma', async () => {
    const response = await request(app)
      .post('/turmas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Turma A',
        ano_letivo: 2024,
        professor_id: professorId
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Turma criada com sucesso');
    turmaId = response.body.id;
  });
  
  test('Deve retornar erro ao criar turma sem ano letivo', async () => {
    const response = await request(app)
      .post('/turmas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Turma B'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome e ano letivo são obrigatórios');
  });
  
  test('Deve listar todas as turmas', async () => {
    const response = await request(app)
      .get('/turmas')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve buscar turma por ID', async () => {
    const response = await request(app)
      .get(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Turma A');
  });
  
  test('Deve atualizar turma', async () => {
    const response = await request(app)
      .put(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Turma A - Atualizada',
        ano_letivo: 2024,
        professor_id: professorId
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Turma atualizada com sucesso');
  });
  
  test('Deve deletar turma', async () => {
    const response = await request(app)
      .delete(`/turmas/${turmaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Turma deletada com sucesso');
  });
});