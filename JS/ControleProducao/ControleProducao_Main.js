/* Autor: Diego Demétrio
Grupo 1: Controle de produção
líder: Arthur Marcolino */

/**
* @author Diego Demétrio
* Chama a função que cria as tabelas e atrela um evento ao botão de registrar insumos
*/

window.onload = function () {
   fazRequisicaoTabela("produto");
   fazRequisicaoTabela("insumo");
   var produtoTabela = document.getElementById("secProduto");
   var insumoTabela = document.getElementById("secInsumo");
   var produto;
   var promises;
   document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
       if (checarInputs()) {
           insumo = encapsulaDados("insumo", "adicionar");
           promises = insumo.fazRequisicao();
           setTimeout(function () {
               respostaServlet(promises);
               fazRequisicaoTabela("insumo");
               limparInputs();
           }, 1000);
       }
   });
};

function mostraTabela(tipo, acao){
  let sufixo = (tipo ==  "produto") ? "Produtos" : "Insumos";
  let tabela = document.querySelector("#tab" + sufixo + "Registrados");
  let mensagem = document.querySelector("#mensagem" + sufixo);
  console.log(tabela);
  if(acao == "mostrar"){
    mensagem.classList.add("ocultar");
    tabela.classList.remove("ocultar");
      console.log("teste");
  }
  else{
    mensagem.classList.remove("ocultar");
    tabela.classList.add("ocultar");
    console.log("teste");
  }
}

/**
* @author Diego Demétrio
* Faz a requisição AJAX para criar as tabelas
* @param tipo produto ou insumo
*/
function fazRequisicaoTabela(tipo){
   let url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=" + tipo;
   Request.get(url)
          .then(function(res){
           criaTabela(res, tipo);
          })
          .catch(function(error){
            console.log(error);
            mostraTabela(tipo, "ocultar");
          });
}

/**
* Função de debugging
* @author Diego Demétrio
* @param retorno retorno da requisição AJAX
*/
function respostaServlet(retorno) {
    retorno.then(function (res) {
          avisos(res.resultado);
          limparInputs();
    }).catch(function (erro) {
      avisos("FALHA", erro);
    });
}

/**
* @author Diego Demétrio
* Cria um objeto produto ou insumo com os dados JSON
* @param tipo produto ou insumo
* @param obj objeto em JSON
* @return item(objeto insumo ou produto)
*/
function encapsulaDadosJSON(tipo, obj){
   var item;
   if(tipo == "produto"){
       item = new Produto();
       item._nomeProduto = obj._nomeProduto;
       item._descrProduto = obj._descrProduto;
       item._unidMedProduto = obj._unidMedProduto;
       item._valorUnitProduto = obj._valorUnitProduto;
       item._quantEstoqueProduto = obj._quantEstoqueProduto;
       item._pontoAvisoProduto = obj._pontoAvisoProduto;
       item.toJSON();
   }
   else {
       item = new Insumo();
       item._nomeInsumo = obj.nomeInsumo;
       item._finalidadeInsumo = obj.finalidadeInsumo;
       item._valorCompraInsumo = obj.valorCompraInsumo;
       item._quantEstoqueInsumo = obj.quantEstoqueInsumo;
       item._pontoAvisoInsumo = obj.pontoAvisoInsumo;
       item.toJSON();
   }
   return item;
}

/**
 * @author Diego Demétrio
 * Cria um objeto produto ou insumo com os dados das inputs
 * @param tipo insumo ou produto
 * @param operacao adicionar ou editar
 * @return item(objeto insumo ou produto)
*/
function encapsulaDados(tipo, operacao) {
   var item;
   if (operacao == "adicionar") {
             item = new Insumo();
             item.nomeInsumo = document.querySelector("#inpNomeInsumo").value;
             item.finalidadeInsumo = document.querySelector("#inpFinalidadeInsumo").value;
             item.valorCompraInsumo = parseFloat(document.querySelector("#valorCompraInsumo").value);
             item.quantEstoqueInsumo = parseInt(document.querySelector("#inpQuantEstoqueInsumo").value);

             //verifica se há um ponto de aviso
             let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo").value);
             item.pontoAvisoInsumo = (aux == null) ? "" : aux;
   }else {
     if(tipo == "produto"){
             item = new Produto();
             let nome  = document.querySelector("#inpNomeProduto").value;
             if (nome == "Leite") {
                 item.nomeProduto = "LEITE";
             }else if (nome == "Café Bourbon") {
                 item.nomeProduto = "CAFE_BOURBON"
             }else if (nome == "Café Robusta") {
                 item.nomeProduto = "CAFE_ROBUSTA";
             }else {
                 item.nomeProduto = "CAFE_ARABICA";
             }
             item.descrProduto = document.querySelector("#inpDescricaoProduto").value;
             item.unidadeMedidaProduto = document.querySelector("#inpUnidadeMedidaProduto").value;
             item.valorUnitProduto = parseFloat(document.querySelector("#inpValorProduto").value);
             item.quantEstoqueProduto = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);

             //verifica se há um ponto de aviso (valor opcional);
             let aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
             item.pontoAvisoProduto = (aux == null) ? "" : aux;
     }
     else{
             item = new Insumo();
             item.nomeInsumo = document.querySelector("#inpNomeInsumo2").value;
             item.finalidadeInsumo = document.querySelector("#inpFinalidadeInsumo2").value;
             item.valorCompraInsumo = parseFloat(document.querySelector("#valorCompraInsumo2").value);
             item.quantEstoqueInsumo = parseInt(document.querySelector("#inpQuantEstoqueInsumo2").value);

             //verifica se há um ponto de aviso
             let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo2").value);
             item.pontoAvisoInsumo = (aux == null) ? "" : aux;
     }
   }
   return item;
}
