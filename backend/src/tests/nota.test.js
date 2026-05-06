import request from "supertest";
import app from "../../server.js";

let authToken;
let notaId;
let alunoId;
let disciplinaId;

describe('Notas CRUD', () => {
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });
    
    authToken = loginResponse.body.token;
    
    // Criar um aluno para associar à nota
    const alunoRes = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Aluno Nota Teste',
        cpf: '11122233344',
        email: 'aluno.nota@teste.com'
      });
    
    alunoId = alunoRes.body.id;
    
    // Criar uma disciplina para associar à nota
    const disciplinaRes = await request(app)
      .post('/disciplinas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Física',
        carga_horaria: 60
      });
    
    disciplinaId = disciplinaRes.body.id;
  });
  
  test('Deve criar uma nova nota', async () => {
    const response = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 8.5,
        bimestre: '1º Bimestre',
        observacao: 'Prova parcial'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Nota criada com sucesso');
    notaId = response.body.id;
  });
  
  test('Deve retornar erro ao criar nota com valor inválido', async () => {
    const response = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 15,
        bimestre: '1º Bimestre'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nota deve estar entre 0 e 10');
  });
  
  test('Deve retornar erro ao criar nota sem bimestre', async () => {
    const response = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 7.5
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Aluno, disciplina, nota e bimestre são obrigatórios');
  });
  
  test('Deve listar todas as notas', async () => {
    const response = await request(app)
      .get('/notas')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve buscar nota por ID', async () => {
    const response = await request(app)
      .get(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nota', 8.5);
  });
  
  test('Deve listar notas por aluno', async () => {
    const response = await request(app)
      .get(`/notas/aluno/${alunoId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('Deve atualizar nota', async () => {
    const response = await request(app)
      .put(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 9.0,
        bimestre: '2º Bimestre',
        observacao: 'Recuperação'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota atualizada com sucesso');
  });
  
  test('Deve deletar nota', async () => {
    const response = await request(app)
      .delete(`/notas/${notaId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota deletada com sucesso');
  });
});