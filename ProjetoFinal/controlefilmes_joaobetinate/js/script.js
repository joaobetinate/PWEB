const chave = 'f38aa5def5c04d35b00f580c69b7de40';
let lista = JSON.parse(localStorage.getItem('filmes')) || [];

function muda(tela) {
  document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
  document.getElementById(tela).style.display = 'block';
}



function mostra() {
  let busca = document.getElementById('pesquisa').value.toLowerCase();
  let onde = document.getElementById('lista-filmes');
  onde.innerHTML = '';
  lista.filter(x => x.titulo.toLowerCase().includes(busca)).forEach(f => {
    let caixinha = document.createElement('div');
    caixinha.className = 'filme-card';
    caixinha.innerHTML = `
      ${f.poster_path ? `<img src="${f.poster_path}" class="filme-card-poster">` : ''}
      <strong>${f.titulo}</strong><br>
      Diretor: ${f.diretor}<br>
      Ano: ${f.ano}<br>
      Nota: ${f.notaUsuario}<br>
      <div class="botoes">
        <button onclick='editar(${f.id})'>Editar</button>
        <button onclick='apagar(${f.id})'>Excluir</button>
      </div>
    `;
    onde.appendChild(caixinha);
  });
}



function salvar(e) {
  e.preventDefault();
  let novo = {
    id: document.getElementById('id').value || Date.now(),
    titulo: document.getElementById('titulo').value,
    diretor: document.getElementById('diretor').value,
    ano: +document.getElementById('ano').value,
    genero: document.getElementById('genero').value,
    duracao: +document.getElementById('duracao').value,
    elenco: document.getElementById('elenco').value,
    classificacao: document.getElementById('classificacao').value,
    sinopse: document.getElementById('sinopse').value,
    notaUsuario: +document.getElementById('notaUsuario').value,
    dataAdicao: document.getElementById('dataAdicao').value,
    poster_path: document.getElementById('posterPath').value
  };
  lista.push(novo);
  localStorage.setItem('filmes', JSON.stringify(lista));
  mostra();
  limpa();
  muda('meus-filmes');
}


function editar(id) {
  let f = lista.find(x => x.id == id);
  document.getElementById('edit-id').value = f.id;
  document.getElementById('titulo-edicao').innerText = f.titulo;
  document.getElementById('edit-diretor').value = f.diretor;
  document.getElementById('edit-ano').value = f.ano;
  document.getElementById('edit-genero').value = f.genero;
  document.getElementById('edit-duracao').value = f.duracao;
  document.getElementById('edit-elenco').value = f.elenco;
  document.getElementById('edit-classificacao').value = f.classificacao;
  document.getElementById('edit-sinopse').value = f.sinopse;
  document.getElementById('edit-notaUsuario').value = f.notaUsuario;
  document.getElementById('edit-dataAdicao').value = f.dataAdicao;
  document.getElementById('edit-posterPath').value = f.poster_path || '';
  let img = document.getElementById('edit-poster-preview');
  if (f.poster_path) {
    img.src = f.poster_path;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
  muda('editar');
}



function atualizar(e) {
  e.preventDefault();
  let id = document.getElementById('edit-id').value;
  let i = lista.findIndex(x => x.id == id);
  lista[i] = {
    id: id,
    titulo: document.getElementById('titulo-edicao').innerText,
    diretor: document.getElementById('edit-diretor').value,
    ano: +document.getElementById('edit-ano').value,
    genero: document.getElementById('edit-genero').value,
    duracao: +document.getElementById('edit-duracao').value,
    elenco: document.getElementById('edit-elenco').value,
    classificacao: document.getElementById('edit-classificacao').value,
    sinopse: document.getElementById('edit-sinopse').value,
    notaUsuario: +document.getElementById('edit-notaUsuario').value,
    dataAdicao: document.getElementById('edit-dataAdicao').value,
    poster_path: document.getElementById('edit-posterPath').value
  };
  localStorage.setItem('filmes', JSON.stringify(lista));
  mostra();
  muda('meus-filmes');
}



function apagar(id) {
  if (confirm('Apagar mesmo?')) {
    let i = lista.findIndex(x => x.id == id);
    if (i >= 0) {
      lista.splice(i, 1);
      localStorage.setItem('filmes', JSON.stringify(lista));
      mostra();
    }
  }
}




function limpa() {
  document.getElementById('form-filme').reset();
  document.getElementById('id').value = '';
  document.getElementById('posterPath').value = '';
  let img = document.getElementById('poster-preview');
  img.src = '';
  img.style.display = 'none';
}



function tmdbManual() {
  let t = document.getElementById('titulo').value.trim();
  if (t.length < 3) return;
  buscaTMDB(t);
}



async function buscaTMDB(nome) {
  try {
    let urlBusca = `https://api.themoviedb.org/3/search/movie?api_key=${chave}&query=${encodeURIComponent(nome)}&language=pt-BR`;
    let resBusca = await fetch(urlBusca);
    let dadosBusca = await resBusca.json();
    if (dadosBusca.results.length > 0) {
      let id = dadosBusca.results[0].id;
      let resDetalhes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${chave}&language=pt-BR`);
      let detalhes = await resDetalhes.json();
      let resCreditos = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${chave}&language=pt-BR`);
      let creditos = await resCreditos.json();
      preencher(detalhes, creditos);
    }
  } catch (erro) {
    console.log('erro tmdb', erro);
  }
}



function preencher(d, c) {
  document.getElementById('ano').value = d.release_date?.split('-')[0] || '';
  document.getElementById('genero').value = d.genres?.map(g => g.name).join(', ') || '';
  document.getElementById('sinopse').value = d.overview || '';
  document.getElementById('notaUsuario').value = d.vote_average?.toFixed(1) || '';
  document.getElementById('diretor').value = c.crew?.find(p => p.job === 'Director')?.name || '';
  document.getElementById('elenco').value = c.cast?.slice(0, 5).map(a => a.name).join(', ') || '';
  document.getElementById('duracao').value = d.runtime || '';
  document.getElementById('classificacao').value = '';
  let caminho = d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : '';
  document.getElementById('posterPath').value = caminho;
  let img = document.getElementById('poster-preview');
  if (caminho) {
    img.src = caminho;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}

mostra();
