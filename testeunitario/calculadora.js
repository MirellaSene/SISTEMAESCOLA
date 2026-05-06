function somar (a,b){
    return a + b;
}

function subtrair(a,b){
    return a - b;
}

function multiplicacao(a,b){
    return a * b;
}

function divisao(a,b){

    if(b === 0){
        throw new Error("Não é possivel dividir por 0");
    }

    return a / b;
}

module.exports = {
    somar,
    subtrair,
    multiplicacao,
    divisao
}