
function validar(event) {
    event.preventDefault();
    let elementos = document.formularioContato.elements;
    let nome = elementos['nome'].value.trim();
    let email = elementos['email'].value.trim();
    let comentario = elementos['comentario'].value.trim();
    let pesquisaSelecionada = false;
    let pesquisaValor = "";

    for (let i = 0; i < elementos['pesquisa'].length; i++) {
        if (elementos['pesquisa'][i].checked) {
            pesquisaSelecionada = true;
            pesquisaValor = elementos['pesquisa'][i].value;
            break;
        }
    }

    if (nome.length < 10) {
        prompt("Erro", "O nome deve ter pelo menos 10 caracteres.");
        return false;
    }

    if (comentario.length < 20) {
        prompt("Erro", "O comentário deve ter pelo menos 20 caracteres.");
        return false;
    }

    if (!pesquisaSelecionada) {
        prompt("Mensagem", "Que bom que você voltou a visitar esta página!");
    } else {
        if (pesquisaValor === "nao") {
            prompt("Mensagem", "Volte sempre à esta página!");
        } else {
            prompt("Mensagem", "Que bom que você voltou a visitar esta página!");
        }
    }

    prompt("Sucesso", "Formulário enviado com sucesso!");
    return true;
}
