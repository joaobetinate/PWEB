
function descobrirMaior(x, y, z) {
    if (x >= y && x >= z) {
      return x;
    } else if (y >= x && y >= z) {
      return y;
    } else {
      return z;
    }
  }
  
  function calcularMaior() {
    const v1 = Number(document.getElementById('valor1').value);
    const v2 = Number(document.getElementById('valor2').value);
    const v3 = Number(document.getElementById('valor3').value);
    const maiorValor = descobrirMaior(v1, v2, v3);
    document.getElementById('saidaMaior').textContent = `Maior valor informado: ${maiorValor}`;
  }
  
  function colocarEmOrdem(x, y, z) {
    let arr = [x, y, z];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i+1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          let aux = arr[i];
          arr[i] = arr[j];
          arr[j] = aux;
        }
      }
    }
    return arr;
  }
  
  function ordenarValores() {
    const n1 = Number(document.getElementById('numA').value);
    const n2 = Number(document.getElementById('numB').value);
    const n3 = Number(document.getElementById('numC').value);
    const resultado = colocarEmOrdem(n1, n2, n3);
    document.getElementById('saidaOrdem').textContent = `Valores em ordem: ${resultado.join(' - ')}`;
  }

  function verificarSePalindromo(frase) {
    let tratada = frase.trim().toUpperCase().replace(/ /g, '');
    let invertida = '';
    for (let i = tratada.length - 1; i >= 0; i--) {
      invertida += tratada[i];
    }
    return tratada === invertida;
  }
  
  function analisarPalindromo() {
    const entrada = document.getElementById('palavra').value;
    const eh = verificarSePalindromo(entrada);
    document.getElementById('saidaPalindromo').innerText = eh ? `"${entrada}" é palíndromo!` : `"${entrada}" não é palíndromo.`;
  }
  

  function identificarTriangulo(x, y, z) {
    if (x + y > z && x + z > y && y + z > x) {
      if (x === y && y === z) {
        return "Triângulo Equilátero";
      } else if (x === y || x === z || y === z) {
        return "Triângulo Isósceles";
      } else {
        return "Triângulo Escaleno";
      }
    } else {
      return "Os lados informados não formam um triângulo.";
    }
  }
  
  function analisarTriangulo() {
    const lado1 = Number(document.getElementById('a').value);
    const lado2 = Number(document.getElementById('b').value);
    const lado3 = Number(document.getElementById('c').value);
    const classificacao = identificarTriangulo(lado1, lado2, lado3);
    document.getElementById('saidaTriangulo').innerText = classificacao;
  }
  