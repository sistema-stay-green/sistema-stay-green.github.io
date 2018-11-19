/**
 * Filtra um conjunto de tarefas baseado no seu dia de execução
 * 
 * @param {Tarefa} tarefa  tarefa que passará pelo filtro
 * @returns {Boolean} se a tarefa passou no filtro ou não
 */
function filtrarTarefaDia(tarefa) {
    if (parseInt(this) % tarefa.dataInicialTarefa.dayOfMonth === 0) {
        return true;
    }
    return false;
}

/**
 * Filtra um conjunto de tarefas baseado na semana atual
 * @param {Tarefa} tarefa  tarefa que passará pelo filtro
 * @returns {Boolean} se a tarefa passou no filtro ou não
 */
function filtrarTarefaSemana(tarefa) {
    let diaCorrente = new Date().getDate(),
        limiteDiaSemana = diaCorrente + 6;
    do {
        if (diaCorrente % tarefa.dataInicialTarefa.dayOfMonth === 0)
            return true;

        diaCorrente++;
    } while (diaCorrente != limiteDiaSemana)

    return false;
}

/**
 * Filtra um conjunto de tarefas baseado no mês dia de execução
 * 
 * @param {Tarefa} tarefa  tarefa que passará pelo filtro
 * @returns {Boolean} se a tarefa passou no filtro ou não
 */
function filtrarTarefaMes(tarefa) {
    return tarefa.dataInicialTarefa.month === parseInt(this);
}

/**
 * Filtra um conjunto de tarefas baseado no seu tipo
 * 
 * @param {Tarefa} tarefa  tarefa que passará pelo filtro
 * @returns {Boolean} se a tarefa passou no filtro ou não
 */
function filtrarTarefasTipo(tarefa) {
    for(let tipo of this){
        if(tarefa.tipoTarefa === String(tipo))
            return true;
    }
    return false;
}


const FUNCOESFILTROS = [filtrarTarefaDia, filtrarTarefaSemana, filtrarTarefaMes, filtrarTarefasTipo],
    MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];



let selectMeses = document.querySelector('select[name="filtroMes"]');

for (let contadorMes = 0; contadorMes < MESES.length; contadorMes++) {
    let opcaoMes = document.createElement('option');

    opcaoMes.innerHTML = MESES[contadorMes];
    opcaoMes.value = contadorMes;
    selectMeses.appendChild(opcaoMes);
}


/**
 * Aplica os filtros de data (por dia, semana e mês) e gerais (por tipo,
 * relacionados à agricultura e a uso defensivo) para as tarefas
 */
function aplicaFiltros() {
    let filtrosMarcados = [],
        tarefasFiltradas = Array.from(tarefasArmazenadasBD),
        checkboxFiltroData = document.querySelectorAll('input[name="filtroData"'),
        checkboxFiltrosGerais = document.querySelectorAll('input[name="filtroGeral"]'),
        filtrosDisponiveis = [checkboxFiltroData, checkboxFiltrosGerais];

    filtrosDisponiveis.forEach(conjuntoDeFiltros => {
        conjuntoDeFiltros.forEach(filtro => {
            filtro.addEventListener('change', () => {
                if (filtro.checked) {
                    filtrosMarcados.push(filtro.value);
                } else {
                    filtrosMarcados.splice(filtrosMarcados.indexOf(filtro.value), 1);
                    tarefasFiltradas = Array.from(tarefasArmazenadasBD);
                }

                for (let codigoFiltro of filtrosMarcados) {
                    switch (parseInt(codigoFiltro)) {
                        case 0:
                            let diaSelecionado = parseInt(document.querySelector('input[name="filtroDia"]').value);
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[codigoFiltro], diaSelecionado);
                            break;
                        case 1:
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[codigoFiltro]);
                            break;
                        case 2:
                            let mesSelecionado = parseInt(document.querySelector('select[name="filtroMes"]').value);
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[codigoFiltro], mesSelecionado);
                            break;
                        case 3:
                            let tipoSelecionado = document.querySelector('select[name="tiposTarefa"]').value;
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[codigoFiltro], [tipoSelecionado]);
                            break;
                        case 4:
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[3],
                                 ["IRRIGACAO", "MAQUINÁRIO", "COLHEITA", "PECUARIA"]);
                            break;
                        case 5:
                            tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[3],
                                 ["ADUBACAO", "ARAR"]);  
                            break;
                    }
                    //tarefasFiltradas = tarefasFiltradas.filter(FUNCOESFILTROS[codigoFiltro](tarefa, ));
                    //resultado recebe ele mesmo filtrado com cada filtro do vetor
                }

                if(tarefasFiltradas.length === 0){
                    let tituloErro = document.createElement('h1');
                    tituloErro.innerHTML = 'Nenhuma tarefa se encaixa aos filtros selecionados.';
                    containerCalendario.appendChild(tituloErro);
                }else{
                    if(document.querySelector('#containerCalendario > h1') != null)
                         containerCalendario.removeChild(document.querySelector('#containerCalendario > h1'));
                }
                //Se há filtros ativos, mostre apenas as tarefas filtradas
                if(filtrosMarcados.length != 0)
                    geraCalendario(tarefasFiltradas, false);
                else    
                    geraCalendario(tarefasArmazenadasBD, true, new Date());
                
            }
            )
        })
    })

}