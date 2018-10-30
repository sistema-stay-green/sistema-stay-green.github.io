/* @autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */
//arquivo renomeado para main.js


window.onload = function () {
  var produto;
  var promises;

  document.querySelector("#btnRegistarProduto").addEventListener('click', function(){
    produto = new Produto();
    promises = produto.fazRequisicao();
    respostaServlet(promise);
  });

  document.querySelector("#btnRegistrarInsumo").addEventListener('click', function(){
    produto = new Insumo()
  });

  //tratamento do retorno
  function respostaServlet(retorno){

  }

  
}
