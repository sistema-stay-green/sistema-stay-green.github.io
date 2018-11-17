//@autor Alberto
var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var btnVoltaRelatorioP = document.getElementById('btnVoltaRelatorioP');
var btnFechaRelatorioP = document.getElementById('btnFechaRelatorioP');
var paragrafoInsumos = document.getElementById('paragrafoInsumo');
var paragrafoProdutos = document.getElementById('paragrafoProduto');
var textoRel = "";
var relLeite = document.getElementById('relLeite');
var relCafeBourbon = document.getElementById('relCafeBourbon');
var relCafeArabica = document.getElementById('relCafeArabica');
var relCafeRobusta = document.getElementById('relCafeRobusta');
var auxLimpezaRelatorio = 0;
var divInsumo = document.getElementById('conteudoInsumo');
var divProduto = document.getElementById('conteudoProduto');



btnRelatorioH.addEventListener('click', criaRelatorioH);

function criaRelatorioH(){
  if (auxLimpezaRelatorio != 0) {

  }
  var periodo = document.getElementById('selPeriodo').value;
  var contador = 0;
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=relatorio1&id=" + periodo).then(function(resultado){
    if(resultado == null){
      paragrafoProduto.innerHTML = "Não foram encontradas transações de produtos nesse periodo";
      paragrafoInsumo.innerHTML = "Não foram encontradas transações de produtos nesse periodo";
    }else{
      console.log(resultado);
      resultado.forEach(function(){
        if(resultado[contador].tipoTransacao == "PRODUTO"){
          var idItem = resultado[contador].idItemTransacao;
          Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+
          idItem+"&tipo=produto").then(function(resposta){
            textoRel = ajustaNomeProduto(resposta) + "\n: " +  resultado[contador].valorTransacao + " R$ " ;
            console.log(textoRel);
            encontraTipoProduto(idItem).innerHTML = textoRel;

          })
          .catch(function(erro){console.log(erro);});
        }else if(resultado[contador].tipoTransacao == "INSUMO"){
          console.log("insumo");


        paragrafoInsumo.innerHTML = resultado[contador].idTransacao;
        contador++;
        }
      })
    }
  })
  .catch(function(erro){console.log(erro);});
}
function formataData(resultado, contador){
  var mesIncrementado = resultado[contador].dataTransacao.month + 1;
  var dataFormatada = resultado[contador].dataTransacao.dayOfMonth + "/" + mesIncrementado + "/" +
   resultado[contador].dataTransacao.year;
  return dataFormatada;
}
function encontraTipoProduto(id){
  switch (id) {
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
function ajustaNomeProduto(resposta){
  var vetorTemp = resposta.nomeProduto.split("_");
  return vetorTemp;
}
