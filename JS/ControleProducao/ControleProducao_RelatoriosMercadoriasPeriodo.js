/** @autor Alberto
    js responsável pelos relatórios HTML**/

//DOM
var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var btnVoltaRelatorioP = document.getElementById('btnVoltaRelatorioP');
var btnFechaRelatorioP = document.getElementById('btnFechaRelatorioP');
var paragrafoInsumos = document.getElementById('paragrafoInsumo');
var paragrafoProdutos = document.getElementById('paragrafoProduto');
var relLeite = document.getElementById('relLeite');
var relCafeBourbon = document.getElementById('relCafeBourbon');
var relCafeArabica = document.getElementById('relCafeArabica');
var relCafeRobusta = document.getElementById('relCafeRobusta');
var divInsumo = document.getElementById('conteudoInsumo');
var divProduto = document.getElementById('conteudoProduto');
//Variáveis auxiliares
var textoRel = "";
var auxLimpezaRelatorio = 0;




btnRelatorioH.addEventListener('click', criaRelatorioH);



/** @autor Alberto
    Descrição: função que apartir de um periodo faz uma requisição
    para o servlet que retorna um ArrayList com as transações feitas**/
function criaRelatorioH(){
  if (auxLimpezaRelatorio != 0) {
    //vai ter algo aqui que limpa o relatorio;
  }

  var periodo = document.getElementById('selPeriodo').value;

  //Realiza a requisição para o servlet, que retorna um ArrayList com as Transações dentro daquele período
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=relatorio1&id=" + periodo).then(function(resultado){
    var contador = 0;

    if(resultado == null){
      paragrafoProduto.innerHTML = "Não foram encontradas transações de produtos nesse periodo";
      paragrafoInsumo.innerHTML = "Não foram encontradas transações de produtos nesse periodo";
    }else{
      console.log(resultado);

      resultado.forEach(function(){
        //teste para saber se a transação é de Produto
        if(resultado[contador].tipoTransacao == "PRODUTO"){

          var idItem = resultado[contador].idItemTransacao;
          //realiza a requisição para o servlet que retorna o Produto a partir do idItemTransacao obtido na requisição anterior
          Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+
          idItem+"&tipo=produto").then(function(resposta){
            console.log
            textoRel = resultado[contador].valorTransacao;
            console.log(textoRel);
            encontraTipoProduto(idItem).innerHTML = textoRel;

          })
          .catch(function(erro){console.log(erro);});
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
/** @autor Alberto
    Descrição: função que ajusta o Nome do Produto recuperado do BD, afim de tornar
    mais agradável visualmente para o usuário **/
function ajustaNomeProduto(resposta){
  var vetorTemp = resposta.nomeProduto.split("_");
  return vetorTemp;
}
