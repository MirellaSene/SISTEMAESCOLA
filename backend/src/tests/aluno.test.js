import request from "supertest";
import app from "../../server.js";
import db from "../config/db.js"


let authToken;
let alunoId;

describe('Alunos CRUD', () => {
  beforeAll(async () => {
    // Fazer login para obter token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });
    
    authToken = loginResponse.body.token;
  });
  
  test('Deve criar um novo aluno', async () => {
    const response = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'João Silva',
        cpf: '12345678900',
        email: 'joao@email.com',
        telefone: '11999999999',
        data_nascimento: '2000-01-01',
        status: 'ativo'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Aluno criado com sucesso');
    alunoId = response.body.id;
  });
  
  test('Deve retornar erro ao criar aluno sem nome', async () => {
    const response = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cpf: '98765432100',
        email: 'teste@email.com'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome e CPF são obrigatórios');
  });
  
  test('Deve listar todos os alunos', async () => {
    const response = await request(app)
      .get('/alunos')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve buscar aluno por ID', async () => {
    const response = await request(app)
      .get(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'João Silva');
  });
  
  test('Deve retornar 404 ao buscar aluno inexistente', async () => {
    const response = await request(app)
      .get('/alunos/99999')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(404);
  });
  
  test('Deve atualizar aluno', async () => {
    const response = await request(app)
      .put(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'João Silva Atualizado',
        cpf: '12345678900',
        email: 'joao.atualizado@email.com',
        telefone: '11888888888',
        data_nascimento: '2000-01-01',
        status: 'ativo'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Aluno atualizado com sucesso');
  });
  
  test('Deve deletar aluno', async () => {
    const response = await request(app)
      .delete(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Aluno deletado com sucesso');
  });
  
  test('Deve retornar 401 sem token de autenticação', async () => {
    const response = await request(app)
      .get('/alunos');
    
    expect(response.status).toBe(401);
  });
});