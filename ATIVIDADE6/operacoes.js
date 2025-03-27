function calcularOperacoes() {
    let num1 = parseFloat(prompt("Digite o primeiro número:"));
    let num2 = parseFloat(prompt("Digite o segundo número:"));
    
    alert(`Soma: ${num1 + num2}`);
    alert(`Subtração: ${num1 - num2}`);
    alert(`Produto: ${num1 * num2}`);
    if (num2 !== 0) {
        alert(`Divisão: ${(num1 / num2).toFixed(2)}`);
        alert(`Resto da divisão: ${num1 % num2}`);
    } else {
        alert("Divisão por zero não é permitida!");
    }
}
