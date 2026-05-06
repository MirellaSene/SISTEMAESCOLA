const request = require("supertest");
const app = require("../../src/app");
const db = require("../config/db");

describe('Autenticação', () => {
  beforeAll(async () => {
    
    await db.execute('DELETE FROM usuarios WHERE email LIKE "%teste%"');
  });
  
  afterAll(async () => {
    await db.execute('DELETE FROM usuarios WHERE email LIKE "%teste%"');
  });
  
  test('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/registrar')
      .send({
        nome: 'Usuário Teste',
        email: 'teste@escola.com',
        senha: '123456',
        perfil: 'admin'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso');
  });
  
  test('Deve retornar erro ao registrar com email duplicado', async () => {
    const response = await request(app)
      .post('/auth/registrar')
      .send({
        nome: 'Usuário Teste 2',
        email: 'teste@escola.com',
        senha: '123456'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email já cadastrado');
  });
  
  test('Deve fazer login com sucesso', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@escola.com',
        senha: '123456'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.usuario).toHaveProperty('nome', 'Usuário Teste');
  });
  
  test('Deve retornar erro ao fazer login com senha incorreta', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@escola.com',
        senha: 'senhaerrada'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Email ou senha inválidos');
  });
  
  test('Deve retornar erro ao fazer login com email inexistente', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'inexistente@escola.com',
        senha: '123456'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Email ou senha inválidos');
  });
  
  test('Deve retornar erro ao tentar registrar sem nome', async () => {
    const response = await request(app)
      .post('/auth/registrar')
      .send({
        email: 'semnome@escola.com',
        senha: '123456'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome, email e senha são obrigatórios');
  });
});