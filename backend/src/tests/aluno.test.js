const request = require("supertest");
const app = require("../app"); // ajuste se necessário

let authToken;

beforeAll(async () => {
  // registra usuário (se não existir)
  await request(app)
    .post("/auth/registrar")
    .send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "123456"
    });

  // faz login
  const response = await request(app)
    .post("/auth/login")
    .send({
      email: "teste@email.com",
      senha: "123456"
    });

  console.log("LOGIN RESPONSE:", response.body);

  authToken = response.body.token;

  console.log("TOKEN SALVO:", authToken);
});

test("Deve listar alunos", async () => {
  const response = await request(app)
    .get("/alunos")
    .set("Authorization", `Bearer ${authToken}`);

  console.log("STATUS:", response.status);
  console.log("BODY:", response.body);

  expect(response.status).toBe(200);
});