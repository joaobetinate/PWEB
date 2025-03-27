function calcularMedia() {
    let nome = prompt("Digite o nome do aluno:");
    let notas = [];
    for (let i = 0; i < 4; i++) {
        notas.push(parseFloat(prompt(`Digite a nota ${i + 1}:`)));
    }
    let media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
    alert(`${nome}, sua média é: ${media.toFixed(2)}`);
}