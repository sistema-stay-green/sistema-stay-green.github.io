function aplicarRelatorios() {
  console.log(tarefasArmazenadasBD);
  let botoesRelatorio = document.querySelectorAll('.botaoRelatorio');

  botoesRelatorio.forEach(botaoRelatorio =>
    botaoRelatorio.addEventListener('click', () => {
      let codigoRelatorio = parseInt(botaoRelatorio.dataset.codrelat),

        //Seleção por id da section  e o conteúdo torna-se a tabela gerada. Remoção da classe invisivel
        relatorioContainer = document.querySelector('#containerRelatorio');
      relatorioContainer.innerHTML = '';
      relatorioContainer.appendChild(geraRelatorio(codigoRelatorio));
      alteraVisibilidadeElemento(relatorioContainer, false);
      mascaraFormEl.addEventListener('click', () => { alteraVisibilidadeElemento(relatorioContainer, true) });
    }));
}


function geraRelatorio(codigoRelatorio) {
  switch (codigoRelatorio) {
    case 0: //Relativo ao Relatório de Gastos
      return gerarTabela(tarefasArmazenadasBD, ['idTarefa', 'nomeTarefa', 'gastoTarefa'], 'gastoTarefa');
    case 1: //Relativo ao Relatório de Produção
      return gerarTabela(tarefasArmazenadasBD, ['idTarefa', 'nomeTarefa', 'quantProduzTarefa'], 'quantProduzTarefa');
    case 2: //Relativo ao Relatório de Insumos
      return gerarTabela(tarefasArmazenadasBD, ['idTarefa', 'nomeTarefa', 'insumosTarefa', 'quantInsumosTarefa'], '', false);

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

  for (let tarefa of tarefas) {
    celulaTabelaCorpo = document.createElement('tr');

    for (let campo of camposRelevantes) {
      let celulaConteudo = document.createElement('td');

      celulaConteudo.innerHTML = tarefa[campo];
      celulaTabelaCorpo.appendChild(celulaConteudo);
    }
    conteudoTabela.appendChild(celulaTabelaCorpo);
  }

  tabelaRelatorioGastos.appendChild(conteudoTabela);

  if (apresentaTotal) {
    let rodapeTabela = document.createElement('tfoot'),
      celulaTabelaRodape = document.createElement('tr');
    somaTotal = 0;

    celulaTabelaRodape.innerHTML = "<td>Total</td>";
    for (let tarefa of tarefas) {
      somaTotal += tarefa[campoTotal];
    }

    celulaTabelaRodape.innerHTML += '<td colspan="2">' + somaTotal + '</td> ';
    rodapeTabela.appendChild(celulaTabelaRodape);

    tabelaRelatorioGastos.appendChild(rodapeTabela);

  }

  return tabelaRelatorioGastos;
}

/**
 * Envia o relatório gerado para Impressão.
 * @author Mei Fagundes
 */
function printRelatorio() {

  let content = document.querySelector("#containerRelatorio").innerHTML;
  let printWindow = window.open('', 'Print', 'height=768,width=1024');

  printWindow.document.write('<html><head><title>Print</title>');
  printWindow.document.write("<link rel='stylesheet' media='print' href='CSS/AgendaEletronica/Print.css'>");
  printWindow.document.write('</head><body onafterprint="self.close()">');
  printWindow.document.write(content);
  printWindow.document.write('<script type="text/javascript">' + 'window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 200) };' + '</script>');
  printWindow.document.write('</body></html>');

  printWindow.document.close();
  printWindow.focus();
}
