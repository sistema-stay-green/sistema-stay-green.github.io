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

function formatarData(data){
  data = data.split("-");
  data = data[2] + "/" + data[1] + "/" + data[0];
  return data;
}

function formatarDataObj(data){
  if(data != null){
    data = data.toISOString().split('T')[0];
    data = data.split("-");
    data = data[2] + "/" + data[1] + "/" + data[0];
    return data;
  }
}

//define a abertura/fechamento das modais
//estilização
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

//checa se todos os inputs etão preenchidso e valida o cadastro
// Estilização
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

    //se algum input estiver vazio retorna "false"e deixa o botão para cadastrar desabilitado

    if(valores[i].value == ""){
      document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
      return false;
    }
  }
  //se todos os input estiverem preenchidos retorna "true"e deixa o botão para cadastrar habilitado
    document.querySelector("button[name='botaoAcao']").classList.remove("botaoDesab");
    return true;
}

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

    //se algum input estiver vazio retorna "false"e deixa o botão para cadastrar desabilitado

    if(valores[i].value == ""){
      document.querySelector("button[name='botaoEditarMaquina']").classList.add("botaoDesab");
      return false;
    }
  }
  //se todos os input estiverem preenchidos retorna "true"e deixa o botão para cadastrar habilitado
    document.querySelector("button[name='botaoEditarMaquina']").classList.remove("botaoDesab");
    return true;
}

//limita a data de compra para no maximo o dia atual
//estilização
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

//limita o valor de compra e de venda para no minimo 1
//estilização
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

//limitaa data de retorno para no minimo depois do dia atual
//estilização
function limitaDataRetornoSaida(){

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

//limita o indice de depreciação para 90
//estilização
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

//fecha a div modal que pergunta os valores a serem cadastrados
// Estilização
function voltar(){
  document.querySelector(".maquinas").style.display = "inline-block";
  document.querySelector(".valores_fundo").style.display = "none";
  let inputs = document.querySelectorAll(".inputs");
  for (input of inputs) {
    input.value = "";
  }
}

//Abre uma div modal que permite a inserção de dados a srem cadastrados
// Estilização
function mostraModalCadastro(){

    for (input of inputs) {
      input.value = "";
    }
    document.querySelector(".valores_fundo").style.display = "block";

}

//filtra a exibição das maquinas
// Estilização
function filtraPagina(){
  let filtro = document.querySelector("#filtro_select_status"),
      maquinas = document.querySelectorAll(".maquina");
  for (row of maquinas) {
    if (filtro.value == "Em Posse") {
      let node = row.children;

      if (node[6].innerHTML == "EM_POSSE") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Em Manutenção") {
      let node = row.children;
      if (node[6].innerHTML == "EM_MANUTENCAO") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Alugados") {
      let node = row.children;
      if (node[6].innerHTML == "ALUGADO") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    else if (filtro.value == "Vendidos") {
      let node = row.children;
      if (node[6].innerHTML == "VENDIDO") {
        row.style.display = "table-row";
      }
      else {
        row.style.display = "none";
      }
    }
    if (filtro.value == "Descartados") {
      let node = row.children;
      if (node[6].innerHTML == "DESCARTADO") {
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

//Passa a informação se a maquina sera ALugada,Vendida,Etc...
// Estilização
function saida(){
  //Variaveis
  let opcao = document.querySelector("#filtro_saida"),
      elemento = event.target,
      nodes;
      status;

  //Pega o estado atual da maquinas, ex: Em posse
  elemento = elemento.parentNode;
  nodes = elemento.parentNode.children,
  status = nodes[6].innerHTML;



  document.querySelector("#editar").style.display = "none";
  /*Verifica se o estado é "Em posse", se for ativa a div modal e permite a
    escolha do que ira ser feito, ex:Vender, Alugar, etc..*/
  if (status === "Em posse" || status === "Em manutenção") {
    document.querySelector("#saidas").style.display = "block";

      if(elemento.className != "botaoDesab"){
        document.querySelector("#filtro_saida").addEventListener("change",
        function(elemento){
          if(opcao.value == "Alugar"){
            document.querySelector("label[name='valor-label']").style.display = "block";
            document.querySelector("label[name='periodo-label']").style.display = "block";
          }
          if(opcao.value == "Descartar"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "block";
          }
          if(opcao.value == "Vender"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "block";
          }
          if(opcao.value == "Enviar para conserto"){
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='periodo-label']").style.display = "block";
          }
        });
    }
    /*Chama a função que altera o status da maquina com os parametros sendo,
      elemento = a linha da tabela obtida pelo parent node
      opcao = o que sera feito, ex: Vender, Descartar, etc...
      */
    let botão = document.querySelector("button[name='botaoEnviar']");
      botão.addEventListener("click", function(){
        AlteraStatus(elemento,opcao);
        document.querySelector("#saidas").style.display = "none";
      });
    }

  }

/*Função que adiciona ou remove a classe botaoDesab de acordo com o estado da
  maquina*/
// Estilização
function visaoBotao() {
  let botoesSaida = document.querySelectorAll(".botaoSaida");
  let botoesEditar = document.querySelectorAll(".botaoEditar");

  console.log(botoesSaida[0]);
  console.log(botoesSaida[0].parentNode.parentNode.children[6]);

  // Desabilita botão saída caso o status seja Vendido, Descartado ou Alugado
  for (botao of botoesSaida) {
    var pesquisa = botao.parentNode.parentNode;
    var nodes = pesquisa.children;
    status = nodes[6].innerHTML;

    if(status === "Vendido" || status === "Descartado" || status === "Alugado"){
      console.log("Máquina de ID: "+nodes[0].innerHTML);
      botao.classList.remove("botaoSaida");
      botao.classList.add("botaoDesab");
    }
    else {
      botoesSaida.className = "botaoSaida";
    }
  }


  // Desabilita botão editar caso o status seja Vendido, Descartado
  for (botao of botoesEditar) {
    var pesquisa = botao.parentNode.parentNode;
    var nodes = pesquisa.children;
    status = nodes[6].innerHTML;

    if(status === "Vendido" || status === "Descartado"){
      console.log("Máquina de ID: "+nodes[0].innerHTML);
      botao.classList.remove("botaoEditae");
      botao.classList.add("botaoDesab");
    }
    else {
      botoesEditar.className = "botaoEditar";
    }
  }
}

/*Chama a aba para editar maquinas Em posse*/
// Estilização
function mostraModalEditar(){
  elemento = event.target;
  elemento = elemento.parentElement;
  nodes = elemento.parentNode.children;
  status = nodes[6].innerHTML;
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

/*Relatorio da pagina*/
// Estilização
function relatorio(){
  let maquinas = document.querySelectorAll(".maquina"),
      totalMaquinas = maquinas.length,
      maquinasPosse = 0,
      maquinasAlugadas = 0,
      maquinasDescartadas = 0,
      maquinasVendidas = 0,
      maquinasManutencao = 0,
      valorTotalMaquina = 0,
      string = "";

  for (var i = 0; i < maquinas.length; i++) {
    elementos = maquinas[i].children;
    if(elementos[6].innerHTML == "Em posse"){
      maquinasPosse++;
      valorTotalMaquina += elementos[7].innerHTML;
    }
    if(elementos[6].innerHTML == "Vendido"){
      maquinasVendidas++;
    }
    if(elementos[6].innerHTML == "Alugado"){
      maquinasAlugadas++;
      valorTotalMaquina += elementos[7].innerHTML;
    }
    if(elementos[6].innerHTML == "Em manutenção"){
      maquinasManutencao++;
      valorTotalMaquina += elementos[7].innerHTML;
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
      "<li>Valor total - R$" + parseFloat(totalMaquinas.toFixed(2)) + "</li></ul>";

  document.querySelector(".relatorioModal").style.display = "block";
}

/*Pega valores do modal e manda para Backend*/
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

//função que altera o status da maquina
function AlteraStatus(elemento,opcao){
    //Pega os "filhos" da variavel elemento
    console.log(elemento);
    elemento = elemento.parentNode;
    console.log(elemento);
    nodes = elemento.children;
    let valorAluguel = document.querySelector("input[name='valorAluguel']").value,
        periodo = document.querySelector("input[name='periodo']").value;

    //transporta os valores dos filhos de "elemento" para um vetor

    //Imprime os valores do vetor mais a condição que se encontra a maquinas
    //de acordo com o valor da variavel opcao
        if(opcao.value == "Alugar"){
            alugar(nodes[0].innerHTML, periodo, valorAluguel);
        }
        if(opcao.value == "Vender"){
            vender(nodes[0].innerHTML, periodo);
        }
        if(opcao.value == "Enviar para conserto"){
            manuntenir(nodes[0].innerHTML, periodo);
        }
        if(opcao.value == "Descartar"){
            descartar(nodes[0].innerHTML, periodo);
        }
  //Permite a chamada da função saida ao clicar no "botaoSaida"

  //Zera os valores dos inputs da data requisitada
  let valores = document.querySelectorAll("input[name='data']");
  for (var i = 0; i < valores.length; i++) {
    valores[i].value = "";
  }
}

//carrega as maquinas na pagina ao iniciar
function adicionaMaquina(maquina){
      let string = "",
          botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
          botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
          tabelaMaquinas = document.querySelector("#tabela");


          string += "<tr class=\"maquina\">";
          string += "<td class=\"id\">" + maquina.id + "</td>";
          string += "<td>" + maquina.nome + "</td>";
          string += "<td class=\"finalidade\">" + maquina.finalidade + "</td>";
          string += "<td> R$" + parseFloat(maquina.valorCompra.toFixed(2)) + "</td>";
          string += "<td>" + maquina.indiceDepreciacao + "%</td>";
          string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
          string += "<td>" + formatarStatus(maquina.status) + "</td>";
          string += "<td> R$" + parseFloat(maquina.calculateValorAtual().toFixed(2)) + "</td>";
          if(maquina.dataSaida == null)
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

//carrega todas as maquinas na pagina ao iniciar
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
          string += "<td> R$ " + parseFloat(maquinasVetor[i].valorCompra.toFixed(2)) + "</td>";
          string += "<td>" + maquinasVetor[i].indiceDepreciacao + "%</td>";
          string += "<td>" + formatarDataObj(maquinasVetor[i].dataCompra) + "</td>";
          string += "<td>" + formatarStatus(maquinasVetor[i].status) + "</td>";
          string += "<td> R$" + parseFloat(maquinasVetor[i].calculateValorAtual().toFixed(2)) + "</td>";
          if(maquinasVetor[i].dataSaida == null)
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

//edita a maquina selecionada
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
        string += "<td> R$" + parseFloat(maquina.valorCompra.toFixed(2)) + "</td>";
        string += "<td>" + maquina.indiceDepreciacao + "%</td>";
        string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
        string += "<td>" + formatarStatus(maquina.status) + "</td>";
        string += "<td> R$" + parseFloat(maquina.calculateValorAtual().toFixed(2)) + "</td>";
        if(maquina.dataSaida == null)
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

//função que cadastra valores no BD
function enviaInformacoesCadastro(){
  if(validacao(inputs) == true){
    //variaveis
    let nome = document.querySelector("input[name='nome']").value,
        finalidade = document.querySelector("input[name='finalidade']").value,
        valor =  document.querySelector("input[name='valor']").value,
        dataAs = document.querySelector("input[name='data']").valueAsDate,
        data = document.querySelector("input[name='data']").value,
        depreciacao = document.querySelector("input[name='depreciação']").value;

    cadastrar(nome, finalidade, depreciacao, valor, data, 1);
    //Fecha a div modal e mostra a tabela junto com o botão que permite cadastrar
    document.querySelector(".maquinas").style.display = "inline-block";
    document.querySelector(".opcoes").style.display = "block";
    document.querySelector(".valores_fundo").style.display = "none";

    //zera os valores dos inputs da div modal
    var valores = document.querySelectorAll(".inputs");
    for (var i = 0; i < valores.length; i++) {
      valores[i].value = "";
    }
    document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
  }
}

//rcarrega todas as maquinas na pagina
receberTodos();

// Variáveis
var botaoCadastro = document.querySelector("button[name='botaoCadastro']"),
    botaoVoltar = document.querySelector("button[name='botaoVoltar']"),
    botaoConfirmarCadastro = document.querySelector("button[name='botaoAcao']"),
    botaoConfirmarEditar = document.querySelector("button[name='botaoEditarMaquina']"),
    botaoRelatorio = document.querySelector("button[name='botaoRelatorio']"),
    filtro = document.querySelector("#filtro_select_status"),
    inputs = document.querySelectorAll(".inputs"),
    inputs_editar = document.querySelectorAll(".inputs-editar");


//Adiciona as funções aos botões
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


limitaDataRetornoSaida();
limitaDataCompra();
limitaValorCompra_ValorVenda();
estilizarModal();
limiteDepreciacao();
