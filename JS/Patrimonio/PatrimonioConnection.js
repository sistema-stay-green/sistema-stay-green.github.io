/**
 * Script para comunicação com o servlet PatrimonioServlet no backend.
 * @author Duda
 */

const SERVLET_URL = "http://localhost:8080/StayGreen/PatrimonioServlet";

/**
 * Função para gerar datas no formato correto antes de mandar para o servlet
 * @author Duda
 * @param {Patrimonio} patrimonio
 * @param key Tipo de data desejada.
 */
function getDataParam(patrimonio = new Patrimonio(), key){
  let params;

  switch (key) {
    case 'Compra':
      if (patrimonio.dataCompra !== null) {
        params = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
      }
      break;
    case 'Saida':
      if (patrimonio.dataSaida !== null) {
        params = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
      }
      break;
    case 'Retorno':
      if (patrimonio.dataRetorno !== null) {
        params = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
      }
      break;
    case 'Baixa':
      if (patrimonio.dataBaixa !== null) {
        params = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
      }
      break;
    default:
      console.log(new Error("Erro de leitura de chave"));
      break;
  }
  if (params !== undefined) {
    params = "data" + key + "=" + params;
  }
  console.log(params);
}

/**
 * Recebe todos os Patrimonios registrados e os envia para a CallBack recebida.
 * @param callBack CallBack a ser executada quando a resposta estiver pronta.
 * @author Mei Fagundes
 */
function receiveAllPatrimoniosFromServlet(callBack){

  let params = "?action=r";
  Request.get(SERVLET_URL + params).then((response) => {

    callBack(encapsulateJSON(response));

  });

}

/**
 * Envia um novo Patrimonio para o Servlet, o recebe de volta e o envia para a CallBack recebida.
 * @param {Patrimonio} patrimonio 
 * @param callBack CallBack a ser executada quando a resposta estiver pronta.
 * @author Mei Fagundes
 */
function sendNewPatrimonio(patrimonio, callBack){

  let params = "?action=c&patrimonio=" + patrimonio.toJSON();
  params += "&" + getDataParam(patrimonio);
  Request.get(SERVLET_URL + params).then((response) => {

    callBack(encapsulateJSON(response));
    
  });
}

/**
 * Envia um Patrimonio atualizado para o Servlet
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes
 */
function sendUpdatedPatrimonio(patrimonio){

  let params = "?action=u&patrimonio=" + patrimonio.toJSON();
  params += "&" + getDataParam(patrimonio, 'Compra');
  params += "&" + getDataParam(patrimonio, 'Saida');
  params += "&" + getDataParam(patrimonio, 'Retorno');
  params += "&" + getDataParam(patrimonio, 'Baixa');
  Request.get(SERVLET_URL + params).then((response) => {

    console.log(response);
    
  });
}

/**
 * Envia uma requisição de remoção de um Patrimonio para o Servlet
 * @param {Patrimonio} patrimonio 
 * @author Mei Fagundes
 */
function sendDeletedPatrimonio(patrimonio = new Patrimonio()){

  let params = "?action=d&id=" + patrimonio.id;
  Request.get(SERVLET_URL + params);
}

/**
 * Encapsula as informações de um JSON em objetos Patrimonio
 * @param {JSON} json 
 * @returns Retorna um array de patrimonios
 * @author Mei Fagundes
 */
function encapsulateJSON(json){

  let patrimonios = [];
  let patrimonio;

  for (const current of json) {

    patrimonio = new Patrimonio();
    patrimonio.id = current.idPatrimonio;

    if (current.hasOwnProperty('nomePatrimonio'))
    patrimonio.nome = current.nomePatrimonio;

    if (current.hasOwnProperty('tipoPatrimonio'))
    patrimonio.tipo = current.tipoPatrimonio;

    if (current.hasOwnProperty('finalidadePatrimonio'))
    patrimonio.finalidade = current.finalidadePatrimonio;

    if (current.hasOwnProperty('statusPatrimonio'))
    patrimonio.status = current.statusPatrimonio;

    if (current.hasOwnProperty('indDeprecPatrimonio'))
    patrimonio.indiceDepreciacao = current.indDeprecPatrimonio;

    if (current.hasOwnProperty('valorCompraPatrimonio'))
    patrimonio.valorCompra = current.valorCompraPatrimonio;

    if (current.hasOwnProperty('dataRetornoPatrimonio')) {
      patrimonio.dataRetorno = new Date(parseInt(current.dataRetornoPatrimonio.year),
        parseInt(current.dataRetornoPatrimonio.month), parseInt(current.dataRetornoPatrimonio.dayOfMonth));
    }
    if (current.hasOwnProperty('dataCompraPatrimonio')){
      patrimonio.dataCompra = new Date(parseInt(current.dataCompraPatrimonio.year),
        parseInt(current.dataCompraPatrimonio.month), parseInt(current.dataCompraPatrimonio.dayOfMonth));
    }
    if (current.hasOwnProperty('dataBaixaPatrimonio')){
      patrimonio.dataBaixa = new Date(parseInt(current.dataBaixaPatrimonio.year),
        parseInt(current.dataBaixaPatrimonio.month), parseInt(current.dataBaixaPatrimonio.dayOfMonth));
    }
    if (current.hasOwnProperty('dataSaidaPatrimonio')){
      patrimonio.dataSaida = new Date(parseInt(current.dataSaidaPatrimonio.year),
        parseInt(current.dataSaidaPatrimonio.month), parseInt(current.dataSaidaPatrimonio.dayOfMonth));
    }

    patrimonios.push(patrimonio);
  }

  return patrimonios;
}