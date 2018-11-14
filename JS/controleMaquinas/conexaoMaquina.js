/*

// Requisição simples:
Request.get('caminho-para-o-servidor?parametro=valor')
    .then(function(resultado) {

    });

// Requisição tratando erro:
Request.get('...')
    .then(function(resultado) { ... })
    .catch(function(erro) {  });

// Requisição POST com parâmetros fora da URL:
Request.post('caminho-para-o-servidor', 'parametro1=valor1&parametro2=valor2')
    .then(function(resultado) { ... });

// Exemplo usando funções de seta para um código mais sucinto:
Request.get('...')
    .then(res => )
    .catch(err => );

28/10/2018
*/

function formatarData(){
  data = new Date().toLocaleString("pt-BR");
  data = data.substring(1,10);
  return data;
}

function receberTodos(){
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?acao="+"r").
    then(function(resultado) {
      return resultado;
    });
}

function cadastrar(nome, descricao, status, indiceDepreciacao, valorCompra,
  dataCompra, quantidade){
  let maquinaJSON = encapsularCadastrar(id, nome, descricao, status,
    indiceDepreciacao, valorCompra);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquina+
              "&acao="+"c"+
              "&dataCompra="+dataCompra+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+null+
              "&quantidade="+quantidade).then(function(resultado) {
                return resultado;
              });
}

function vender(id){
  let maquinaJSON = encapsularVenda(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"v"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ formatarData()).then(function(resultado) {
                return resultado;
              });
}

function descartar(id){
  let maquinaJSON = encapsularDescarte(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"d"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ formatarData()).then(function(resultado) {
                return resultado;
              });
}

function alugar(id, valorAluguel){
  let maquinaJSON = encapsularAluguel(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"a"+
              "&dataCompra="+null+
              "&dataSaida="+formatarData()+
              "&dataRetorno="+null+
              "&dataBaixa="+null+
              "&valorAluguel="+valorAluguel).then(function(resultado) {
                return resultado;
              });
}

function manuntenir(id, dataRetorno){
  let maquinaJSON = encapsularManutencao(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "&maquinasJSON="+maquinaJSON+
              "&acao="+"m"+
              "&dataCompra="+null+
              "&dataSaida="+formatarData()+
              "&dataRetorno="+dataRetorno+
              "&dataBaixa="+null).then(function(resultado) {
                return resultado;
              });
}
