let botaoFormTarefaEl = document.querySelector('#botaoFormTarefa'),
    containerFormNovaTarefa = document.querySelector('form'),
    mascaraFormEl = document.querySelector('#mascaraForm');

function escondeFormulario(){
  mascaraFormEl.classList.add('invisivel');
  containerFormNovaTarefa.classList.add('invisivel');
}

/** Exibe o formulário de adicionar nova tarefa quando usuário clica no
 * @param {Tarefa=} tarefaAExibir tarefa cujos dados serão exibidos no formulário
*/
function exibeFormularioTarefa(tarefaAExibir){
  let botaoCancelarTarefaEl = document.querySelector('button[name="cancelarTarefa"]');

  mascaraFormEl.classList.remove('invisivel');
  mascaraFormEl.addEventListener('click', escondeFormulario);

  botaoCancelarTarefaEl.addEventListener('click', escondeFormulario);

  containerFormNovaTarefa.classList.remove('invisivel');

  if(tarefaAExibir != undefined){
    document.querySelector('#nomeNovaTarefa').value =
      tarefaAExibir.nomeTarefa;
    document.querySelector('textarea[name="descricaoTarefa"').value =
      tarefaAExibir.descrTarefa;
    document.querySelector('form select').value =
      tarefaAExibir.tipoTarefa;
    document.querySelector('input[name="realizarDia"]').value =
      tarefaAExibir.dataInicialTarefa;
    document.querySelector('input[name="periodoRepeticao"]').value =
      tarefaAExibir.periodRepetTarefa;
    document.querySelector('input[name="producaoPrevista"]').value =
      tarefaAExibir.quantProduzTarefa;
    document.querySelector('input[name="valorGasto"]').value =
      tarefaAExibir.gastoTarefa;
  }

  return;
}

botaoFormTarefaEl.addEventListener('click', exibeFormularioTarefa);

let botaoConfirmarTarefa = document.querySelector('button[name="adicionarTarefa"]');

botaoConfirmarTarefa.addEventListener('click', encapsularDadosTarefa);

/**
 * Faz uma requisição para o Servlet 'TarefaBDServlet' para adicionar, remover ou alterar uma tarefa
 * @param {Caractere} operacao a operação a ser feita
 * @param {Tarefa} tarefa objeto Tarefa que irá sofrer a operação
 * @author Pedro
 */
function operacaoRequisicaoTarefas(operacao, tarefa){
  console.log('http:localhost:8080/StayGreen/TarefaBDServlet?tarefa=' +
  tarefa.toJSONString() + "&operation=" + operacao );
  Request.get('http:localhost:8080/StayGreen/TarefaBDServlet?tarefa=' +
  tarefa.toJSONString() + "&operation=" + operacao )
  .then(function(resultado){
    console.log(resultado);
  });
}

function editarInsumo(insumoJSON) {
  Request.get('http:localhost:8080/StayGreen/ControleProducaoServlet?botao=editar&JSON='
  + insumoJSON + "&tipo=insumo").then(function(resultado){
    console.log(resultado);
  });
}


function encapsularDadosTarefa(){
    let novaTarefaAdicionada = new Tarefa();

    novaTarefaAdicionada.nomeTarefa =
      document.querySelector('#nomeNovaTarefa').value;
    novaTarefaAdicionada.descrTarefa =
      document.querySelector('textarea[name="descricaoTarefa"').value;
    novaTarefaAdicionada.tipoTarefa =
      document.querySelector('form select').value;
    novaTarefaAdicionada.dataInicialTarefa =
      new Date(document.querySelector('input[name="realizarDia"]').value);
    novaTarefaAdicionada.periodRepetTarefa =
      document.querySelector('input[name="periodoRepeticao"]').value;
    novaTarefaAdicionada.insumosTarefa = "";
    novaTarefaAdicionada.quantProduzTarefa =
      document.querySelector('input[name="producaoPrevista"]').value;
    novaTarefaAdicionada.gastoTarefa =
      document.querySelector('input[name="valorGasto"]').value;

    let insumosGeraisCheck =
        Array.from(document.querySelectorAll('form input[type="checkbox"]')),
    insumosConsumidos =
      insumosGeraisCheck.filter((checkbox) => checkbox.checked);

    for(let insumos of insumosConsumidos){
      novaTarefaAdicionada.insumosTarefa += insumos.value + ', ';
    }
    let length = novaTarefaAdicionada.insumosTarefa.length;
    novaTarefaAdicionada.insumosTarefa = novaTarefaAdicionada.insumosTarefa.substr(0, length-2);
    novaTarefaAdicionada.quantInsumosTarefa = insumosConsumidos.length;
    operacaoRequisicaoTarefas('a', novaTarefaAdicionada);

  //Requisicao simples AJAX de enviar dados de uma nova tarefa
}
