var botaoCadastro = document.querySelector("button[name='botaoCadastro']"),
    botaoVoltar = document.querySelector("button[name='botaoVoltar']"),
    botaoAcao = document.querySelector("button[name='botaoAcao']");

//checa se todos os inputs etão preenchidso e valida o cadastro
function validacao(){
  //variaveis
  let inputs = document.querySelectorAll(".inputs"),
      valor = 0;

  for (let input of inputs){
    console.log(input.value)
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

//fecha a div modal que pergunta os valores a serem cadastrados
function Voltar(){
  document.querySelector(".maquinas").style.display = "inline-block";
  document.querySelector(".valores_fundo").style.display = "none";
  let inputs = document.querySelectorAll(".inputs");
  for (input of inputs) {
    input.value = "";
  }
}

//Abre uma div modal que permite a inserção de dados a srem cadastrados
function Cadastrar(){
  validacao();
    let inputs = document.querySelectorAll(".inputs");
    for (input of inputs) {
      input.value = "";
    }
    document.querySelector(".valores_fundo").style.display = "block";

}

//função que cadastra valores na tabela sem a utilização do BD
function cadastroSemBD(){
  if(validacao() == true){
    //variaveis
    let nome = document.querySelector("input[name='nome']").value,
        finalidade = document.querySelector("input[name='finalidade']").value,
        valor =  document.querySelector("input[name='valor']").value,
        data = document.querySelector("input[name='data']").value,
        depreciação = document.querySelector("input[name='depreciação']").value,
        botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
        maquinas = document.querySelector("#tabela");
    let vetor = [nome,finalidade,valor,depreciação,data];
    let string = "";

    /*insere os valores adquiridos na div modal em uma string e depois insere
      essa string na tabela*/
    string += "<td class=\"id\">2</td>";
    for (var i = 0; i < vetor.length; i++) {
      string += "<td>" + vetor[i] + "</td>";
    }
      maquinas.innerHTML += string +
      "<td class=\"status\">EM POSSE</td>" +
      "<td>Máquina</td>" +
      "<td>NAN</td>" +
      "<td>NAN</td>" +
      "<td>NAN</td>" +
      "<td>" + botaoSaida + "</td>";

    //Fecha a div modal e mostra a tabela junto com o botão que permite cadastrar
    document.querySelector(".maquinas").style.display = "inline-block";
    document.querySelector(".opcoes").style.display = "block";
    document.querySelector(".valores_fundo").style.display = "none";

    //zera os valores dos inputs da div modal
    var valores = document.querySelectorAll(".inputs");
    for (var i = 0; i < valores.length; i++) {
      valores[i].value = "";
    }

    //permite a chamada da função "saida" ao botão "botaoSaida" ser presionado
    var botões = document.querySelectorAll(".botaoSaida");
    for (var i = 0; i < botões.length; i++) {
      botões[i].addEventListener("click", saida);
    }
    document.querySelector("button[name='botaoAcao']").classList.add("botaoDesab");
  }
}

//Passa a informação se a maquina sera ALugada,Vendida,Etc...
function saida(){
  //Variaveis
  let opcao = document.querySelector("#filtro_saida"),
      elemento = event.target;

  //Pega o estado atual da maquinas, ex: EM POSSE
  elemento = elemento.parentNode;
  nodes = elemento.parentNode.children;
  console.log(elemento.parentNode);
  console.log(nodes[6].innerHTML);

  /*Verifica se o estado é "EM POSSE", se for ativa a div modal e permite a
    escolha do que ira ser feito, ex:Vender, Alugar, etc..*/
  if (nodes[6].innerHTML == "EM POSSE") {
    document.querySelector("#saidas").style.display = "block";

      if(elemento.className != "botaoDesab"){
        document.querySelector("#filtro_saida").addEventListener("change",
        function(elemento){
          if(opcao.value == "Alugar"){
            document.querySelector("#retorno").style.display = "block";
            document.querySelector("#venda").style.display = "none";
            document.querySelector("#envio").style.display = "none";
            document.querySelector("#descarte").style.display = "none";
          }
          else if(opcao.value == "Vender"){
            document.querySelector("#retorno").style.display = "none";
            document.querySelector("#venda").style.display = "block";
            document.querySelector("#envio").style.display = "none";
            document.querySelector("#descarte").style.display = "none";
          }
          else if(opcao.value == "Enviar para conserto"){
            document.querySelector("#retorno").style.display = "none";
            document.querySelector("#venda").style.display = "none";
            document.querySelector("#envio").style.display = "block";
            document.querySelector("#descarte").style.display = "none";
          }
          else if(opcao.value == "Descartar"){
            document.querySelector("#retorno").style.display = "none";
            document.querySelector("#venda").style.display = "none";
            document.querySelector("#envio").style.display = "none";
            document.querySelector("#descarte").style.display = "block";
          }
        });
    }
    /*Chama a função que altera o status da maquina com os parametros sendo,
      elemento = a linha da tabela obtida pelo parent node
      opcao = o que sera feito, ex: Vender, Descartar, etc...
      */
    let botão = document.querySelectorAll(".botaoEnviar");
    for (var i = 0; i < botão.length; i++) {
      botão[i].addEventListener("click", function(){
        AlteraStatus(elemento,opcao);
        document.querySelector("#saidas").style.display = "none";
      });
      }
    }

  }

/*Função que adiciona ou remove a classe botaoDesab de acordo com o estado da
  maquina*/
function visaoBotao() {
  let botões = document.querySelectorAll(".botaoSaida");
  for (var i = 0; i < botões.length; i++) {
    var pesquisa = botões[i].parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    if(nodes[6].innerHTML != "EM POSSE"){
      botões[i].className = "botaoDesab";
    }
    else {
      botões[i].className = "botaoSaida";
    }
  }
}

//função que altera o status da maquina
function AlteraStatus(elemento,opcao){
    //Pega os "filhos" da variavel elemento
    console.log(elemento);
    elemento = elemento.parentElement;
    console.log(elemento);
    nodes = elemento.children;

    //transporta os valores dos filhos de "elemento" para um vetor
    let vetor = [];
    for (var i = 0; i < nodes.length; i++) {
       vetor.push(nodes[i].innerHTML);
    }

    /*Imprime os valores do vetor mais a condição que se encontra a maquinas
      de acordo com o valor da variavel opcao*/
    elemento.innerHTML = "<tr class=\"maquina\">";
    for (var i = 0; i < vetor.length; i++) {
      if(i == 6){
        if(opcao.value == "Alugar"){
          elemento.innerHTML += "<td>ALUGADO</td>";
        }
        else if(opcao.value == "Vender"){
          elemento.innerHTML += "<td>VENDIDO</td>";
        }
        else if(opcao.value == "Enviar para conserto"){
          elemento.innerHTML += "<td>EM CONSERTO</td>";
        }
        else if(opcao.value == "Descartar"){
          elemento.innerHTML += "<td>DESCARTADO</td>";
        }
      }
      else {
        elemento.innerHTML += "<td>" + vetor[i] + "</td>";
      }
    }
    elemento.innerHTML += "</tr>";

//Permite a chamada da função saida ao clicar no "botaoSaida"
  botoes = document.querySelectorAll(".botaoSaida");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", saida);
  }

/*Chama a função "visaoBotao" que altera a classe do "botaoSaida" de acordo
  com o estado da maquina, se for EM POSSE não se altera, ao contrario,
  adiciona a classe botaoDesab*/
  visaoBotao();

  //Zera os valores dos inputs da data requisitada
  let valores = document.querySelectorAll("input[name='data']");
  for (var i = 0; i < valores.length; i++) {
    valores[i].value = "";
  }
}


//parte que mexe com a abertura e fechamento das divs modais
botaoVoltar.addEventListener("click", function(){
  document.querySelector(".valores_fundo").style.display = "none";
})
document.querySelector(".fecharModal").addEventListener("click", function(){
  document.querySelector("#saidas").style.display = "none";
})
window.addEventListener("click", function(event){
    if (event.target == document.querySelector(".valores_fundo") ||
        event.target == document.querySelector("#saidas")) {
        document.querySelector(".valores_fundo").style.display = "none";
        document.querySelector("#saidas").style.display = "none";
    }
})
//fim





//Chamada das funções

botaoCadastro.addEventListener("click", Cadastrar);
botaoVoltar.addEventListener("click", Voltar);
botaoAcao.addEventListener("click", cadastroSemBD);

let inputs = document.querySelectorAll(".inputs");
for (let input of inputs){
  input.addEventListener("change", validacao);
}

let chamaSaida = document.querySelectorAll(".botaoSaida");
for (var i = 0; i < chamaSaida.length; i++) {
  chamaSaida[i].addEventListener("click", saida);
}
window.onload = visaoBotao;
