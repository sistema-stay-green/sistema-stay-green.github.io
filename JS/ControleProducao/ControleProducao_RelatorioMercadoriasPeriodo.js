//@autor Alberto

var btnRelatorioH = document.getElementById('btnRelatorioHistorico');

btnRelatorioH.addEventListener('click', criaRelatorioH());

function criaRelatorioH(){
  var periodo = document.getElementById('selPeriodo').value;
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=Relatorio1&JSON=periodo").then(function(resultado){
    console.log(resultado);
  })
  .catch(function(erro){console.log(erro);});

}
