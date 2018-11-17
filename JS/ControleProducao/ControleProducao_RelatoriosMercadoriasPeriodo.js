/** @autor Alberto
    js responsável pelos relatórios HTML**/

//DOM
var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var btnVoltaRelatorioP = document.getElementById('btnVoltaRelatorioP');
var btnFechaRelatorioP = document.getElementById('btnFechaRelatorioP');
var divInsumo = document.getElementById('conteudoInsumo');
var divProduto = document.getElementById('conteudoProduto');
var avisoRelatorio = document.getElementById('avisoRelatorio');
var tabelaProdutoLeite = document.getElementById('tabelaRelLeite');
var tabelaProdutoCafeB = document.getElementById('tabelaRelCafeB');
var tabelaProdutoCafeR = document.getElementById('tabelaRelCafeR');
var tabelaProdutoCafeA = document.getElementById('tabelaRelCafeA');
var tabelaInsumo = document.getElementById('tabelaInsumo');
var tituloProduto = document.getElementById('tituloProduto');
var tituloInsumo = document.getElementById('tituloInsumo');

btnRelatorioH.addEventListener('click', criaRelatorioH);

/** @autor Alberto
    Descrição: função que apartir de um periodo faz uma requisição
    para o servlet que retorna um ArrayList com as transações feitas**/
function criaRelatorioH(){
  var periodo = document.getElementById('selPeriodo').value;
  var contLeite = 0;
  var contCafeB = 0;
  var contCafeR = 0;
  var contCafeA = 0;
  var contInsumos = 0;
  //Realiza a requisição para o servlet, que retorna um ArrayList com as Transações dentro daquele período
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=relatorio1&id=" + periodo)
  .then(function(resultado){

    var contador = 0;

    if(resultado == null){
      avisoRelatorio.innerHTML == "" ? avisoRelatorio.innerHTML = "Não foram encontradas transações nesse período": avisoRelatorio.innerHTML="Não foram " +
      "encontradas transações nesse período";

    }else{
      avisoRelatorio.innerHTML == "Não foram encontradas transações nesse período" ? avisoRelatorio.innerHTML="": avisoRelatorio.innerHTML = "";
      resultado.forEach(function(){

        //teste para saber se a transação é de Produto
        if(resultado[contador].tipoTransacao == "PRODUTO"){
          switch (resultado[contador].idItemTransacao) {
            case 1:
              contLeite++;
              var linha = tabelaProdutoLeite.insertRow(contLeite + 1);
              insereProdutoTabela(resultado, contador, linha);
              break;
            case 2:
              contCafeB++;
              var linha = tabelaProdutoCafeB.insertRow(contCafeB + 1);
              insereProdutoTabela(resultado, contador, linha);
              break;
            case 3:
                contCafeR++;
                var linha = tabelaProdutoCafeR.insertRow(contCafeR + 1);
                insereProdutoTabela(resultado, contador, linha);
                break;
            case 4:
              contCafeA++;
              var linha = tabelaProdutoCafeA.insertRow(contCafeA + 1);
              insereProdutoTabela(resultado, contador, linha);
              break;
            default:

          }
          //teste para saber se a transação é de Insumo
        }else if(resultado[contador].tipoTransacao == "INSUMO"){
             contInsumos++;
              var linha = tabelaInsumo.insertRow(contInsumos + 1);
              insereInsumoTabela(resultado, contador, linha);



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
    Descrição: função que ajusta o Nome do Produto recuperado do BD, afim de tornar
    mais agradável visualmente para o usuário **/
function ajustaNomeProduto(resposta){
  var vetorTemp = resposta.nomeProduto.split("_");
  if (vetorTemp["length"] > 1) {
    vetorTemp = vetorTemp[0] + " " + vetorTemp[1];
  }
  return vetorTemp;
}


function insereProdutoTabela(resultado, contador, linha){
  for(let i = 1; i <= 4; i++){

    var celula = linha.insertCell(i-1);
    switch(i){
      case 1:
      celula.innerHTML = formataData(resultado, contador);

      break;
      case 2:
      celula.innerHTML = resultado[contador].quantTransacao;
      break;
      case 3:
      celula.innerHTML = resultado[contador].valorTransacao+"$";
      break;
    }
  }

}
function insereInsumoTabela(resultado, contador, linha){
  console.log(resultado[contador]);
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+resultado[contador].idItemTransacao+"&tipo=insumo")
  .then(function(resposta){
      var nome = resposta.nomeInsumo;
      console.log(nome);
      for(let i = 1; i <= 4; i++){
        var celula = linha.insertCell(i-1);
        switch(i){
          case 1:
          celula.innerHTML = nome;
          break;
          case 2:
          celula.innerHTML = formataData(resultado, contador);

          break;
          case 3:
          celula.innerHTML = resultado[contador].quantTransacao;
          break;
          case 4:
          celula.innerHTML = resultado[contador].valorTransacao+"$";
          break;
        }
      }
  })
  .catch(function(erro){console.log(erro);});
}


// function requestProduto(resultado, contador, idItem){
//   Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+
//   idItem+"&tipo=produto").then(function(resposta){
//     var textoRel = ajustaNomeProduto(resposta) + ": " + resultado[contador].valorTransacao+" R$ "+
//       formataData(resultado, contador);
//     encontraTipoProduto(idItem).innerHTML = textoRel;
//
//
//   })
//   .catch(function(erro){console.log(erro);});
// }
