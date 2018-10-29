var selecionaTabela = document.querySelector("#selTabela").value;
var produtoTabela = document.querySelector("#secProduto");
var insumoTabela = document.querySelector("#secInsumo");

selecionaTabela.onchange = function(){
  mudaTabela();
};
function mudaTabela(){
  if(selecionaTabela.value == "produto"){
    produtoTabela.classList.toggle("ocultar");
  }
  else{
    insumoTabela.classList.toggle("ocultar");
  }
}
