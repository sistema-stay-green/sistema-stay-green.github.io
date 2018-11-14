function aplicarRelatorios() {
  console.log(tarefasArmazenadasBD);
  let botoesRelatorio = document.querySelectorAll('.botaoRelatorio');

  botoesRelatorio.forEach(botaoRelatorio =>
    botaoRelatorio.addEventListener('click', () => {
      let codigoRelatorio = parseInt(botaoRelatorio.dataset.codrelat);
      geraRelatorio(codigoRelatorio);
    }))
}

function geraRelatorio(codigoRelatorio) {
  switch (codigoRelatorio) {
    case 0:
        return gerarTabela(tarefasArmazenadasBD, ['idTarefa', 'nomeTarefa', 'gastoTarefa'], 'gastoTarefa');
    case 1:
        break;
    case 2:
      break;
  }
}

/**Gera uma tabela para expressar informações de várias tarefas com base
 * nos campos especificados.
 * @param {Tarefa[]} tarefas as tarefas que estarão na tabela
 * @param {String[]} camposRelevantes os campos que estarão na tabela
 * @param {String=} campoTotal o campo que será mostrado na célula "total". Só será usado se apresentaTotal for
 * true
 * @param {Boolean} [apresentaTotal = true] apresentaTotal se a tabela vai apresentar uma célula "total"
 * com a soma de algum campo prévio
 * @returns {HTMLElement} A tabela feita com as células prontas.
 * @author Pedro
 */
function gerarTabela(tarefas, camposRelevantes, campoTotal, apresentaTotal = true) {
  let tabelaRelatorioGastos = document.createElement('table'),
      cabecalhoTabela = document.createElement('thead'),
      celulaTabelaCabecalho = document.createElement('tr');

    //Criando e adicionando o cabeçalho da tabela
    for (let campo of camposRelevantes) {
      let elementoCabecalho = document.createElement('th');

      elementoCabecalho.innerHTML = campo;
      celulaTabelaCabecalho.appendChild(elementoCabecalho);
    }

  cabecalhoTabela.appendChild(celulaTabelaCabecalho);

  tabelaRelatorioGastos.appendChild(cabecalhoTabela);
 
  //Criando e adicionando o corpo (conteúdo) da tabela
  let conteudoTabela = document.createElement('tbody');

  for(let tarefa of tarefas){
    celulaTabelaCorpo = document.createElement('tr');

    for(let campo of camposRelevantes){
      let celulaConteudo = document.createElement('td');

      celulaConteudo.innerHTML = tarefa[campo];
      celulaTabelaCorpo.appendChild(celulaConteudo);
    }
    conteudoTabela.appendChild(celulaTabelaCorpo);
  }

  tabelaRelatorioGastos.appendChild(conteudoTabela);

  if(apresentaTotal){
    let rodapeTabela = document.createElement('tfoot'),
        celulaTabelaRodape = document.createElement('tr');
        somaTotal = 0;

    celulaTabelaRodape.innerHTML = "<td>Total</td>";
    for(let tarefa of tarefas){
      somaTotal += tarefa[campoTotal];
    }

    celulaTabelaRodape.innerHTML += "<td>" + somaTotal + "</td> ";
    rodapeTabela.appendChild(celulaTabelaRodape);

    tabelaRelatorioGastos.appendChild(rodapeTabela);
    
  }

  return tabelaRelatorioGastos;
}