const app = require("../app.js");
const request = require("supertest");

describe("Teste de API Express", () => {

    test("GET /mensagem deve retornar API funcionando", async () => {
        const response = await request(app).get("/mensagem");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ msg: "API funcionando" });
    });

    test("GET /usuarios deve retornar a lista de usuários", async () => {
        const response = await request(app).get("/usuarios");
        .post('/usuarios')

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
})