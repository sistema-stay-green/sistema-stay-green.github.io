/** @autor Alberto
    js responsável pelos relatórios HTML**/

//DOM
var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var btnVoltaRelatorioP = document.getElementById('btnVoltaRelatorioP');
var btnFechaRelatorioP = document.getElementById('btnFechaRelatorioP');
var divInsumo = document.getElementById('conteudoInsumo');
var divProduto = document.getElementById('conteudoProduto');
var textoAviso = document.getElementById('avisoConteudoVazio');
var tabelaProduto = document.getElementById('tabelaProduto');
var tabelaInsumo = document.getElementById('tabelaInsumo');
var tituloProduto = document.getElementById('tituloProduto');
var tituloInsumo = document.getElementById('tituloInsumo');
//Variáveis Auxiliares
var contProdutos = 0;
var contInsumos = 0;


btnRelatorioH.addEventListener('click', criaRelatorioH);

/** @autor Alberto
    Descrição: função que apartir de um periodo faz uma requisição
    para o servlet que retorna um ArrayList com as transações feitas**/
function criaRelatorioH(){

  var periodo = document.getElementById('selPeriodo').value;
  //Realiza a requisição para o servlet, que retorna um ArrayList com as Transações dentro daquele período
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=relatorio1&id=" + periodo)
  .then(function(resultado){

    var contador = 0;

    if(resultado == null){

      tituloProduto.hidden = true;
      tituloInsumo.hidden = true;
      textoAviso.hidden = false;

    }else{
      tituloProduto.hidden = false;
      tituloInsumo.hidden = false;

      console.log(resultado);

      var tabelaProdutoHead = tabelaProduto.createTHead();
      var tabelaProdutoRow = tabelaProdutoHead.insertRow(contProdutos);
      var tabelaProdutosCell = tabelaProdutoRow.insertCell(contProdutos);
      tabelaProdutosCell.innerHTML = "Valor Transação";
      tabelaProdutosCell = tabelaProdutoRow.insertCell(contProdutos);
      tabelaProdutosCell.innerHTML = "Data Transação";
      tabelaProdutosCell = tabelaProdutoRow.insertCell(contProdutos);
      tabelaProdutosCell.innerHTML = "Produto";
      tabelaProdutosCell.insertRow().insertCell().innerHTML = "";


      var tabelaInsumoHead = tabelaInsumo.createTHead();
      resultado.forEach(function(){

        //teste para saber se a transação é de Produto
        if(resultado[contador].tipoTransacao == "PRODUTO"){




          var idItem = resultado[contador].idItemTransacao;

          requestProduto(resultado, contador, idItem);


          //teste para saber se a transação é de Insumo
        }else if(resultado[contador].tipoTransacao == "INSUMO"){
          console.log("insumo");
          paragrafoInsumo.innerHTML = resultado[contador].idTransacao;

        }

        contador++;

      })
    }
  })
  .catch(function(erro){console.log(erro);});
}
/** @autor Alberto
    Descrição: função que a partir do resultado e do contador formata a data da transação**/
function formataData(resultado, contador){
  var mesIncrementado = resultado[contador].dataTransacao.month + 1;
  var dataFormatada = resultado[contador].dataTransacao.dayOfMonth + "/" + mesIncrementado + "/" +
   resultado[contador].dataTransacao.year;
  return dataFormatada;
}
/** @autor Alberto
    Descrição: função que retorna, a partir da id, o elemento no qual deve ser
    inserido o texto do relatório **/
function insereProduto(resultado, contador){
  switch (resultado[contador].idItemTransacao) {
    case 1:
      return relLeite;
      break;
    case 2:
      return relCafeBourbon;
      break;
    case 3:
      return relCafeRobusta;
      break;
    case 4:
      return relCafeArabica;
      break;
    default:
  }
}
/** @autor Alberto
    Descrição: função que ajusta o Nome do Produto recuperado do BD, afim de tornar
    mais agradável visualmente para o usuário **/
function ajustaNomeProduto(resposta){
  var vetorTemp = resposta.nomeProduto.split("_");
  if (vetorTemp["length"] > 1) {
    vetorTemp = vetorTemp[0] + " " + vetorTemp[1];
  }
  return vetorTemp;
}



function requestProduto(resultado, contador, idItem){
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+
  idItem+"&tipo=produto").then(function(resposta){
    var textoRel = ajustaNomeProduto(resposta) + ": " + resultado[contador].valorTransacao+" R$ "+
      formataData(resultado, contador);
    encontraTipoProduto(idItem).innerHTML = textoRel;


  })
  .catch(function(erro){console.log(erro);});
}
