let tarefasArmazenadasBD;

/*Recebimento das tarefas e insumos armazenados na DB*/
function recebeTarefas() {
  Request.get('http:localhost:8080/StayGreen/TarefaServlet')
    .then((resultado) => {
      tarefasArmazenadasBD = resultado;
      geraCalendario(tarefasArmazenadasBD, true, new Date());
      aplicarEventoGeracaoDataBotoes();
      aplicaFiltros();
      aplicarRelatorios();
    });
}

function recebeInsumos() {
  Request.get('http:localhost:8080/StayGreen/ControleProducaoServlet?botao=buscar')
    .then((resultado) => {
      console.log(resultado);
    });
}

window.onload = recebeTarefas;


let containerCalendario = document.querySelector('#containerCalendario');

const QUANTIDADEDATAS = 16;

/**
 * Gera calendário dinâmico de forma recursiva
 * @author  Pedro
 * @param {Tarefa[]} tarefasProgramadas as tarefas que estão programadas para serem realizadas
 * @param {Boolean} [calendarioSequencial = false] indica se deve gerar datas em sequência ou não. Se for
 * false, só serão geradas as datas nas quais as tarefas serão realizadas.
 * @param {Date=} dataBase a primeira data do calendário
 */
function geraCalendario(tarefasProgramadas, calendarioSequencial = true, dataBase) {
  document.querySelectorAll('#containerCalendario article').forEach(containerDia =>
    containerCalendario.removeChild(containerDia));
  if(calendarioSequencial){
    for (let contadorDias = 0; contadorDias < QUANTIDADEDATAS; contadorDias++) {
      let dataAtual = dataBase,
          containerDia = criaContainerDia(dataAtual, tarefasProgramadas);

      dataAtual.setDate(dataBase.getDate() + 1);

      containerCalendario.appendChild(containerDia);
    }
  }else{
    for(let tarefa of tarefasProgramadas){
      console.log(Tarefa.toDateObject(tarefa.dataInicialTarefa));

      containerCalendario.appendChild(criaContainerDia(Tarefa.toDateObject(tarefa.dataInicialTarefa), [tarefa]));
    }
  }
}

/**
 * Checa se a uma tarefa deve ser realizada em um dia ou não
 *
 * @param {Tarefa} tarefa a tarefa que supostamente acontece no dia proposto
 * @param {Date} dataProposta a data que aconteceria a tarefa
 * @returns {boolean} Se a tarefa deve ser realizada no dia proposto ou não
 */
function deveRealizarTarefa(tarefa, dataProposta) {
  if(tarefa.dataInicialTarefa.month > dataProposta.getMonth())
    return false;

  if (dataProposta.getDate() === tarefa.dataInicialTarefa.dayOfMonth &&
    dataProposta.getMonth() === tarefa.dataInicialTarefa.month ||
        Math.abs((dataProposta.getDate() - tarefa.dataInicialTarefa.dayOfMonth)) %
            tarefa.periodRepetTarefa === 0)
    return true;

  return false;
}

/**
 * Adiciona o evento de clique aos botões de ver mais dias no calendário e
 *  de ver dias anteriores
 */
function aplicarEventoGeracaoDataBotoes() {
  let botaoGerarMaisData = document.querySelector('button[name="carregarDatas"]'),
    botaoVerDatasAnteriores = document.querySelector('button[name="voltarCalendario"]'),
    dataInicial = new Date(document.querySelector('#containerCalendario article:last-of-type').dataset.date);

  //Evento de clique no botão para gerar mais dias
  botaoGerarMaisData.addEventListener('click', () => {
    geraCalendario(tarefasArmazenadasBD, true, dataInicial);
  });

  botaoVerDatasAnteriores.addEventListener('click', () => {
    dataInicial.setDate(dataInicial.getDate() - 2 * QUANTIDADEDATAS);

    geraCalendario(tarefasArmazenadasBD, true, dataInicial);
  })
}

/**
 * Gera um container que representa um dia no calendário e coloca nele todas as tarefas
 * associadas à esse dia.
 * @param {Date} dataContainer a data que o Container vai representar
 * @param {Tarefa[]} tarefasARealizar as tarefas que podem estar no container
 * @returns {HTMLElement} o container já associado à data e às tarefas
 */
function criaContainerDia(dataContainer, tarefasARealizar) {
  let containerDia = document.createElement('article'),
    textoData = document.createElement('p');

  textoData.innerHTML = dataContainer.getDate() + " de " +
    MESES[dataContainer.getMonth()] + " de " + dataContainer.getUTCFullYear();

  containerDia.appendChild(textoData);

  //Colocando atributo data-date no formato YYYY-mm-dd
  containerDia.dataset.date = dataContainer.getUTCFullYear() + "-" +
    (dataContainer.getMonth() + 1 < 10 ? "0" + (dataContainer.getMonth() + 1) :
      dataContainer.getMonth() + 1) + "-" + (dataContainer.getDate() < 10 ? "0" +
        dataContainer.getDate() : dataContainer.getDate());

  //Se houverem tarefas para esse dia, coloque-a no article correspondente
  for (let tarefa of tarefasARealizar) {
    if (deveRealizarTarefa(tarefa, dataContainer)) {
      let tarefaAgendadaEl = document.createElement('p');

      tarefaAgendadaEl.innerHTML = tarefa.nomeTarefa;
      tarefaAgendadaEl.classList.add('tarefa');
      tarefaAgendadaEl.dataset.idTarefa = tarefa.idTarefa;

      tarefaAgendadaEl.addEventListener('click', (e) => {
        let tarefaObjWithId = tarefa;
        tarefaObjWithId.idTarefa = e.currentTarget.dataset.idTarefa;
        exibeFormularioTarefa(tarefaObjWithId);
        e.stopPropagation();
        e.preventDefault();
      });
      containerDia.appendChild(tarefaAgendadaEl);
    }
  }

  /*Assim que clica no container representando o dia, abre o formulário para inserir uma nova tarefa
  naquele dia*/
  containerDia.addEventListener('click', () => {
    exibeFormularioTarefa();
    document.querySelector('form input:nth-child(2)').value = containerDia.dataset.date;
  })

  return containerDia;

}
