/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */


window.onload = function () {

  //Váriaveis

  criaTabela("produto");

  var selecionaTabela = document.getElementsByName("selTabela");
  var produtoTabela = document.getElementById("secProduto");
  var insumoTabela = document.getElementById("secInsumo");
  var selecionaNomeProduto = document.getElementById("selNomeProduto");
  var tdNomeProduto = document.getElementById("tdNomeProduto");
  var produto;
  var promises;


  document.querySelector("#btnRegistarProduto").addEventListener('click', function(){
    produto = new Produto();
    promises = produto.fazRequisicao();
    respostaServlet(promises);
  });

  document.querySelector("#btnRegistrarInsumo").addEventListener('click', function(){
    produto = new Insumo();
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
      criaTabela("produto");
    }
    else{
      produtoTabela.classList.toggle("ocultar");
      insumoTabela.classList.toggle("ocultar");
      criaTabela("insumo");
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
