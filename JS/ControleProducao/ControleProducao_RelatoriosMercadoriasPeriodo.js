//@autor Alberto

var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var conteudoRelatorioH = document.getElementById('conteudoRelatorioHistorico');

btnRelatorioH.addEventListener('click', criaRelatorioH);

function criaRelatorioH(){
  var periodo = document.getElementById('selPeriodo').value;
  console.log(periodo);
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=Relatorio1&id=" + periodo).then(function(resultado){
    console.log(resultado);
    conteudoRelatorioH.innerHTML = resultado.nomeProduto;
  })
  .catch(function(erro){console.log(erro);});

}
