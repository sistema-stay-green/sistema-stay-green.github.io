let botaoFormTarefaEl = document.querySelector('#botaoFormTarefa'),
    containerFormNovaTarefa = document.querySelector('form');

/*Exibe o formulário de adicionar nova tarefa quando usuário clica no
botão '+ Nova Tarefa'*/

function exibeFormularioNovaTarefa(){
  let mascaraFormEl = document.querySelector('#mascaraForm');

  mascaraFormEl.classList.remove('invisivel');

  mascaraFormEl.addEventListener('click', () => {
    mascaraFormEl.classList.add('invisivel');
    containerFormNovaTarefa.classList.add('invisivel');
  })

  containerFormNovaTarefa.classList.remove('invisivel');

}
botaoFormTarefaEl.addEventListener('click', exibeFormularioNovaTarefa);

let botaoConfirmarTarefa = document.querySelector('#adicionarNovaTarefa');

botaoConfirmarTarefa.addEventListener('click', encapsularDadosTarefa);

function encapsularDadosTarefa(){
    let novaTarefaAdicionada = new Tarefa();

    novaTarefaAdicionada.nomeTarefa =
      document.querySelector('#nomeNovaTarefa').value;
    novaTarefaAdicionada.tipoTarefa =
      document.querySelector('form select').value;
    novaTarefaAdicionada.dataInicialTarefa =
      new Date(document.querySelector('form input:nth-child(2)').value);
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

/*let requisicao = new XMLHttpRequest;
botaoFormTarefaEl.addEventListener('click', function(){
  requisicao.open('GET', '/nomeservlet');
  requisicao.send();

});

requisicao.onreadystatechange = (/*InputsTarefa??) =>{
   if(requisicao.readyState == XMLHttpRequest.DONE){
      if(requisicao.status == 200){
          InputsTarefa.toJSON().stringify();
      }
   }
}*/
}
