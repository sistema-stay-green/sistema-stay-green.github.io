/**
 * Classe objeto para a encapsulação de dados do Patrimonio.
 * @author Italo
 */
document.querySelector("#BotãoCadastro").addEventListener("click", Cadastrar);
document.querySelector("#BotãoVoltar").addEventListener("click", Voltar);
document.querySelector("#BotãoAção").addEventListener("click", cadastroSemBD);
var chamaSaida = document.querySelectorAll(".BotãoSaida");
for (var i = 0; i < chamaSaida.length; i++) {
  chamaSaida[i].addEventListener("click", saida);
}
setTimeout(VisãoBotão, 100);

function Voltar(){
  document.querySelector(".maquinas").style.display = "inline-block";
  document.querySelector(".opções").style.display = "block";
  document.querySelector(".valores").style.display = "none";
  document.querySelector(".inputs").value = "";

}


function Cadastrar(){
  //adiciona uma maquina no BD

    document.querySelector(".valores").style.display = "block";
    document.querySelector(".opções").style.display = "none";
    document.querySelector(".maquinas").style.display = "none";

}
//função temporaria sem BD
function cadastroSemBD(){
  //teste sem o BD
  let nome = document.querySelector("#nome").value,
  finalidade = document.querySelector("#finalidade").value,
  valor =  document.querySelector("#valor").value,
  data = document.querySelector("#data").value,
  depreciação = document.querySelector("#depreciação").value,
  BotãoSaida = "<button type=\"button\" class=\"BotãoSaida\">Saida</button>",
  maquinas = document.querySelector(".tabela");

  let vetor = [nome,finalidade,valor,depreciação,data];
  let string = "";

  string += "<td class=\"id\">2</td>";
  for (var i = 0; i < vetor.length; i++) {
    string += "<td>" + vetor[i] + "</td>";
  }
    maquinas.innerHTML += string +
    "<td class=\"status\">EM_POSSE</td>" +
    "<td>Máquina</td>" +
    "<td>NAN</td>" +
    "<td>NAN</td>" +
    "<td>NAN</td>" +
    "<td>" + BotãoSaida + "</td>";

  document.querySelector(".maquinas").style.display = "inline-block";
  document.querySelector(".opções").style.display = "block";
  document.querySelector(".valores").style.display = "none";
  document.querySelector(".inputs").value = "";
  var botões = document.querySelectorAll(".BotãoSaida");
  for (var i = 0; i < botões.length; i++) {
    botões[i].addEventListener("click", saida);
  }

}

function saida(){
  var opcao = document.querySelector("#filtro_saida");
  var elemento = event.target;
  elemento = elemento.parentNode;
  nodes = elemento.parentNode.children;
  console.log(elemento.parentNode);
  console.log(nodes[6].innerHTML);
  if (nodes[6].innerHTML == "EM_POSSE") {
    document.querySelector("#saidas").style.display = "block";

      if(elemento.className != "botaoDesab"){
        document.querySelector("#filtro_saida").addEventListener("change", function(elemento){
          if(opcao.value == "Alugar"){
            document.querySelector("#Retorno").style.display = "block";
            document.querySelector("#Venda").style.display = "none";
            document.querySelector("#Envio").style.display = "none";
            document.querySelector("#Descarte").style.display = "none";
          }
          else if(opcao.value == "Vender"){
            document.querySelector("#Retorno").style.display = "none";
            document.querySelector("#Venda").style.display = "block";
            document.querySelector("#Envio").style.display = "none";
            document.querySelector("#Descarte").style.display = "none";
          }
          else if(opcao.value == "Enviar para conserto"){
            document.querySelector("#Retorno").style.display = "none";
            document.querySelector("#Venda").style.display = "none";
            document.querySelector("#Envio").style.display = "block";
            document.querySelector("#Descarte").style.display = "none";
          }
          else if(opcao.value == "Descartar"){
            document.querySelector("#Retorno").style.display = "none";
            document.querySelector("#Venda").style.display = "none";
            document.querySelector("#Envio").style.display = "none";
            document.querySelector("#Descarte").style.display = "block";
          }
        });
    }
    var botão = document.querySelectorAll(".BotãoEnviar");
    for (var i = 0; i < botão.length; i++) {
      botão[i].addEventListener("click", function(){
        AlteraStatus(elemento,opcao);
        document.querySelector("#saidas").style.display = "none";
      });
      }
    }
  }


//div modal fechada
document.querySelector(".fecharModal").onclick = function(){
  document.querySelector("#saidas").style.display = "none";
}
window.onclick = function(event) {
    if (event.target == document.querySelector("#saidas")) {
        document.querySelector("#saidas").style.display = "none";
    }
}
//fim


function AlteraStatus(elemento,opcao){
  console.log(elemento);
  elemento = elemento.parentNode;
  nodes = elemento.children;
  var vetor = [];
  for (var i = 0; i < nodes.length; i++) {
     vetor.push(nodes[i].innerHTML);
  }
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
        elemento.innerHTML += "<td>EM_CONSERTO</td>";
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
  botoes = document.querySelectorAll(".BotãoSaida");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", saida);
  }
  VisãoBotão();
}

function VisãoBotão() {
  var botões = document.querySelectorAll(".BotãoSaida");
  for (var i = 0; i < botões.length; i++) {
    var pesquisa = botões[i].parentNode;
    pesquisa = pesquisa.parentNode;
    var nodes = pesquisa.children;
    console.log(nodes);
    if(nodes[6].innerHTML != "EM_POSSE"){
      botões[i].className = "botaoDesab";
    }
    else {
      botões[i].className = "BotãoSaida";
    }
  }
  console.log("teste");
}
