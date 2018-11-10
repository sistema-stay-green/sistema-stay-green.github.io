/**
 * Filtra um conjunto de tarefas baseado no seu dia de execução
 * 
 * @param {Tarefa} tarefas as tarefas que passarão pelo filtro
 * @param {Number} diaFiltro o dia que serve de base para o filtro
 * @returns Array com as tarefas que passaram pelo filtro
 */
function filtrarTarefaDia(tarefas, diaFiltro){
    return tarefas.filter(tarefa => tarefa.dataInicialTarefa.dayOfMonth === diaFiltro);
}

/**
 * Filtra um conjunto de tarefas baseado na semana atual
 * @param {Tarefa} tarefas as tarefas que passarão pelo filtro
 */
function filtrarTarefaSemana(tarefas){
    let diaCorrente = new Date().getDate();

    return tarefas.filter(tarefa => {
        do{
            if(tarefa.dataInicialTarefa.dayOfMonth === diaCorrente)
              return true;
        }while(diaCorrente != (diaCorrente + 6))
        
         return false; 
    });
}

/**
 * Filtra um conjunto de tarefas baseado no mês dia de execução
 * 
 * @param {Tarefa} tarefas as tarefas que passarão pelo filtro
 * @param {Number} codigoMes o mês que serve de base para o filtro
 * @returns Array com as tarefas que passaram pelo filtro
 */
function filtrarTarefaMes(tarefas, codigoMes){
    return tarefas.filter(tarefa => tarefa.dataInicialTarefa.month === codigoMes);
}

/**
 * Filtra um conjunto de tarefas baseado no seu tipo
 * 
 * @param {Tarefa} tarefas as tarefas que passarão pelo filtro
 * @param {String} tipoFiltro o tipo da tarefa que deve passar pelo filtro
 * @returns Array com as tarefas que passaram pelo filtro
 */
function filtrarTarefasTipo(tarefas, tipoFiltro){
    return tarefas.filter(tarefa => tarefa.tipoTarefa === tipoFiltro);
}

const FILTROSPORDATA = [filtrarTarefaDia, filtrarTarefaSemana, filtrarTarefaMes];



let checkboxFiltroData = document.querySelectorAll('input[name="filtroData"'),
    selectMeses = document.querySelector('select[name="filtroMes"]');

for(let contadorMes = 0; contadorMes < MESES.length; contadorMes++){
    let opcaoMes = document.createElement('option');

    opcaoMes.innerHTML = MESES[contadorMes];
    opcaoMes.value = contadorMes;
    selectMeses.appendChild(opcaoMes);
}

let filtrosMarcados = [];

checkboxFiltroData.forEach(checkboxData => {
    checkboxData.addEventListener('change', () =>{
        if(checkboxData.checked){
            filtrosMarcados.push(checkboxData.value);
        }else{
            filtrosMarcados.splice(filtrosMarcados.indexOf(checkboxData.value), 1);
            //JSON com as tarefas filtradas volta ao estado original
        }

        for(let filtro of filtrosMarcados){
            //resultado recebe ele mesmo filtrado com cada filtro do vetor
        }
            
    }
    )
})