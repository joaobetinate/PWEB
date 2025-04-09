const respostas = [];
const LIMITE_RESPOSTAS = 45; // Agora 45 respostas

const formulario = document.getElementById('formulario');
const contador = document.getElementById('contador');
const resultado = document.getElementById('resultado');
const novaPesquisaBtn = document.getElementById('novaPesquisa');

formulario.addEventListener('submit', function(event) {
  event.preventDefault(); 


  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const opiniao = parseInt(document.getElementById('opiniao').value);

  if (!idade || !sexo || !opiniao) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  respostas.push({ idade, sexo, opiniao });

  contador.textContent = `Respostas registradas: ${respostas.length}/${LIMITE_RESPOSTAS}`;

  
  formulario.reset();


  if (respostas.length === LIMITE_RESPOSTAS) {
    formulario.style.display = 'none';
    mostrarResultados();
    novaPesquisaBtn.style.display = 'inline';
  }
});

function mostrarResultados() {
  let somaIdades = 0;
  let maiorIdade = respostas[0].idade;
  let menorIdade = respostas[0].idade;
  let quantidadePessimo = 0;
  let quantidadeOtimoBom = 0;
  let mulheres = 0;
  let homens = 0;
  let outros = 0;

  respostas.forEach(resposta => {
    somaIdades += resposta.idade;

    if (resposta.idade > maiorIdade) maiorIdade = resposta.idade;
    if (resposta.idade < menorIdade) menorIdade = resposta.idade;

    if (resposta.opiniao === 1) quantidadePessimo++;
    if (resposta.opiniao === 3 || resposta.opiniao === 4) quantidadeOtimoBom++;

    if (resposta.sexo === 'feminino') mulheres++;
    if (resposta.sexo === 'masculino') homens++;
    if (resposta.sexo === 'outros') outros++;
  });

  const mediaIdade = somaIdades / respostas.length;
  const porcentagemOtimoBom = (quantidadeOtimoBom / respostas.length) * 100;

  resultado.textContent = `
Média da idade: ${mediaIdade.toFixed(2)}
Idade da pessoa mais velha: ${maiorIdade}
Idade da pessoa mais nova: ${menorIdade}
Quantidade que responderam "Péssimo": ${quantidadePessimo}
Porcentagem de "Ótimo" e "Bom": ${porcentagemOtimoBom.toFixed(2)}%
Número de mulheres: ${mulheres}
Número de homens: ${homens}
Número de outros: ${outros}
  `;
}

// Botão Nova Pesquisa
novaPesquisaBtn.addEventListener('click', () => {
  respostas.length = 0; // Limpa respostas
  formulario.reset();
  formulario.style.display = 'block';
  contador.textContent = `Respostas registradas: 0/${LIMITE_RESPOSTAS}`;
  resultado.textContent = '';
  novaPesquisaBtn.style.display = 'none';
});
