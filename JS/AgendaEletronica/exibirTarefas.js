let tarefasArmazenadasBD;

/*Recebimento das tarefas e insumos armazenados na DB*/ 
function recebeTarefas(){
  Request.get('http:localhost:8080/StayGreen/TarefaServlet')
  .then((resultado) => {
    tarefasArmazenadasBD = resultado;   
    geraCalendario(new Date(), tarefasArmazenadasBD);
    aplicarEventoGeracaoDataBotoes();
  });
}

function recebeInsumos(){
  Request.get('http:localhost:8080/StayGreen/ControleProducaoServlet?botao=buscar')
  .then((resultado) => {
      console.log(resultado);
  });
}

window.onload = recebeTarefas;


let containerCalendario = document.querySelector('#containerCalendario');

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
],
  QUANTIDADEDATAS = 16;

 /**
  * Gera calendário dinâmico de forma recursiva
  * @author  Pedro
  * @param {Date} dataBase a primeira data do calendário
  * @param {Tarefa[]} tarefasProgramadas as tarefas que estão programadas para serem realizadas
  */
function geraCalendario(dataBase, tarefasProgramadas) {

  //Gerando os dias e adicionando as tarefas programadas
  for(let contadorDias = 0; contadorDias < QUANTIDADEDATAS; contadorDias++){
    let containerDia = document.createElement('article'),
        textoData = document.createElement('p'),
        dataAtual = dataBase;

    dataAtual.setDate(dataBase.getDate() + 1);

    //Colocando atributo data-date no formato YYYY-mm-dd
    containerDia.dataset.date = dataAtual.getUTCFullYear() + "-" +
        (dataAtual.getMonth() + 1 < 10 ? "0" + (dataAtual.getMonth() + 1) :
          dataAtual.getMonth() + 1) + "-" + (dataAtual.getDate() < 10 ? "0" +
            dataAtual.getDate() : dataAtual.getDate());

    textoData.innerHTML = dataAtual.getDate() + " de " +
      MESES[dataAtual.getMonth()] + " de " + dataAtual.getUTCFullYear();

    containerDia.appendChild(textoData)

    //Se houverem tarefas para esse dia, coloque-a no article correspondente
    for(let tarefa of tarefasProgramadas){
       if(deveRealizarTarefa(tarefa, dataAtual)){
          let tarefaAgendadaEl = document.createElement('p');
  
          tarefaAgendadaEl.innerHTML = tarefa.nomeTarefa;
          tarefaAgendadaEl.classList.add('tarefa');
          
          tarefaAgendadaEl.addEventListener('click', () => exibeFormularioTarefa(tarefa));
          containerDia.appendChild(tarefaAgendadaEl);
        }
     }
    
    /*Assim que clica no container representando o dia, abre o formulário para inserir uma nova tarefa
    naquele dia*/
    containerDia.addEventListener('click', () => {
      exibeFormularioTarefa();
      document.querySelector('form input:nth-child(2)').value = containerDia.dataset.date;
    })

    containerCalendario.appendChild(containerDia);
  }
}

/**
 * Checa se a uma tarefa deve ser realizada em um dia ou não
 * 
 * @param {Tarefa} tarefa a tarefa que supostamente acontece no dia proposto
 * @param {Date} dataProposta a data que aconteceria a tarefa
 * @returns {boolean} Se a tarefa deve ser realizada no dia proposto ou não
 */
function deveRealizarTarefa(tarefa, dataProposta){
  if(dataProposta.getDate() === tarefa.dataInicialTarefa.dayOfMonth && 
    dataProposta.getMonth() === tarefa.dataInicialTarefa.month)
    return true;

  return false;
}

/**
 * Adiciona o evento de clique aos botões de ver mais dias no calendário e 
 *  de ver dias anteriores
 */
function aplicarEventoGeracaoDataBotoes(){
  let botaoGerarMaisData = document.querySelector('button[name="carregarDatas"]'),
      botaoVerDatasAnteriores = document.querySelector('button[name="voltarCalendario"]'),
      dataInicial = new Date(document.querySelector('#containerCalendario article:last-of-type').dataset.date);

  //Evento de clique no botão para gerar mais dias
    botaoGerarMaisData.addEventListener('click', () => {
      document.querySelectorAll('#containerCalendario article').forEach(containerDia => 
        containerCalendario.removeChild(containerDia));

      geraCalendario(dataInicial, tarefasArmazenadasBD);
    });

    botaoVerDatasAnteriores.addEventListener('click', () =>{
      dataInicial.setDate(dataInicial.getDate() - 2 * QUANTIDADEDATAS);

      document.querySelectorAll('#containerCalendario article').forEach(containerDia => 
        containerCalendario.removeChild(containerDia));
        geraCalendario(dataInicial, tarefasArmazenadasBD);
    })
}