var botaoCadastro = document.querySelector("button[name='botaoCadastro']"),
    botaoVoltar = document.querySelector("button[name='botaoVoltar']"),
    botaoAcao = document.querySelector("button[name='botaoAcao']"),
    botaoEditarMaquina = document.querySelector("button[name='botaoEditarMaquina']");

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
function cadastrar_fe(){
  validacao();
    let inputs = document.querySelectorAll(".inputs");
    for (input of inputs) {
      input.value = "";
    }
    document.querySelector(".valores_fundo").style.display = "block";

}

//função que cadastra valores na tabela sem a utilização do BD
function cadastro(){
  if(validacao() == true){
    //variaveis
    let nome = document.querySelector("input[name='nome']").value,
        finalidade = document.querySelector("input[name='finalidade']").value,
        valor =  document.querySelector("input[name='valor']").value,
        data = document.querySelector("input[name='data']").value,
        depreciacao = document.querySelector("input[name='depreciação']").value,
        botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
        botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
        maquinas = document.querySelector("#tabela");
    let vetor = [nome,finalidade,valor,depreciacao,data];
    let string = "";

    cadastrar(nome, finalidade, "EM POSSE", depreciacao, valor,
      novaData(), 1)

    /*insere os valores adquiridos na div modal em uma string e depois insere
      essa string na tabela*/
      let maquina = encapsularCadastrar(null, nome, finalidade, "em posse",
        depreciacao, valor)
    for (var i = 0; i < maquina.length; i++) {
      if(i == 0){
        string += "<td class=\"id\">" + maquina[i] + "</td>";
      }else {
        string += "<td>" + maquina[i] + "</td>";
      }
    }
      maquinas.innerHTML += string +
      "<td>" + botaoSaida + "</td>" +
      "<td>" + botaoEditar + "</td>";

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
    let botões = document.querySelectorAll(".botaoSaida");
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
            document.querySelector("label[name='valor-label']").style.display = "block";
          }
          else{
            document.querySelector("label[name='valor-label']").style.display = "none";
            document.querySelector("label[name='valor-label']").value = "";
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
function visaoBotao() {
  let botões = document.querySelectorAll(".botaoSaida");
  let botões2 = document.querySelectorAll(".botaoEditar");
  for (var i = 0; i < botões.length; i++) {
    var pesquisa = botões[i].parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    if(nodes[6].innerHTML != "EM POSSE"){
      botões[i].className = "botaoDesab";
    }
    else {
      botões[i].className = "botaoEditar";
    }
  }
  for (botao of botões2) {
    var pesquisa = botao.parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    if(nodes[6].innerHTML != "EM POSSE"){
      botao.className = "botaoDesab";
    }
    else {
      botao.className = "botaoEditar";
    }
  }
}

/*Chama a aba para editar maquinas em posse*/
function Editar(){
  elemento = event.target;
  elemento = elemento.parentElement;
  nodes = elemento.parentNode.children;
  if(nodes[6] == "EM POSSE"){
    document.querySelector("#editar").style.display = "block";
    elemento = event.target;
    elemento = elemento.parentElement;
    nodes = elemento.parentNode.children;
    console.log(elemento.parentNode);
    let id = document.querySelector("input[name='id-editar']"),
        nome = document.querySelector("input[name='nome-editar']"),
        finalidade = document.querySelector("input[name='finalidade-editar']"),
        valor =  document.querySelector("input[name='valor-editar']"),
        data = document.querySelector("input[name='data-editar']"),
        depreciação = document.querySelector("input[name='depreciação-editar']");
    let vetor = [id,nome,finalidade,valor,depreciação,data],
        i = 0;
    for (valor of vetor) {
      valor.value = nodes[i].innerHTML;
      i++;
    }
  }
}

/*Edita a maquina selecionada*/
function EditarMaquina() {
  let id = document.querySelector("input[name='id-editar']"),
      nome = document.querySelector("input[name='nome-editar']"),
      finalidade = document.querySelector("input[name='finalidade-editar']"),
      valor =  document.querySelector("input[name='valor-editar']"),
      data = document.querySelector("input[name='data-editar']"),
      depreciação = document.querySelector("input[name='depreciação-editar']");
  let vetor = [id,nome,finalidade,valor,depreciação,data],
      maquinas = document.querySelectorAll(".maquina"),
      string = "";
      descartar(id);
      cadastrar(nome, finalidade, "EM POSSE", depreciacao, valor,
        data, 1);
      for (maquina of maquinas) {
        nodes = maquina.children;
        if(nodes[0].innerHTML == id.value){
          for (var i = 0; i < nodes.length; i++) {
            if(i < 6){
              string += "<td>" + vetor[i].value + "</td>";
            }
            else {
              string += "<td>" + nodes[i].innerHTML + "</td>";
            }
            if(i == nodes.length - 1){
              maquina.innerHTML = string;
            }
          }
        }
      }
      document.querySelector("#editar").style.display = "none";
      let edita = document.querySelectorAll(".botaoEditar");
      for (var i = 0; i < edita.length; i++) {
        edita[i].addEventListener("click", Editar)
      }
      let botoes = document.querySelectorAll(".botaoSaida");
      for (var i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", saida);
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
          let valorAluguel = document.querySelector("input[name='valorAluguel']"),
              periodo = document.querySelector("input[name='periodo']");
          alugar(vetor[0], periodo, valorAluguel);
        }
        else if(opcao.value == "Vender"){
          elemento.innerHTML += "<td>VENDIDO</td>";
          vender(vetor[0]);
        }
        else if(opcao.value == "Enviar para conserto"){
          elemento.innerHTML += "<td>EM CONSERTO</td>";
          let periodo = document.querySelector("input[name='periodo']");
          manuntenir(vetor[0], periodo);
        }
        else if(opcao.value == "Descartar"){
          elemento.innerHTML += "<td>DESCARTADO</td>";
          descartar(vetor[0]);
        }
      }
      else {
        elemento.innerHTML += "<td>" + vetor[i] + "</td>";
      }
    }
    elemento.innerHTML += "</tr>";

/*Permite a chamada da função saida ao clicar no "botaoSaida"*/
  let edita = document.querySelectorAll(".botaoEditar");
  for (var i = 0; i < edita.length; i++) {
    edita[i].addEventListener("click", Editar)
  }
  let botoes = document.querySelectorAll(".botaoSaida");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", saida);
  }

/*Chama a função "visaoBotao" que altera a classe do "botaoSaida" de acordo
  com o estado da maquina, se for EM POSSE não se altera, ao contrario,
  adiciona a classe botaoDesab*/
  visaoBotao();

  /*Zera os valores dos inputs da data requisitada*/
  let valores = document.querySelectorAll("input[name='data']");
  for (var i = 0; i < valores.length; i++) {
    valores[i].value = "";
  }
}

function CarregaElementos(){
  let carregarpagina = receberTodos(),
      string = "",
      botaoSaida = "<button type=\"button\" class=\"botaoSaida\">Saida</button>",
      botaoEditar = "<button type=\"button\" class=\"botaoEditar\">Editar</button>",
      maquinas = document.querySelector("#tabela");
  var j = 1;
  for (var i = 0; i < carregarpagina.length; i++) {
    if(i == 0){
      string += "<td class=\"id\">" + carregarpagina[i] + "</td>";
    }else {
      string += "<td>" + carregarpagina[i] + "</td>";
    }
    if(j%8 == 0){
      maquinas.innerHTML += string +
      "<td>" + botaoSaida + "</td>" +
      "<td>" + botaoEditar + "</td>";
      string = "";
    }
    j++;
  }
}


//parte que mexe com a abertura e fechamento das divs modais
botaoVoltar.addEventListener("click", function(){
  document.querySelector(".valores_fundo").style.display = "none";
})
let fecharModal = document.querySelectorAll(".fecharModal");
for (let fechar of fecharModal){
  fechar.addEventListener("click", function(){
  document.querySelector("#saidas").style.display = "none";
  document.querySelector("#editar").style.display = "none";
})
}
window.addEventListener("click", function(event){
    if (event.target == document.querySelector(".valores_fundo") ||
        event.target == document.querySelector("#saidas") ||
        event.target == document.querySelector("#editar")) {
        document.querySelector(".valores_fundo").style.display = "none";
        document.querySelector("#saidas").style.display = "none";
        document.querySelector("#editar").style.display = "none";
    }
})
//fim

//Chamada das funções
botaoEditarMaquina.addEventListener("click", EditarMaquina);
botaoCadastro.addEventListener("click", cadastrar_fe);
botaoVoltar.addEventListener("click", Voltar);
botaoAcao.addEventListener("click", function(){
  cadastro();
  });

let inputs = document.querySelectorAll(".inputs");
for (let input of inputs){
  input.addEventListener("change", validacao);
}

let chamaSaida = document.querySelectorAll(".botaoSaida");
for (var i = 0; i < chamaSaida.length; i++) {
  chamaSaida[i].addEventListener("click", saida);
}

let edita = document.querySelectorAll(".botaoEditar");
for (var i = 0; i < edita.length; i++) {
  edita[i].addEventListener("click", Editar)
}
window.onload = CarregaElementos;
window.onload = visaoBotao;
