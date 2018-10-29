let containerCalendario = document.querySelector('#containerCalendario');

 /* Gera calendário dinâmico de forma recursiva
  *
  * @author  Pedro
  * @param dataBase a primeira data do calendário
  *
  */

function geraCalendario(dataBase) {
  const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    QUANTIDADEDATAS = 16;

  if(document.querySelector('#containerCalendario > button[name="carregarDatas"]')
      === null){
    let botaoGerarMaisData = document.createElement('button');

    botaoGerarMaisData.name = "carregarDatas";
    botaoGerarMaisData.innerHTML = "Carregar mais";
    containerCalendario.appendChild(botaoGerarMaisData);

    botaoGerarMaisData.addEventListener('click', () => {
      geraCalendario(dataBase);
    });
  }

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


    containerDia.addEventListener('click', () => {
      exibeFormularioNovaTarefa();
      document.querySelector('form input:nth-child(2)').value = containerDia.dataset.date;

    })

    containerDia.appendChild(textoData);
    containerCalendario.appendChild(containerDia);
  }
}

geraCalendario(new Date());
