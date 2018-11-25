let tarefasArmazenadasBD,
  insumosArmazenadosBD;

let staticDebugMode = false;

/** Recebimento das tarefas armazenados na DB. Assim que
 * carregam, as demais funcionalidades do sistema são ativadas.
*/
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

/** Recebe os insumos contidos no BD para colocá-los no formulário
 * de nova tarefa e permitir que o usuário os selecione
 */
function recebeInsumos() {
  Request.get('http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=insumo')
    .then((resultado) => {
      insumosArmazenadosBD = resultado;

      let insumosSpan = document.querySelector("#insumosForm");
      insumosSpan.innerHTML = "";

      //Insumos descartados não poderão estar disponíveis para adicionar na tarefa
      insumosArmazenadosBD = insumosArmazenadosBD.filter(insumo => insumo.quantEstoqueInsumo > 0);

      for (let insumo of insumosArmazenadosBD) {
        let insumoCheckBox = document.createElement('input'),
          labelInsumo = document.createElement('label');
        insumoCheckBox.type = 'checkbox';
        insumoCheckBox.name = insumo.nomeInsumo;
        insumoCheckBox.value = insumo.nomeInsumo;
        labelInsumo.innerHTML = insumo.nomeInsumo;
        labelInsumo.appendChild(insumoCheckBox);
        insumosSpan.appendChild(labelInsumo);
      }

      recebeTarefas();
    });
}

window.onload = recebeInsumos;


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
  if (calendarioSequencial) {
    for (let contadorDias = 0; contadorDias < QUANTIDADEDATAS; contadorDias++) {
      let dataAtual = dataBase,
        containerDia = criaContainerDia(dataAtual, tarefasProgramadas);

      dataAtual.setDate(dataBase.getDate() + 1);

      containerCalendario.appendChild(containerDia);
    }
  } else {
    for (let tarefa of tarefasProgramadas) {
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
  let dataTarefa = Tarefa.toDateObject(tarefa.dataInicialTarefa);

  dataTarefa.setHours(0, 0, 0, 0);

  if (dataTarefa.getTime() > dataProposta.getTime())
    return false;

  if (dataProposta.getUTCDate() === tarefa.dataInicialTarefa.dayOfMonth &&
    dataProposta.getMonth() === tarefa.dataInicialTarefa.month ||
    Math.abs((dataProposta.getUTCDate() - tarefa.dataInicialTarefa.dayOfMonth)) %
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
    textoData = document.createElement('p'),
    dataAtual = new Date();

  dataAtual.setHours(0, 0, 0, 0);
  dataContainer.setHours(0, 0, 0, 0);

  textoData.innerHTML = dataContainer.getDate() + " de " +
    MESES[dataContainer.getMonth()] + " de " + dataContainer.getUTCFullYear();

  /*Marcando o dia atual com uma estilização diferente,
  apenas para orientação do usuário*/
  if (dataAtual.getTime() === dataContainer.getTime()) {
    textoData.style.color = 'var(--brancoIvory)';
    textoData.style.backgroundColor = 'var(--verdeCamarone)';
  }

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

      if (dataContainer.getTime() <= dataAtual.getTime()) {
        let quantDesconto = 1;

        if(dataContainer.getTime() === dataAtual.getTime()){
          let quantRepetTarefa = 
          Math.floor((dataContainer.getUTCDate() - Tarefa.toDateObject(tarefa.dataInicialTarefa).getUTCDate())
           / tarefa.periodRepetTarefa);

          quantDesconto = quantRepetTarefa + 1;

        }
        
        /*Atualizando o estoque dos insumos que as tarefas realizadas no
        dia atual consomem*/
        for (let insumoTarefa of tarefa.insumosTarefa.split(", ")) {
          for (let insumoGeral of insumosArmazenadosBD) {
            if (insumoTarefa === insumoGeral.nomeInsumo) {
              insumoGeral.quantEstoqueInsumo -= quantDesconto;
              atualizarQtInsumo(insumoGeral);
            }
          }
        }
      }

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
