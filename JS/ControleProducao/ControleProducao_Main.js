/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */


window.onload = function () {

  //Váriaveis

  var selecionaTabela = document.getElementsByName("selTabela");
  var produtoTabela = document.getElementById("secProduto");
  var insumoTabela = document.getElementById("secInsumo");
  var selecionaNomeProduto = document.getElementById("selNomeProduto");
  var tdNomeProduto = document.getElementById("tdNomeProduto");
  var secAvisos = document.getElementById('secAvisos');
  var produto;
  var promises;

  document.querySelector("#btnRegistarProduto").addEventListener('click', function(){
    if(checarInputs()){
        produto = new Produto();
        promises = produto.fazRequisicao();
        respostaServlet(promises);
        console.log(promises);
        Avisos(0);
    }else{
        Avisos(1);
    }

  });

  document.querySelector("#btnRegistrarInsumo").addEventListener('click', function(){
    if(checarInputs()){
        insumo = new Insumo();
        promises = insumo.fazRequisicao();
        respostaServlet(promises);
        console.log(promises);
        Avisos(0);
    }else{
        Avisos(1);
    }

    });
  //tratamento do retorno
  function respostaServlet(retorno){
    retorno.then(function(resultado){
              console.log(resultado);
            })
            .catch(function(erro){
              console.log(erro);
            });
  }

  selecionaTabela[0].onchange = function(){mudaTabela()};
  //Função para alternar entre tabela de produtos e tabela de insumos via select
  function mudaTabela(){
    if(selecionaTabela[0].value === "produto"){
      produtoTabela.classList.toggle("ocultar");
      insumoTabela.classList.toggle("ocultar");
    }
    else{
      produtoTabela.classList.toggle("ocultar");
      insumoTabela.classList.toggle("ocultar");
    }
  }

  //Função para alternar entre KG ou L na unidade de medida do produto via select
  selecionaNomeProduto.onchange =  function(){mudaProduto()};

  function mudaProduto(){
    if(selecionaNomeProduto.value === "cafe"){
      tdNomeProduto.innerHTML = "KG (Kilograma)";
    }
    else{
      tdNomeProduto.innerHTML = "L (Litro)";
    }
  }

};

function checarInputs(){
  var inputs = document.querySelectorAll('input');
  var cont = 0;
  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].clientHeight > 0){
        if(inputs[i].value === "" || inputs[i].validity.valid === false || inputs[i].value === "NaN"){
          inputs[i].style.border = "1px solid red";
          cont++;
        }else{
            inputs[i].style.border = "none";
            inputs[i].style.borderBottom = "1px solid black";
            cont = 0;
        }
    }
  }
  if(cont > 0){
      return false;
  }else{
      return true;
  }

}
function Avisos(i){

          switch (i) {
            case 0:
              secAvisos.innerHTML = "";
              secAvisos.style.color = "black";
            break;
            case 1:
              secAvisos.innerHTML = "<p>Por favor, preencha os campos obrigatórios para continuar</p>";
              secAvisos.style.color = "red";
            break;
            case 2:
              secAvisos.innerHTML = "<p>Salvo no banco de dados com sucesso</p>";
              secAvisos.style.color = "#1d883a";
            break;
            case 3:
              secAvisos.innerHTML = "<p>A conexão com o banco de dados falhou</p>";
              secAvisos.style.color = "red";
            break;
            case 4:
            break;
            default:
          }

  }
