
function formatarData(data){
  data = data.split("-");
  data = data[2] + "/" + data[1] + "/" + data[0];
  data = data.substr(1);
  return data;
}

function formatarDataObj(data){
  if(data != null){
    data = data.toISOString().split('T')[0];
    return data;
  }
}

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
function validacao(){
  //variaveis
  let inputs = document.querySelectorAll(".inputs"),
      valor = 0;

  for (let input of inputs){
    //se algum input estiver vazio retorna "false"e deixa o botão para cadastrar desabilitado
    if(input.value == ""){
      document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
      return false;
    }
  }
  //se todos os input estiverem preenchidos retorna "true"e deixa o botão para cadastrar habilitado
    document.querySelector("button[name='botaoAcao']").classList.remove("botaoDesab");
    return true;
}

function limiteDepreciacao(){
  document.querySelector("input[name='depreciação']").oninput = function () {
      if (this.value > 100) {
          this.value = 100;
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
  validacao();
    let inputs = document.querySelectorAll(".inputs");
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
      elemento = event.target;

  //Pega o estado atual da maquinas, ex: Em posse
  elemento = elemento.parentNode;
  nodes = elemento.parentNode.children;

  document.querySelector("#editar").style.display = "none";
  /*Verifica se o estado é "Em posse", se for ativa a div modal e permite a
    escolha do que ira ser feito, ex:Vender, Alugar, etc..*/
  if (nodes[6].innerHTML == "EM_POSSE") {
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
  let botões = document.querySelectorAll(".botaoSaida");
  let botões2 = document.querySelectorAll(".botaoEditar");
  for (var i = 0; i < botões.length; i++) {
    var pesquisa = botões[i].parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    if(nodes[6].innerHTML != "EM_POSSE"){
      botões[i].className = "botaoDesab";
    }
    else {
      botões[i].className = "botaoSaida";
    }
  }
  for (botao of botões2) {
    var pesquisa = botao.parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    if(nodes[6].innerHTML != "EM_POSSE"){
      botao.className = "botaoDesab";
    }
    else {
      botao.className = "botaoEditar";
    }
  }
}

/*Chama a aba para editar maquinas Em posse*/
// Estilização
function mostraModalEditar(){
  elemento = event.target;
  elemento = elemento.parentElement;
  nodes = elemento.parentNode.children;
  if(nodes[6].innerHTML == "EM_POSSE"){
    document.querySelector("#editar").style.display = "block";
  }
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

      editarBE(id,nome, finalidade, depreciacao, valor,formatarData(data))

      document.querySelector("#editar").style.display = "none";
}

/*Relatorio da pagina*/
// Estilização
function relatorio(){
  maquinas = document.querySelectorAll(".maquina");
  limpa_relatorio()
  for (var i = 0; i < maquinas.length; i++) {
    elementos = maquinas[i].children;
    let string = "<ul><li>" +
                  "<p>#"+ elementos[0].innerHTML +
                  " - " + elementos[1].innerHTML + "</p>" +
                  "<p>Finalidade: " + elementos[2].innerHTML + "</p>" +
                  "<p>Valor de compra: " + elementos[3].innerHTML + "</p>" +
                  "<p>Depreciação: " + elementos[4].innerHTML + "</p>" +
                  "<p>Data de compra: " + elementos[5].innerHTML + "</p>" +
                  "<p>Status: " + elementos[6].innerHTML + "</p>" +
                  "<p>Valor atual: " + elementos[7].innerHTML + "</p>" +
                  "<p>Data de saida: " + elementos[8].innerHTML + "</p>" +
                  "<p>Data de baixa: " + elementos[9].innerHTML + "</p>" +
                  "<p>-----------------------------------------------------</p>" +
                  "</li></ul>";
    if(elementos[6].innerHTML == "EM_POSSE"){
      section = document.querySelector("#maquinasPosse");
      section.innerHTML += string;
    }
    if(elementos[6].innerHTML == "VENDIDO"){
      section = document.querySelector("#maquinasVendidas");
      section.innerHTML += string;
    }
    if(elementos[6].innerHTML == "ALUGADO"){
      section = document.querySelector("#maquinasAlugadas");
      section.innerHTML += string;
    }
    if(elementos[6].innerHTML == "EM_MANUTENCAO"){
      section = document.querySelector("#maquinasManutencao");
      section.innerHTML += string;
    }
    if(elementos[6].innerHTML == "DESCARTADO"){
      section = document.querySelector("#maquinasDescartadas");
      section.innerHTML += string;
    }
    document.querySelector(".relatorioModal").style.display = "block";
  }
}

//limpa o relatorio para não duplicação de maquinas no mesmo
// Estilização
function limpa_relatorio() {
    section = document.querySelector("#maquinasPosse");
    section.innerHTML = "<h2>Maquinas em posse</h2>";
    section = document.querySelector("#maquinasVendidas");
    section.innerHTML = "<h2>Maquinas vendidas</h2>";
    section = document.querySelector("#maquinasAlugadas");
    section.innerHTML = "<h2>Maquinas alugadas</h2>";
    section = document.querySelector("#maquinasManutencao");
    section.innerHTML = "<h2>Maquinas em manutenção</h2>";
    section = document.querySelector("#maquinasDescartadas");
    section.innerHTML = "<h2>Maquinas descartadas</h2>";
}

//função que altera o status da maquina
function AlteraStatus(elemento,opcao){
    //Pega os "filhos" da variavel elemento
    elemento = elemento.parentElement;
    nodes = elemento.children;
    let valorAluguel = document.querySelector("input[name='valorAluguel']").value,
        periodo = document.querySelector("input[name='periodo']").value;

    //transporta os valores dos filhos de "elemento" para um vetor

    /*Imprime os valores do vetor mais a condição que se encontra a maquinas
      de acordo com o valor da variavel opcao*/
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
/*Permite a chamada da função saida ao clicar no "botaoSaida"*/

  /*Zera os valores dos inputs da data requisitada*/
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

          console.log(maquina);

          string += "<tr class=\"maquina\">";
          string += "<td class=\"id\">" + maquina.id + "</td>";
          string += "<td>" + maquina.nome + "</td>";
          string += "<td class=\"finalidade\">" + maquina.finalidade + "</td>";
          string += "<td>" + maquina.valorCompra + "</td>";
          string += "<td>" + maquina.indiceDepreciacao + "</td>";
          string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
          string += "<td>" + maquina.status + "</td>";
          string += "<td>" + maquina.calculateValorAtual() + "</td>";
          if(maquina.dataSaida == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquina.dataSaida) + "</td>";
          if(maquina.dataBaixa == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquina.dataBaixa) + "</td>";
          if(maquina.dataRetorno == null)
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

function adicionaTodasMaquinas(maquinasVetor){
      let string = "",
          botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
          botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
          tabelaMaquinas = document.querySelector("#tabela");


      for(i = 0; i < maquinasVetor.length; i++){
          string += "<tr class=\"maquina\">";
          string += "<td class=\"id\">" + maquinasVetor[i].id + "</td>";
          string += "<td>" + maquinasVetor[i].nome + "</td>";
          string += "<td class=\"finalidade\">" + maquinasVetor[i].finalidade + "</td>";
          string += "<td>" + maquinasVetor[i].valorCompra + "</td>";
          string += "<td>" + maquinasVetor[i].indiceDepreciacao + "</td>";
          string += "<td>" + formatarDataObj(maquinasVetor[i].dataCompra) + "</td>";
          string += "<td>" + maquinasVetor[i].status + "</td>";
          string += "<td>" + maquinasVetor[i].calculateValorAtual() + "</td>";
          if(maquinasVetor[i].dataSaida == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquinasVetor[i].dataSaida) + "</td>";
          if(maquinasVetor[i].dataBaixa == null)
            string += "<td>N/A</td>";
          else
            string += "<td>" + formatarDataObj(maquinasVetor[i].dataBaixa) + "</td>";
          if(maquinasVetor[i].dataRetorno == null)
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

function editaMaquina(maquina){
  let arrLinhaMaquina = document.querySelectorAll(".maquina"),
      string = "",
      botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
      botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>";
  for (linhaMaquina of arrLinhaMaquina) {
    let node = linhaMaquina.children;
    console.log(maquina);

    if(node[0].innerHTML == maquina.id){
        string += "<tr class=\"maquina\">";
        string += "<td class=\"id\">" + maquina.id + "</td>";
        string += "<td>" + maquina.nome + "</td>";
        string += "<td class=\"finalidade\">" + maquina.finalidade + "</td>";
        string += "<td>" + maquina.valorCompra + "</td>";
        string += "<td>" + maquina.indiceDepreciacao + "</td>";
        string += "<td>" + formatarDataObj(maquina.dataCompra) + "</td>";
        string += "<td>" + maquina.status + "</td>";
        string += "<td>" + maquina.calculateValorAtual() + "</td>";
        if(maquina.dataSaida == null)
          string += "<td>N/A</td>";
        else
          string += "<td>" + formatarDataObj(maquina.dataSaida) + "</td>";
        if(maquina.dataBaixa == null)
          string += "<td>N/A</td>";
        else
          string += "<td>" + formatarDataObj(maquina.dataBaixa) + "</td>";
        if(maquina.dataRetorno == null)
          string += "<td>N/A</td>";
        else
          string +=   "<td>" + formatarDataObj(maquina.dataRetorno) + "</td>";

        string += "<td>" + botaoSaida + botaoEditar + "</td></tr>";
        linhaMaquina.innerHTML = string;
        string = "";
    }
  }
}

//função que cadastra valores na tabela sem a utilização do BD
function enviaInformacoesCadastro(){
  if(validacao() == true){
    //variaveis
    let nome = document.querySelector("input[name='nome']").value,
        finalidade = document.querySelector("input[name='finalidade']").value,
        valor =  document.querySelector("input[name='valor']").value,
        dataAs = document.querySelector("input[name='data']").valueAsDate,
        data = document.querySelector("input[name='data']").value,
        depreciacao = document.querySelector("input[name='depreciação']").value;

    cadastrar(nome, finalidade, "EM_POSSE", depreciacao, valor, formatarData(data), 1);
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

receberTodos();

// Variáveis
var botaoCadastro = document.querySelector("button[name='botaoCadastro']"),
    botaoVoltar = document.querySelector("button[name='botaoVoltar']"),
    botaoConfirmarCadastro = document.querySelector("button[name='botaoAcao']"),
    botaoConfirmarEditar = document.querySelector("button[name='botaoEditarMaquina']"),
    botaoRelatorio = document.querySelector("button[name='botaoRelatorio']"),
    filtro = document.querySelector("#filtro_select_status");

//Adiciona as funções aos botões
botaoConfirmarEditar.addEventListener("click", enviaInformacoesEditar);
botaoCadastro.addEventListener("click", mostraModalCadastro);
botaoVoltar.addEventListener("click", voltar);
botaoConfirmarCadastro.addEventListener("click", enviaInformacoesCadastro);
botaoRelatorio.addEventListener("click", relatorio);
filtro.addEventListener("change", filtraPagina);


visaoBotao();
estilizarModal();
limiteDepreciacao();
