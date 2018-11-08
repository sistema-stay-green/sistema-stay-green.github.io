let botaoFormTarefaEl = document.querySelector('#botaoFormTarefa'),
    containerFormNovaTarefa = document.querySelector('form'),
    mascaraFormEl = document.querySelector('#mascaraForm');

function escondeFormulario(){
  mascaraFormEl.classList.add('invisivel');
  containerFormNovaTarefa.classList.add('invisivel');
}
/*Exibe o formulário de adicionar nova tarefa quando usuário clica no
botão '+ Nova Tarefa'*/

function exibeFormularioNovaTarefa(){
  let botaoCancelarTarefaEl = document.querySelector('button[name="cancelarTarefa"]');

  mascaraFormEl.classList.remove('invisivel');
  mascaraFormEl.addEventListener('click', escondeFormulario);
  
  botaoCancelarTarefaEl.addEventListener('click', escondeFormulario);

  containerFormNovaTarefa.classList.remove('invisivel');
}

botaoFormTarefaEl.addEventListener('click', exibeFormularioNovaTarefa);

let botaoConfirmarTarefa = document.querySelector('button[name="adicionarTarefa"]');

botaoConfirmarTarefa.addEventListener('click', encapsularDadosTarefa);

function operacaoRequisicaoTarefas(operacao){
  Request.get('http:localhost:8080/staygreen/TarefaBDServlet?tarefa=' +
  novaTarefaAdicionada.toJSONString() + "&operation=" + operacao )
  .then(function(resultado){
    window.alert(resultado);
  });
}


function encapsularDadosTarefa(){
    let novaTarefaAdicionada = new Tarefa();

    novaTarefaAdicionada.nomeTarefa =
      document.querySelector('#nomeNovaTarefa').value;
    novaTarefaAdicionada.tipoTarefa =
      document.querySelector('form select').value;
    novaTarefaAdicionada.dataInicialTarefa =
      new Date(document.querySelector('input[name="realizarDia"]').value);
    novaTarefaAdicionada.periodoRepetTarefa =
      document.querySelector('input[name="periodoRepeticao"]').value;
    novaTarefaAdicionada.insumosConsumidos = [];
    novaTarefaAdicionada.qtProduzTarefa =
      document.querySelector('input[name="producaoPrevista"]').value;
    novaTarefaAdicionada.gastoTarefa =
      document.querySelector('input[name="valorGasto"]').value;

    let insumosGeraisCheck =
        Array.from(document.querySelectorAll('form input[type="checkbox"]')),
    insumosConsumidos =
      insumosGeraisCheck.filter((checkbox) => checkbox.checked);

    for(let insumos of insumosConsumidos){
      novaTarefaAdicionada.insumosConsumidos.push(insumos.value);
    }

    novaTarefaAdicionada.qtInsumosTarefa = insumosConsumidos.length;

    console.table(novaTarefaAdicionada);

    operacaoRequisicaoTarefas('a');

  //Requisicao simples AJAX de enviar dados de uma nova tarefa
}