const {somar, subtrair, multiplicacao, divisao} = require("./calculadora.js")

describe("teste de calculadora", ()=>{
    test("deve somar dois numeros",()=>{
        expect(somar(2,5)).toBe(7)
    })
    test("deve subtrair dois numeros",()=>{
        expect(subtrair(2,5)).toBe(-3)
    })
    test("deve multiplicar dois numeros",()=>{
        expect(multiplicacao(2,5)).toBe(10)
    })
    test("deve dividir dois numeros",()=>{
        expect(divisao(6,2)).toBe(3)
    })
        test("Deve dar erro ao dividir dois números", () => {
        expect(()=> divisao(10, 0)).toThrow("Não é possivel dividir por 0");
    })
})