
/**
* Define o status da maquina na tabela
* @param {String} Status da máquina
* @returns {String} Retorna o status atual da máquina
* @author Ítalo Fideles, Nikolas Victor
*/
function formatarStatus(status){
  switch (status) {
    case "EM_POSSE":
      status = "Em posse";
      break;
    case "ALUGADO":
      status = "Alugado";
      break;
    case "VENDIDO":
      status = "Vendido";
      break;
    case "EM_MANUTENCAO":
      status = "Em manutenção";
      break;
    case "DESCARTADO":
      status = "Descartado";
      break;
    default:
      status = "N/A"
  }
  return status;
}

/**
* Coloca a data no formato convêncional
* @param {String} Data atual
* @returns {String} Data atual no novo formato
* @author Ítalo Fideles, Nikolas Victor
*/

function formatarData(data){
  data = data.split("-");
  data = data[2] + "/" + data[1] + "/" + data[0];
  return data;
}

/**
* Coloca a data no formato convêncional
* @param {String} Data atual
* @returns {String} Data atual no novo formato
* @author Ítalo Fideles, Nikolas Victor
*/

function formatarDataObj(data){
  if(data != null){
    data = data.toISOString().split('T')[0];
    data = data.split("-");
    data = data[2] + "/" + data[1] + "/" + data[0];
    return data;
  }
}

/**
* Estilização: Define a abertura/fechamento das modais
* @author Ítalo Fideles, Nikolas Victor
*/
function estilizarModal(){
  botaoVoltar.addEventListener("click", function(){
    document.querySelector(".valores_fundo").style.display = "none";
  })
  let fecharModal = document.querySelectorAll(".fecharModal");
  for (let fechar of fecharModal){
    fechar.addEventListener("click", function(){
    document.querySelector("#saidas").style.display = "none";
    document.querySelector("#editar").style.display = "none";
    document.querySelector(".relatorioModal").style.display = "none";
  })
  }
  window.addEventListener("click", function(event){
      if (event.target == document.querySelector(".valores_fundo") ||
          event.target == document.querySelector("#saidas") ||
          event.target == document.querySelector("#editar") ||
          event.target == document.querySelector(".relatorioModal")) {
          event.target.style.display = "none";
      }
  })
}

/**
* Checa e valida o cadastro
* @param {String} Data atual
* @returns {String} True ou False
* @author Ítalo Fideles, Nikolas Victor
*/
function validacao(valores){
  let hoje = new Date(),
      dia = hoje.getDate(),
      mes = hoje.getMonth()+1, //January is 0!
      ano = hoje.getFullYear();

   if(dia<10){
          dia='0'+dia
      }
      if(mes<10){
          mes='0'+mes
      }
  hoje = ano+'-'+mes+'-'+dia;

  if(valores[valores.length-1].value > hoje){
    valores[valores.length-1].value = null;
  }
  for (var i = 0; i < valores.length; i++) {

    if(valores[i].value == ""){
      document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
      return false;
    }
  }
    document.querySelector("button[name='botaoAcao']").classList.remove("botaoDesab");
    return true;
}

/**
* Verifica a validade dos valores preenchidos no formulário
* @param {String} Data
* @returns {String} Retorna true ou false
* @author Ítalo Fideles , Nikolas Victor
*/

function validacaoEditar(valores){
  let hoje = new Date(),
      dia = hoje.getDate(),
      mes = hoje.getMonth()+1, //January is 0!
      ano = hoje.getFullYear();

   if(dia<10){
          dia='0'+dia
      }
      if(mes<10){
          mes='0'+mes
      }
  hoje = ano+'-'+mes+'-'+dia;

  if(valores[valores.length-1].value > hoje){
    valores[valores.length-1].value = null;
  }
  for (var i = 0; i < valores.length; i++) {


    if(valores[i].value == ""){
      document.querySelector("button[name='botaoEditarMaquina']").classList.add("botaoDesab");
      return false;
    }
  }
    document.querySelector("button[name='botaoEditarMaquina']").classList.remove("botaoDesab");
    return true;
}

/**
* Estilização: Limita a data de compra para o dia atual
* @author Ítalo Fideles , Nikolas Victor
*/

function limitaDataCompra(){

  let hoje = new Date(),
      dia = hoje.getDate(),
      mes = hoje.getMonth()+1, //January is 0!
      ano = hoje.getFullYear();
   if(dia<10){
          dia='0'+dia
      }
      if(mes<10){
          mes='0'+mes
      }

  hoje = ano+'-'+mes+'-'+dia;
  document.querySelector("input[name='data']").setAttribute("max", hoje);
  document.querySelector("input[name='data-editar']").setAttribute("max", hoje);
}

/**
* Estilização: Limita o valor de compra e venda para no mínimo 1
* @author Ítalo Fideles , Nikolas Victor
*/

function limitaValorCompra_ValorVenda(){
  document.querySelector("input[name='valor']").oninput = function () {
      if (this.value < 1) {
          this.value = null;
      }
  }
  document.querySelector("input[name='valor-editar']").oninput = function () {
      if (this.value < 1) {
          this.value = null;
      }
  }
  document.querySelector("input[name='valorAluguel']").oninput = function () {
      if (this.value < 1) {
          this.value = null;
      }
  }
}

/**
* Estilização: Limita a data de retorno para no mínimo um dia depois do dia atual
* @author Ítalo Fideles , Nikolas Victor
*/

function limitaDataRetorno(){

  let hoje = new Date(),
      dia = hoje.getDate(),
      mes = hoje.getMonth()+1, //January is 0!
      ano = hoje.getFullYear();
   if(dia<10){
          dia='0'+dia
      }
      if(mes<10){
          mes='0'+mes
      }

  hoje = ano+'-'+mes+'-'+dia;
  document.querySelector("input[name='periodo']").setAttribute("min", hoje);
}

/**
* Estilização: Limita a data de saida para no mínimo um dia após o dia atual
* @author Ítalo Fideles , Nikolas Victor
*/

function limitaDataSaida(){

  let hoje = new Date(),
      dia = hoje.getDate(),
      mes = hoje.getMonth()+1, //January is 0!
      ano = hoje.getFullYear();
   if(dia<10){
          dia='0'+dia
      }
      if(mes<10){
          mes='0'+mes
      }

  hoje = ano+'-'+mes+'-'+dia;
  document.querySelector("input[name='periodoSaida']").setAttribute("max", hoje);
}

/**
* Estilização: Limita o indice de depreciação em 90% a.a.
* @author Ítalo Fideles , Nikolas Victor
*/

function limiteDepreciacao(){
  document.querySelector("input[name='depreciação']").oninput = function () {
      if (this.value > 100) {
          this.value = null;
      }
  }
  document.querySelector("input[name='depreciação-editar']").oninput = function () {
      if (this.value > 100) {
          this.value = null;
      }
  }
}

/**
* Estilização: Fechar a modal de cadastro
* @author Ítalo Fideles , Nikolas Victor
*/

function voltar(){
  document.querySelector(".maquinas").style.display = "inline-block";
  document.querySelector(".valores_fundo").style.display = "none";
  let inputs = document.querySelectorAll(".inputs");
  for (input of inputs) {
    input.value = "";
  }
}

/**
* Estilização: Abre a modal que permite o cadastro
* @author Ítalo Fideles , Nikolas Victor
*/

function mostraModalCadastro(){

    for (input of inputs) {
      input.value = "";
    }
    document.querySelector(".valores_fundo").style.display = "block";

}

/**
* Estilização: Filtra a exibição das máquinas
* @author Ítalo Fideles , Nikolas Victor
*/

function filtraPagina(){
  let filtro = document.querySelector("#filtro_select_status"),
      maquinas = document.querySelectorAll(".maquina");
  for (row of maquinas) {
    if (filtro.value == "Em Posse") {
      let node = row.children;

      if (node[6].innerHTML == "Em posse") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Em Manutenção") {
      let node = row.children;
      if (node[6].innerHTML == "Em manutenção") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Alugados") {
      let node = row.children;
      if (node[6].innerHTML == "Alugado") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Vendidos") {
      let node = row.children;
      if (node[6].innerHTML == "Vendido") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    if (filtro.value == "Descartados") {
      let node = row.children;
      if (node[6].innerHTML == "Descartado") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    if (filtro.value == "Todos") {
      let node = row.children;
      row.style.display = "table-row";
    }

  }
}

/**
* Estilização: Mostra o estado atual da máquina na tabela
* @author Ítalo Fideles , Nikolas Victor
*/

function saida(){
  let opcao = document.querySelector("#filtro_saida"),
      elemento = event.target,
      nodes;
      status;

  elemento = elemento.parentNode;
  nodes = elemento.parentNode.children,
  status = nodes[6].innerHTML;



  document.querySelector("#editar").style.display = "none";
  if (status === "Em posse" || status === "Em manutenção") {
    document.querySelector("#saidas").style.display = "block";

      if(elemento.className != "botaoDesab"){
        document.querySelector("#filtro_saida").addEventListener("change",
        function(elemento){
          if(opcao.value == "Alugar"){
            document.querySelector("label[name='valor-label']").style.display = "block";
            document.querySelector("label[name='periodo-label']").style.display = "block";
            document.querySelector("label[name='periodoSaida-label']").style.display = "none";
          }
          if(opcao.value == "Descartar"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "none";
            document.querySelector("label[name='periodoSaida-label']").style.display = "block";
          }
          if(opcao.value == "Vender"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "none";
            document.querySelector("label[name='periodoSaida-label']").style.display = "block";
          }
          if(opcao.value == "Enviar para conserto"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodoSaida-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "block";
          }
        });
    }
    let botão = document.querySelector("button[name='botaoEnviar']");
      botão.addEventListener("click", function(){
        AlteraStatus(elemento,opcao);
        document.querySelector("#saidas").style.display = "none";
      });
    }

  }

/**
* Estilização: Desabilita o botão de saída de acordo com o estado da máquina
* @author Ítalo Fideles , Nikolas Victor
*/

function visaoBotao() {
  let botoesSaida = document.querySelectorAll(".botaoSaida");
  let botoesEditar = document.querySelectorAll(".botaoEditar");

  for (botao of botoesSaida) {
    var pesquisa = botao.parentNode.parentNode;
    var nodes = pesquisa.children;
    status = nodes[6].innerHTML;

    if(status === "Vendido" || status === "Descartado" || status === "Alugado"){
      botao.classList.remove("botaoSaida");
      botao.classList.add("botaoDesab");
    }
    else {
      botoesSaida.className = "botaoSaida";
    }
  }


  for (botao of botoesEditar) {
    var pesquisa = botao.parentNode.parentNode;
    var nodes = pesquisa.children;
    status = nodes[6].innerHTML;

    if(status === "Vendido" || status === "Descartado"){
      botao.classList.remove("botaoEditae");
      botao.classList.add("botaoDesab");
    }
    else {
      botoesEditar.className = "botaoEditar";
    }
  }
}

/**
* Estilização: Opção para poder editar máquinas em posse
* @author Ítalo Fideles , Nikolas Victor
*/

function mostraModalEditar(){
  elemento = event.target;
  elemento = elemento.parentElement;
  nodes = elemento.parentNode.children;
  status = nodes[6].innerHTML;
  console.log(nodes[5].innerHTML);
  if(status === "Em posse" || status === "Em manutenção"|| status === "Alugado"){
    document.querySelector("#editar").style.display = "block";
    document.querySelector("input[name='id-editar']").value = nodes[0].innerHTML,
    document.querySelector("input[name='nome-editar']").value = nodes[1].innerHTML,
    document.querySelector("input[name='finalidade-editar']").value = nodes[2].innerHTML,
    document.querySelector("input[name='valor-editar']").value = nodes[3].innerHTML,
    document.querySelector("input[name='depreciação-editar']").value = nodes[4].innerHTML,
    document.querySelector("input[name='data-editar']").value = nodes[5].innerHTML;
  }
}

/**
* Estilização: Relatório da página
* @author Ítalo Fideles , Nikolas Victor
*/

function relatorio(){
  let maquinas = document.querySelectorAll(".maquina"),
      totalMaquinas = maquinas.length,
      maquinasPosse = 0,
      maquinasAlugadas = 0,
      maquinasDescartadas = 0,
      maquinasVendidas = 0,
      maquinasManutencao = 0,
      valorTotalMaquina = 0,
      string = "",
      elementos = null;

  for (var i = 0; i < maquinas.length; i++) {
    elementos = maquinas[i].children;
    if(elementos[6].innerHTML == "Em posse"){
      maquinasPosse++;
      valorTotalMaquina += parseFloat(elementos[7].innerHTML);
    }
    if(elementos[6].innerHTML == "Vendido"){
      maquinasVendidas++;
    }
    if(elementos[6].innerHTML == "Alugado"){
      maquinasAlugadas++;
      valorTotalMaquina += parseFloat(elementos[7].innerHTML);
    }
    if(elementos[6].innerHTML == "Em manutenção"){
      maquinasManutencao++;
      valorTotalMaquina += parseFloat(elementos[7].innerHTML);
    }
    if(elementos[6].innerHTML == "Descartado"){
      maquinasDescartadas++;
    }
  }
  document.querySelector("#totalMaquinas").innerHTML =
      "<h4>Quantidade de maquinas</h4><ul>" +
      "<li>" + totalMaquinas + "</li></ul>";

  document.querySelector("#totalTiposMaquinas").innerHTML =
      "<h4>Total de maquinas</h4><ul>" +
      "<li>Em posse - " +maquinasPosse+ "</li>" +
      "<li>Vendidas - " +maquinasVendidas+ "</li>" +
      "<li>Alugadas - " +maquinasAlugadas+ "</li>" +
      "<li>Descartadas - " +maquinasDescartadas+ "</li>" +
      "<li>Em manutenção - " +maquinasManutencao+ "</li></ul>";

  document.querySelector("#valorTotalMaquina").innerHTML =
      "<h4>Valor total das maquinas</h4><ul>" +
      "<li>Valor total - R$ " + valorTotalMaquina.toFixed(2) + "</li></ul>";

  document.querySelector(".relatorioModal").style.display = "block";
}

/**
* Estilização: Passa os valores do formulário e tranfere para o banco de dados
* @author Ítalo Fideles , Nikolas Victor
*/

function enviaInformacoesEditar() {
  let id = document.querySelector("input[name='id-editar']").value,
  nome = document.querySelector("input[name='nome-editar']").value,
  finalidade = document.querySelector("input[name='finalidade-editar']").value,
  valor =  document.querySelector("input[name='valor-editar']").value,
  data = document.querySelector("input[name='data-editar']").value,
  dataAs = document.querySelector("input[name='data-editar']").valueAsDate,
  depreciacao = document.querySelector("input[name='depreciação-editar']").value;


  editarBE(id,nome, finalidade, depreciacao, valor, data)

  document.querySelector("#editar").style.display = "none";
}

/**
* Verifica a validade dos valores preenchidos no formulário
* @param {String} Elemento que irá ser alterado
* @param {String} Opções de alteração para o status da máquina
* @returns {String} Retorna a circunstância atual da máquina
* @author Ítalo Fideles , Nikolas Victor
*/

function AlteraStatus(elemento,opcao){
    console.log(elemento);
    elemento = elemento.parentNode;
    console.log(elemento);
    nodes = elemento.children;
    let valorAluguel = document.querySelector("input[name='valorAluguel']").value,
        periodo = document.querySelector("input[name='periodo']").value,
        periodoSaida = document.querySelector("input[name='periodoSaida']").value;

        if(opcao.value == "Alugar"){
            alugar(nodes[0].innerHTML, periodo, valorAluguel);
        }
        if(opcao.value == "Vender"){
            vender(nodes[0].innerHTML, periodoSaida);
        }
        if(opcao.value == "Enviar para conserto"){
            manuntenir(nodes[0].innerHTML, periodo);
        }
        if(opcao.value == "Descartar"){
            descartar(nodes[0].innerHTML, periodoSaida);
        }
  let valores = document.querySelectorAll("input[name='data']");
  for (var i = 0; i < valores.length; i++) {
    valores[i].value = "";
  }
}

/**
* Exibe as máquinas na página ao iniciar
* @param {String} Nome da Máquina
* @returns {String} Exibe o nome da máquina
* @author Ítalo Fideles , Nikolas Victor
*/

function adicionaMaquina(maquina){
      let string = "",
          botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
          botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
          tabelaMaquinas = document.querySelector("#tabela");


          string += "<tr class=\"maquina\">";
          string += "<td class=\"id\">" + maquina.id + "</td>";
          string += "<td>" + maquina.nome + "</td>";
          string += "<td class=\"finalidade\">" + maquina.finalidade + "</td>";
          string += "<td>" + parseFloat(maquina.valorCompra.toFixed(2)) + "</td>";
          string += "<td>" + maquina.indiceDepreciacao + "%</td>";
          string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
          string += "<td>" + formatarStatus(maquina.status) + "</td>";
          string += "<td>" + parseFloat(maquina.calculateValorAtual().toFixed(2)) + "</td>";
          if(maquina.dataSaida == null || maquina.status === "VENDIDO" ||
            maquina.status === "DESCARTADO")
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquina.dataSaida) + "</td>";
          if(maquina.dataBaixa == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquina.dataBaixa) + "</td>";
          if(maquina.dataRetorno == null || maquina.status === "VENDIDO" ||
            maquina.status === "DESCARTADO")
            string += "<td>N/A</td>";
          else
            string +=   "<td>" + formatarDataObj(maquina.dataRetorno) + "</td>";

          string += "<td>" + botaoSaida + botaoEditar + "</td></tr>";
          tabelaMaquinas.innerHTML += string;
          string = "";

      let chamaSaida = document.querySelectorAll(".botaoSaida");
      for (var i = 0; i < chamaSaida.length; i++) {
        chamaSaida[i].addEventListener("click", saida);
      }

      let edita = document.querySelectorAll(".botaoEditar");
      for (var i = 0; i < edita.length; i++) {
        edita[i].addEventListener("click", mostraModalEditar);
      }
      visaoBotao();
}

/**
* Exibe as máquinas na página ao iniciar
* @param {String} Vetor com o nome das máquinas
* @returns {String} Exibição das máquinas na página
* @author Ítalo Fideles , Nikolas Victor
*/

function adicionaTodasMaquinas(maquinasVetor){
      let string = "",
          botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
          botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
          tabelaMaquinas = document.querySelector("#tabela");


      for(i = 0; i < maquinasVetor.length; i++){
          string += "<tr class=\"maquina\">";
          string += "<td class=\"id\">" + maquinasVetor[i].id + "</td>";
          string += "<td>" + maquinasVetor[i].nome + "</td>";
          string += "<td class=\"finalidade\">"+ maquinasVetor[i].finalidade + "</td>";
          string += "<td>" + parseFloat(maquinasVetor[i].valorCompra.toFixed(2)) + "</td>";
          string += "<td>" + maquinasVetor[i].indiceDepreciacao + "%</td>";
          string += "<td>" + formatarDataObj(maquinasVetor[i].dataCompra) + "</td>";
          string += "<td>" + formatarStatus(maquinasVetor[i].status) + "</td>";
          string += "<td>" + parseFloat(maquinasVetor[i].calculateValorAtual().toFixed(2)) + "</td>";
          if(maquinasVetor[i].dataSaida == null || maquinasVetor[i].status === "VENDIDO" ||
            maquinasVetor[i].status === "DESCARTADO")
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquinasVetor[i].dataSaida) + "</td>";
          if(maquinasVetor[i].dataBaixa == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquinasVetor[i].dataBaixa) + "</td>";
          if(maquinasVetor[i].dataRetorno == null ||
             maquinasVetor[i].status === "VENDIDO" ||
             maquinasVetor[i].status === "DESCARTADO")
            string += "<td>N/A</td>";
          else
            string +=   "<td>" + formatarDataObj(maquinasVetor[i].dataRetorno) + "</td>";

          string += "<td>" + botaoSaida + botaoEditar + "</td></tr>";
          tabelaMaquinas.innerHTML += string;
          string = "";
      }
      let chamaSaida = document.querySelectorAll(".botaoSaida");
      for (var i = 0; i < chamaSaida.length; i++) {
        chamaSaida[i].addEventListener("click", saida);
      }
      let edita = document.querySelectorAll(".botaoEditar");
      for (var i = 0; i < edita.length; i++) {
        edita[i].addEventListener("click", mostraModalEditar);
      }
      visaoBotao();
}

/**
* Edita a máquina selecionada
* @param {String} Nome da máquina
* @returns {String} Novo status da máquina
* @author Ítalo Fideles , Nikolas Victor
*/

function editaMaquina(maquina){
  let arrLinhaMaquina = document.querySelectorAll(".maquina"),
      string = "",
      botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
      botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>";
  for (linhaMaquina of arrLinhaMaquina) {
    let node = linhaMaquina.children;

    if(node[0].innerHTML == maquina.id){
        string += "<tr class=\"maquina\">";
        string += "<td class=\"id\">" + maquina.id + "</td>";
        string += "<td>" + maquina.nome + "</td>";
        string += "<td class=\"finalidade\">" + maquina.finalidade + "</td>";
        string += "<td>" + parseFloat(maquina.valorCompra.toFixed(2)) + "</td>";
        string += "<td>" + maquina.indiceDepreciacao + "%</td>";
        string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
        string += "<td>" + formatarStatus(maquina.status) + "</td>";
        string += "<td>" + parseFloat(maquina.calculateValorAtual().toFixed(2)) + "</td>";
        if(maquina.dataSaida == null || maquina.status === "VENDIDO" ||
          maquina.status === "DESCARTADO")
          string += "<td>N/A</td>";
        else
          string += "<td>" + formatarDataObj(maquina.dataSaida) + "</td>";
        if(maquina.dataBaixa == null)
          string += "<td>N/A</td>";
        else
          string += "<td>" + formatarDataObj(maquina.dataBaixa) + "</td>";
        if(maquina.dataRetorno == null || maquina.status === "VENDIDO" ||
           maquina.status === "DESCARTADO")
          string += "<td>N/A</td>";
        else
          string +=   "<td>" + formatarDataObj(maquina.dataRetorno) + "</td>";

        string += "<td>" + botaoSaida + botaoEditar + "</td></tr>";
        linhaMaquina.innerHTML = string;
        string = "";
    }
  }
  let chamaSaida = document.querySelectorAll(".botaoSaida");
  for (var i = 0; i < chamaSaida.length; i++) {
    chamaSaida[i].addEventListener("click", saida);
  }

  let edita = document.querySelectorAll(".botaoEditar");
  for (var i = 0; i < edita.length; i++) {
    edita[i].addEventListener("click", mostraModalEditar);
  }
  visaoBotao();
}

/**
* Cadastra os novos valores no banco de dados
* @author Ítalo Fideles , Nikolas Victor
*/

function enviaInformacoesCadastro(){
  if(validacao(inputs) == true){
    let nome = document.querySelector("input[name='nome']").value,
        finalidade = document.querySelector("input[name='finalidade']").value,
        valor =  document.querySelector("input[name='valor']").value,
        dataAs = document.querySelector("input[name='data']").valueAsDate,
        data = document.querySelector("input[name='data']").value,
        depreciacao = document.querySelector("input[name='depreciação']").value;

    cadastrar(nome, finalidade, depreciacao, valor, data, 1);
    document.querySelector(".maquinas").style.display = "inline-block";
    document.querySelector(".opcoes").style.display = "block";
    document.querySelector(".valores_fundo").style.display = "none";

    var valores = document.querySelectorAll(".inputs");
    for (var i = 0; i < valores.length; i++) {
      valores[i].value = "";
    }
    document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
  }
}

receberTodos();

var botaoCadastro = document.querySelector("button[name='botaoCadastro']"),
    botaoVoltar = document.querySelector("button[name='botaoVoltar']"),
    botaoConfirmarCadastro = document.querySelector("button[name='botaoAcao']"),
    botaoConfirmarEditar = document.querySelector("button[name='botaoEditarMaquina']"),
    botaoRelatorio = document.querySelector("button[name='botaoRelatorio']"),
    filtro = document.querySelector("#filtro_select_status"),
    inputs = document.querySelectorAll(".inputs"),
    inputs_editar = document.querySelectorAll(".inputs-editar");
    botaoConfirmarEditar.addEventListener("click", enviaInformacoesEditar);
    botaoCadastro.addEventListener("click", mostraModalCadastro);
    botaoVoltar.addEventListener("click", voltar);
    botaoConfirmarCadastro.addEventListener("click", enviaInformacoesCadastro);
    botaoRelatorio.addEventListener("click", relatorio);
    filtro.addEventListener("change", filtraPagina);
    for (input of inputs) {
      input.addEventListener("input",function(){
        validacao(inputs);
      });
    }
    for (input of inputs_editar) {
      input.addEventListener("input",function(){
        validacaoEditar(inputs_editar);
      });
    }


limitaDataRetorno();
limitaDataSaida();
limitaDataCompra();
limitaValorCompra_ValorVenda();
estilizarModal();
limiteDepreciacao();
