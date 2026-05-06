import request from "supertest";
import app from "../../server.js";

let authToken
let professorId;

describe('Professores CRUD', () => {
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });
    
    authToken = loginResponse.body.token;
  });
  
  test('Deve criar um novo professor', async () => {
    const response = await request(app)
      .post('/professores')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Maria Professora',
        email: 'maria@escola.com',
        telefone: '11977777777',
        especialidade: 'Matemática'
      });
    
    expect(response.status).toBe(201);
    professorId = response.body.id;
  });
  
  test('Deve listar professores', async () => {
    const response = await request(app)
      .get('/professores')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve retornar erro ao criar professor sem nome', async () => {
    const response = await request(app)
      .post('/professores')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        email: 'teste@escola.com'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome é obrigatório');
  });
  
  test('Deve deletar professor', async () => {
    const response = await request(app)
      .delete(`/professores/${professorId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
  });
});