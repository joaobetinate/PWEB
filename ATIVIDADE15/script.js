function checarFormulario(evento) {
    const dados = document.formContato.elements;

    const nomeUsuario = dados["usuario"].value.trim();
    const textoMensagem = dados["mensagem"].value.trim();
    const escolhaVisita = dados["visita"].value;

    if (nomeUsuario.length < 10) {
        alert("Por favor, digite seu nome completo com pelo menos 10 caracteres.");
        return false;
    }

    if (textoMensagem.length < 20) {
        alert("Sua mensagem está muito curta. Escreva pelo menos 20 caracteres.");
        return false;
    }

    if (!escolhaVisita) {
        alert("Informe se é sua primeira vez aqui.");
        return false;
    }

    if (escolhaVisita === "retorno") {
        alert("Ficamos felizes em ver você novamente!");
    } else {
        alert("Agradecemos por visitar nossa página!");
    }

    return true;
}
