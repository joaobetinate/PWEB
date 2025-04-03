function jogar(escolhaUsuario) {
    var opcoes = ['pedra', 'papel', 'tesoura'];
    var escolhaComputador = opcoes[Math.floor(Math.random() * 3)];
    var resultado = '';
    
    if (escolhaUsuario == escolhaComputador) {
        resultado = 'Empate!';
    } else if (
        (escolhaUsuario == 'pedra' && escolhaComputador == 'tesoura') ||
        (escolhaUsuario == 'tesoura' && escolhaComputador == 'papel') ||
        (escolhaUsuario == 'papel' && escolhaComputador == 'pedra')
    ) {
        resultado = 'Você venceu!';
    } else {
        resultado = 'O computador venceu!';
    }
    
    document.getElementById('resultado').innerText = 'Você escolheu ' + escolhaUsuario + '. O computador escolheu ' + escolhaComputador + '. ' + resultado;
}
