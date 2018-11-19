/* Autor: Diego Demétrio
Grupo 1: Controle de produção
líder: Arthur Marcolino */

function fazRequisicaoTabela(tipo){
   let url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=" + tipo;
   Request.get(url)
          .then(function(res){
           criaTabela(res, tipo);
          })
          .catch(function(error){ console.log(error)});
}



window.onload = function () {
   fazRequisicaoTabela("produto");
   fazRequisicaoTabela("insumo");
   var produtoTabela = document.getElementById("secProduto");
   var insumoTabela = document.getElementById("secInsumo");
   var produto;
   var promises;

;

   document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
       if (checarInputs()) {
           insumo = encapsulaDados("insumo", "adicionar");
           promises = insumo.fazRequisicao();
           setTimeout(function () {
               respostaServlet(promises);
               fazRequisicaoTabela("insumo");
               limparInputs();
           }, 1000);
         //  avisos(4);
       }
       else {
         //  Avisos(1);
       }


   });
   //tratamento do retorno
   function respostaServlet(retorno) {
       retorno.then(function (res) {
             avisos(res.resultado);
             limparInputs();
       }).catch(function (erro) {
         avisos("FALHA", erro);
       });
   }



};

function encapsulaDadosJSON(tipo, JSON){
   var item;
   if(tipo == "produto"){
       item = new Produto();
       item._nomeProduto = JSON._nomeProduto;
       item._descrProduto = JSON._descrProduto;
       item._unidMedProduto = JSON._unidMedProduto;
       item._valorUnitProduto = JSON._valorUnitProduto;
       item._quantEstoqueProduto = JSON._quantEstoqueProduto;
       item._pontoAvisoProduto = JSON._pontoAvisoProduto;
       item.toJSON();
   }
   else {
       item = new Insumo();
       item._nomeInsumo = JSON.nomeInsumo;
       item._finalidadeInsumo = JSON.finalidadeInsumo;
       item._valorCompraInsumo = JSON.valorCompraInsumo;
       item._quantEstoqueInsumo = JSON.quantEstoqueInsumo;
       item._pontoAvisoInsumo = JSON.pontoAvisoInsumo;
       item.toJSON();
   }
   return item;
}

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


// document.querySelector("#btnRemoverProdutos").addEventListener('click', function(){
//   removerTodos("produto");
//   fazRequisicaoTabela("produto");
// });
// document.querySelector("#btnRemoverInsumos").addEventListener('click', function(){
//   removerTodos("insumo");
//   fazRequisicaoTabela("insumo");
// });
// document.querySelector("#btnRemoverTodos").addEventListener('click', function(){
//   removerTodos("ambos");
//   fazRequisicaoTabela("insumo");
//   fazRequisicaoTabela("produto");
// });

// function removerTodos(tipo){
//   var url;
//   if(tipo == ambos)
//     url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=removerTodos";
//   else
//     url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=" + tipo;
//   Request.get(url)
//          .then(function(res){ console.log("Removido(s) com sucesso\t" + res); })
//          .catch(function(erro){ console.log("Erro na remoção de itens\t" + erro) });
// }
