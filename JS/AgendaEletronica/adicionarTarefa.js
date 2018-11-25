let botaoFormTarefaEl = document.querySelector('#botaoFormTarefa'),
  containerFormNovaTarefa = document.querySelector('form'),
  mascaraFormEl = document.querySelector('#mascaraForm'),
  botaoConfirmarTarefa = document.querySelector('button[name="adicionarTarefa"]'),
  botaoExcluirTarefa = document.querySelector('button[name="excluirTarefa"]');

botaoConfirmarTarefa.addEventListener('click', (evt) => {
  operacaoRequisicaoTarefas(evt.target.dataset.operacao, encapsularDadosTarefa());
  alteraVisibilidadeElemento(containerFormNovaTarefa, true);
});

botaoExcluirTarefa.addEventListener('click', (evt) => {
  operacaoRequisicaoTarefas(evt.target.dataset.operacao, encapsularDadosTarefa());
  alteraVisibilidadeElemento(containerFormNovaTarefa, true);
});

/** Altera a visibilidade de um elemento
 * @param {HTMLElement} elemento o elemento que terá a visibilidade
 * alterada
 * @param {Boolean} deveEsconder valor que indica se o elemento deve ser
 * escondido ou não.
*/
function alteraVisibilidadeElemento(elemento, deveEsconder) {
  if (deveEsconder) {
    mascaraFormEl.classList.add('invisivel');
    elemento.classList.add('invisivel');
  } else {
    mascaraFormEl.classList.remove('invisivel');
    elemento.classList.remove('invisivel');
  }
  recebeTarefas();
}

/** Exibe o formulário de adicionar nova tarefa quando usuário clica no
 * @param {Tarefa=} tarefaAExibir tarefa cujos dados serão exibidos no formulário
*/
function exibeFormularioTarefa(tarefaAExibir) {
  let botaoCancelarTarefaEl = document.querySelector('button[name="cancelarTarefa"]');

  for (let insumo of insumosArmazenadosBD) {
    document.querySelector('input[name="' + insumo.nomeInsumo + '"]').checked = false;
  }

  mascaraFormEl.classList.remove('invisivel');
  mascaraFormEl.addEventListener('click', () => { alteraVisibilidadeElemento(containerFormNovaTarefa, true) });

  botaoCancelarTarefaEl.addEventListener('click', () => { alteraVisibilidadeElemento(containerFormNovaTarefa, true) });

  containerFormNovaTarefa.classList.remove('invisivel');
  if (tarefaAExibir != null) {
    document.querySelector('button[name="excluirTarefa"]').classList.remove('invisivel');
    document.querySelector('#nomeNovaTarefa').value =
      tarefaAExibir.nomeTarefa;

    document.querySelector('textarea[name="descricaoTarefa"').value =
      tarefaAExibir.descrTarefa;

    document.querySelector('form select').value =
      tarefaAExibir.tipoTarefa;

    let data = Tarefa.toDateObject(tarefaAExibir.dataInicialTarefa);

    document.querySelector('input[name="realizarDia"]').value =
      data.getUTCFullYear() + "-" + ((data.getMonth + 1 < 10) ? '0' + data.getMonth()
        + 1 : data.getMonth() + 1 + "-" + data.getDate());

    document.querySelector('input[name="periodoRepeticao"]').value =
      tarefaAExibir.periodRepetTarefa;

    document.querySelector('input[name="producaoPrevista"]').value =
      tarefaAExibir.quantProduzTarefa;

    document.querySelector('select[name="produtoProduzidoTrf"]').value =
      tarefaAExibir.produtoProduzido;

    document.querySelector('input[name="valorGasto"]').value =
      tarefaAExibir.gastoTarefa;
    if (tarefaAExibir.insumosTarefa) {
      let insumosArray = tarefaAExibir.insumosTarefa.split(", ");
      for (let insumo of insumosArray) {
        console.log(insumo);
        document.querySelector(`input[name="${insumo}"]`).checked = true;
      }
    }

    botaoConfirmarTarefa.dataset.idTarefa = tarefaAExibir.idTarefa;
    botaoConfirmarTarefa.dataset.operacao = 'u';
    botaoConfirmarTarefa.innerHTML = "Atualizar";
    return;

  } else {
    document.querySelector('button[name="excluirTarefa"]').classList.add('invisivel');
    
    document.querySelector('form select').value =
      "ARAR";

    let data = new Date();

    document.querySelector('input[name="realizarDia"]').value =
      data.getUTCFullYear() + "-" + ((data.getMonth + 1 < 10) ? '0' + data.getMonth()
        + 1 : data.getMonth() + 1 + "-" + data.getUTCDate());

    document.querySelector('input[name="periodoRepeticao"]').value =
      1;

    document.querySelector('input[name="producaoPrevista"]').value =
      100;

    document.querySelector('input[name="valorGasto"]').value =
      100;
    botaoConfirmarTarefa.innerHTML = "Adicionar";
    botaoConfirmarTarefa.dataset.operacao = 'a';
  }

  return;
}

botaoFormTarefaEl.addEventListener('click', function () {
  exibeFormularioTarefa(null);
});

/**
 * Faz uma requisição para o Servlet 'TarefaBDServlet' para adicionar, remover ou alterar uma tarefa
 * @param {Caractere} operacao a operação a ser feita
 * @param {Tarefa} tarefa objeto Tarefa que irá sofrer a operação
 * @author Pedro
 */
function operacaoRequisicaoTarefas(operacao, tarefa) {
  console.log('http:localhost:8080/StayGreen/TarefaBDServlet?tarefa=' +
    tarefa.toJSONString() + "&operation=" + operacao);
  Request.get('http:localhost:8080/StayGreen/TarefaBDServlet?tarefa=' +
    tarefa.toJSONString() + "&operation=" + operacao)
    .then(function (resultado) {
      if (resultado == 0) {
        console.log("Erro");
      } else {
        if (operacao == 'a') {
          tarefa.idTarefa = resultado;
          tarefasArmazenadasBD.push(encapsularDadosTarefa());
        } else {
          if (operacao == 'u') {
            for (let tarefatmp of tarefasArmazenadasBD) {
              if (tarefa.idTarefa == tarefatmp.idTarefa)
                tarefatmp = tarefa;
            }
          }
          else {
            for (let tarefatmp of tarefasArmazenadasBD) {
              if (tarefa.idTarefa == tarefatmp.idTarefa)
                delete tarefatmp;
            }
          }
        }
      }
    });
}

function editarInsumo(insumoJSON) {
  Request.get('http:localhost:8080/StayGreen/ControleProducaoServlet?botao=editar&JSON='
    + insumoJSON + "&tipo=insumo").then(function (resultado) {
      console.log(resultado);
    });
}


function encapsularDadosTarefa() {
  let novaTarefaAdicionada = new Tarefa();
  novaTarefaAdicionada.nomeTarefa =
    document.querySelector('#nomeNovaTarefa').value;

  novaTarefaAdicionada.descrTarefa =
    document.querySelector('textarea[name="descricaoTarefa"').value;

  novaTarefaAdicionada.tipoTarefa =
    document.querySelector('form select').value;

  let data = new Date(document.querySelector('input[name="realizarDia"]').value);

  data.setDate(data.getDate() + 1);

  novaTarefaAdicionada.dataInicialTarefa = data;

  novaTarefaAdicionada.periodRepetTarefa =
    document.querySelector('input[name="periodoRepeticao"]').value;

  novaTarefaAdicionada.insumosTarefa = "";

  novaTarefaAdicionada.quantProduzTarefa =
    document.querySelector('input[name="producaoPrevista"]').value;

  novaTarefaAdicionada.gastoTarefa =
    document.querySelector('input[name="valorGasto"]').value;

  novaTarefaAdicionada.idTarefa = document.querySelector('button[name="adicionarTarefa"]')
    .dataset.idTarefa;

  novaTarefaAdicionada.produtoProduzidoTarefa =
    document.querySelector('select[name="produtoProduzidoTrf"]').value;

  let insumosGeraisCheck =
    Array.from(document.querySelectorAll('form input[type="checkbox"]')),
    insumosConsumidos =
      insumosGeraisCheck.filter((checkbox) => checkbox.checked);

  for (let insumos of insumosConsumidos) {
    novaTarefaAdicionada.insumosTarefa += insumos.value + ', ';
  }

  let length = novaTarefaAdicionada.insumosTarefa.length;
  novaTarefaAdicionada.insumosTarefa = novaTarefaAdicionada
    .insumosTarefa.substr(0, length - 2);

  novaTarefaAdicionada.quantInsumosTarefa = insumosConsumidos.length;

  return novaTarefaAdicionada;
}

/**
 * Gera placeholders para as tarefas e os insumos caso o modo estático esteja ativado.
 * @author Mei Fagundes
 */
function generatePlaceholders(){

  let tarefasPlaceHolder = [];
  let idTarefaPH = [1, 2, 3, 4, 5];
  let nomeTarefaPH = ["Nome Teste 1", "Nome Teste 2", "Nome Teste 3", "Nome Teste 4", "Nome Teste 5",];
  let gastoTarefaPH = [1000, 2000, 3000, 4000, 5000];
  let quantProduzTarefaPH = [100, 200, 300, 400, 500];
  let insumosTarefaPH = [1, 2, 3, 4, 5];
  let quantInsumosTarefaPH = [150, 250, 350, 450, 550];

  for (let i = 0; i < idTarefaPH.length; i++) {

    tarefasPlaceHolder.push({"idTarefa":idTarefaPH[i], "nomeTarefa":nomeTarefaPH[i],
      "gastoTarefa":gastoTarefaPH[i], "quantProduzTarefa":quantProduzTarefaPH[i],
      "insumosTarefa":insumosTarefaPH[i], "quantInsumosTarefa":quantInsumosTarefaPH[i]});
  }

  let insumosPlaceHolder = [];
  let idInsumo = [1, 2, 3, 4, 5];
  let nomeInsumo = ["Nome Teste 1", "Nome Teste 2", "Nome Teste 3", "Nome Teste 4", "Nome Teste 5",]

  for (let i = 0; i < idInsumo.length; i++) {
    
    insumosPlaceHolder.push({"idInsumo":idInsumo[i], "nomeInsumo":nomeInsumo[i]});
    
  }

  insumosArmazenadosBD = insumosPlaceHolder;
  tarefasArmazenadasBD = tarefasPlaceHolder;
}