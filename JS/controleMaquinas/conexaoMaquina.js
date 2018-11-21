/**
* Retorna data atual já formatada
* @returns {String} data atual formatada
*/
function novaData(){
  data = new Date().toLocaleString("pt-BR");
  data = data.substring(1,10);
  return data;
}

/**
* Faz requisição Ajax para receber todos os dados
* @returns {Object} vetor de maquinas
*/
function receberTodos(){
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?acao="+"r"+"&quantidade=1").
    then(function(resultado) {
      resultado = resultado.split('/');
      for(i = 0; i < resultado.length; i++){
        let maquina = new Maquina(null);
        maquina.fromJSON(resultado[i]);
        resultado[i] = maquina;
      }
      carregaElementos(resultado);
    });
}

/**
 * Envia dados para o Servlet para Compra de máquinas.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} nome representando o nome da máquina;
 * @param {String} descricao breve descricao da máquina;
 * @param {String} status em qual situação se encontra a máquina;
 * @param {int} indiceDepreciacao inteiro representando a porcentagem a depreciacao por ano;
 * @param {int} valorCompra inteiro negativo representando o valor da compra da máquina;
 * @param {String} dataCompra String representando o dia da compra;
 * @param {int} quantidade inteiro representando a quantidade;
 * @returns {String} Retorna a resposta do servidor;
 * @author Guilherme Sena
 */
function cadastrar(nome, descricao, status, indiceDepreciacao, valorCompra,
  dataCompra, quantidade){
  let maquinaJSON = encapsularCadastrar(nome, descricao, status,
    indiceDepreciacao, valorCompra);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"c"+
              "&dataCompra="+dataCompra+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+null+
              "&quantidade="+quantidade).then(function(resultado) {
                console.log(resultado);
              });
}

/**
 * Envia dados para o Servlet para Comprar máquina.
 * @param {int} id que é um inteiro representando o ID da máquina;
 * @returns {String} Retorna uma string com resposta do Servlet;
 * @author Guilherme Sena
 */
function vender(id,data){
  let maquinaJSON = encapsularVenda(id,data);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"v"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ formatarData(data)+
              "&quantidade="+1).then(function(resultado) {
                console.log(resultado);
              });
}

/**
 * Envia dados para o Servlet para Vender máquina.
 * @param {int} id inteiro representando o ID da máquina;
 * @returns {String} Retorna uma string com a resposta do Servlet;
 * @author Guilherme Sena
 */
function descartar(id,data){
  let maquinaJSON = encapsularDescarte(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"d"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ formatarData(data)+
              "&quantidade="+1).then(function(resultado) {
                console.log(resultado);
              });
}

/**
 * Envia dados para o Servlet para Vender máquina.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {float} valorAluguel real negativo representando o valor do aluguel;
 * @returns {String} Retorna uma string com a resposta do Servlet;
 * @author Guilherme Sena
 */
function alugar(id,data, valorAluguel){
  let maquinaJSON = encapsularAluguel(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"a"+
              "&dataCompra="+null+
              "&dataSaida="+novaData()+
              "&dataRetorno="+formatarData(data)+
              "&dataBaixa="+null+
              "&valorAluguel="+valorAluguel+
              "&quantidade="+1).then(function(resultado) {
                console.log(resultado);
              });
}

/**
 * Envia dados para o Servlet para Vender máquina.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} dataRetorno string com a data no qual haverá o retorno;
 * @returns {String} Retorna uma string com a resposta do Servlet;
 * @author Guilherme Sena
 */
function manuntenir(id, dataRetorno){
  let maquinaJSON = encapsularManutencao(id, dataRetorno);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "&maquinasJSON="+maquinaJSON+
              "&acao="+"m"+
              "&dataCompra="+null+
              "&dataSaida="+novaData()+
              "&dataRetorno="+formatarData(dataRetorno)+
              "&dataBaixa="+null+
              "&quantidade="+1).then(function(resultado) {
                console.log(resultado);
              });
}

function editarBE(id, nome, finalidade, indiceDepreciacao, valorCompra, dataCompra){
  let maquinaJSON = encapsularEditar(id, nome, finalidade,
    indiceDepreciacao, valorCompra,dataCompra);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"e"+
              "&dataCompra="+dataCompra+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+null+
              "&quantidade=1").then(function(resultado) {
                console.log(resultado);
              });
}
