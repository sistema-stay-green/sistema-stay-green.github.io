let objetoTeste =[{
    mes: 'janeiro'
},{
    mes: 'fevereiro'
},{
    mes: 'marco'
}]

let checkboxFiltroData = document.querySelectorAll('input[name="filtroData"'),
    selectMeses = document.querySelector('select[name="filtroMes"');

for(let MES of MESES){
    let opcaoMes = document.createElement('option');

    opcaoMes.innerHTML = MES;
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