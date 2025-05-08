function mostrarCurso() {
  const combo = document.getElementById("listaCursos");
  const cursoSelecionado = combo.value;

  if (cursoSelecionado !== "") {
    const nomeExibido = combo.options[combo.selectedIndex].text;

    const desejaAbrir = confirm(`Deseja visualizar detalhes sobre "${nomeExibido}"?`);

    if (desejaAbrir) {
      let textoCurso = "";

      if (cursoSelecionado === "ads") {
        textoCurso = "<h2>Análise de Sistemas</h2><p>Voltado ao desenvolvimento de software, lógica e banco de dados.</p>";
      } else if (cursoSelecionado === "log") {
        textoCurso = "<h2>Logística</h2><p>Gerenciamento de transporte, estoques e cadeia de suprimentos.</p>";
      } else if (cursoSelecionado === "ti") {
        textoCurso = "<h2>Gestão de TI</h2><p>Administração de redes, segurança da informação e projetos em tecnologia.</p>";
      } else if (cursoSelecionado === "auto") {
        textoCurso = "<h2>Automação</h2><p>Sistemas industriais, sensores e controle de máquinas automatizadas.</p>";
      }

      const janelaInfo = window.open("", "", "width=600,height=300");
      janelaInfo.document.write(textoCurso);
    }
  }
}