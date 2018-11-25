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
var btnRelatorioProducao = document.getElementById('btnRelatorioProducao');
var textoRelProducaoLeite = document.getElementById('textoRelProducaoLeite');
var textoRelProducaoCafeB = document.getElementById('textoRelProducaoCafeB');
var textoRelProducaoCafeR = document.getElementById('textoRelProducaoCafeR');
var textoRelProducaoCafeA = document.getElementById('textoRelProducaoCafeA');
var textoRelProducaoData = document.getElementById('textoRelProducaoData');


//Adicionando eventos
btnRelatorioProducao.addEventListener('click', criaRelatorioP);
btnRelatorioH.addEventListener('click', criaRelatorioH);

/** @autor Alberto
Descrição: função que faz uma requisição
para o servlet que retorna um array cuja chave é o ID dos produtos e o conteudo
é a produção semanal daquele Produto, esse valor é colocado no conteudo de um
h4 específico para mostrar ao usuário essa quantidade**/
function criaRelatorioP() {
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=relatorio2&id=" + "teste")
  .then(function(producao){
    if (producao == null) {
      textoRelProducaoLeite.innerHTML = "Não foi possivel calcular a Produção Semanal";
      textoRelProducaoLeite.style.color = "red";
    }else{
      var dataAtual = new Date();
      var umaSemanaAtras = new Date();
      umaSemanaAtras.setDate(umaSemanaAtras.getDate()-7);
      var mesAjustado = dataAtual.getMonth() +1;
      textoRelProducaoData.innerHTML = dataAtual.getDate() + "/" + mesAjustado + "/" + dataAtual.getFullYear();
      mesAjustado = umaSemanaAtras.getMonth() +1;
      textoRelProducaoData.innerHTML += "  -  " + umaSemanaAtras.getDate() +  "/" + mesAjustado + "/"+ umaSemanaAtras.getFullYear();
      console.log(umaSemanaAtras.getDate());
      textoRelProducaoLeite.innerHTML = "Leite: " + producao[0] + " L";
      textoRelProducaoCafeB.innerHTML = "Café Bourbon: " + producao[1] + " Kg";
      textoRelProducaoCafeR.innerHTML = "Café Robusta: " + producao[2] + " Kg";
      textoRelProducaoCafeA.innerHTML = "Café Arábica: " + producao[3] + " Kg";

    }
  })
  .catch(function(erro){console.log(erro);});

}



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
    //testa se há resultados disponiveis do request
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

/** @autor Alberto
Descrição: Insere os produtos em suas respectivas tabelas, preenchendo-as
com os devidos valores  **/
function insereProdutoTabela(resultado, contador, linha){
  var valTransacao = resultado[contador].valorTransacao;
  //para cada uma das colunas da tabela insere o respectivo valor
  for(let i = 1; i <= 3; i++){
    var celula = linha.insertCell(i-1);
    switch(i){
      case 1:
      celula.innerHTML = formataData(resultado, contador);

      break;
      case 2:
      celula.innerHTML = resultado[contador].quantTransacao;
      break;
      case 3:
      celula.innerHTML = valTransacao.toFixed(2) +"$" ;
      break;
    }
  }

}
/** @autor Alberto
Descrição: Insere os insumos em uma tabela, preenchendo-as
com os devidos valores  **/
function insereInsumoTabela(resultado, contador, linha){
  Request.get("http:localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&id="+resultado[contador].idItemTransacao+"&tipo=insumo")
  .then(function(resposta){
    var valTransacao = resultado[contador].valorTransacao;
    var nome = resposta.nomeInsumo;
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
          valTransacao > 0 ? celula.innerHTML = "Venda" : celula.innerHTML = "Compra/Descarte";
          celula.innerHTML = resultado[contador].quantTransacao;
          break;
        case 4:
          celula.innerHTML = valTransacao.toFixed(2) +"$" ;
          break;
      }
    }
  })
  .catch(function(erro){console.log(erro);});
}
