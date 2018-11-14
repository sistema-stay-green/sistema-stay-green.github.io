//@autor Alberto

var btnRelatorioH = document.getElementById('btnRelatorioHistorico');
var conteudoRelatorio = document.getElementById('modalRelatorioHistorico');

btnRelatorioH.addEventListener('click', criaRelatorioH());

function criaRelatorioH(){
  var periodo = document.getElementById('selPeriodo').value;
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=Relatorio1&JSON="+periodo).then(function(resultado){
    var objeto = JSON.parse(resposta);
    conteudoRelatorio.innerHTML = "nome:"+ objeto.nome;
  })
  .catch(function(erro){console.log(erro);});

}
