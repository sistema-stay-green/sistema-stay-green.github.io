let containerCalendario = document.querySelector('#containerCalendario');

function geraCalendario() {
  const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    QUANTIDADEDATAS = 16;

  let dataAuxiliar = new Date();
  for (let contadorDias = 0; contadorDias < QUANTIDADEDATAS; contadorDias++) {
    let containerDia = document.createElement('article'),
      textoData = document.createElement('p'),
      dataAtual = new Date();

      dataAtual.setDate(dataAtual.getDate() + contadorDias);

    textoData.innerHTML = dataAtual.getDate() + " de " +
      MESES[dataAtual.getMonth()] + " de " + dataAtual.getUTCFullYear();

    containerDia.appendChild(textoData);
    containerCalendario.appendChild(containerDia);
  }


}

geraCalendario();
