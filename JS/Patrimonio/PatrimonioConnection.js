/**
 * Script para comunicação com o servlet PatrimonioServlet no backend.
 * @author Maria Eduarda Pasquel, Mei Fagundes
 */

const SERVLET_URL = "http://localhost:8080/StayGreen/PatrimonioServlet";

/**
 * Recebe todos os Patrimonios registrados e os envia para a CallBack recebida.
 * @param callBack CallBack a ser executada quando a resposta estiver pronta.
 * @author Mei Fagundes, Maria Eduarda Pasquel
 */
function receiveAllPatrimoniosFromServlet(callBack){

  document.body.classList.add("waiting");
  let params = "?action=r";
  Request.get(SERVLET_URL + params).then((response) => {
    console.log(response);
    document.body.classList.remove("waiting");
    let patrimonios = [];
    for (const current of response) {
      patrimonios.push(encapsulateJSON(current));
    }
    callBack(patrimonios);
  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });

}

/**
 * Envia um novo Patrimonio para o Servlet, o recebe de volta e o envia para a CallBack recebida.
 * @param {Patrimonio} patrimonio 
 * @param callBack CallBack a ser executada quando a resposta estiver pronta.
 * @author Mei Fagundes, Maria Eduarda Pasquel
 */
function sendNewPatrimonio(patrimonio, callBack){

  document.body.classList.add("waiting");
  let params = "?action=c&patrimonio=" + patrimonio.toJSON();
  Request.get(SERVLET_URL + params, "text").then((response) => {

    document.body.classList.remove("waiting");
    if (response.slice(0,1) !== "F")
      callBack(encapsulateJSON(JSON.parse(response)));
    else
      showError(2);

  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });
}

/**
 * Envia um Patrimonio atualizado para o Servlet
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes, Maria Eduarda Pasquel
 */
function sendUpdatedPatrimonio(patrimonio){
  
  document.body.classList.add("waiting");
  let params = "?action=u&patrimonio=" + patrimonio.toJSON();
  Request.get(SERVLET_URL + params, "text").then((response) => {

    document.body.classList.remove("waiting");
    switch (response.slice(0,1)) {

      case "S":
        break;

      case "N":
        showError(1);
        break;

      case "F":
        showError(2);
        break;

      default:
        throw new Error("Reposta incorreta recebida do Server.");
    }
  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });
}

/**
 * Envia uma requisição de remoção de um Patrimonio para o Servlet
 * @param {Patrimonio} patrimonio 
 * @author Mei Fagundes, Maria Eduarda Pasquel
 */
function sendDeletedPatrimonio(id, callBack){

  document.body.classList.add("waiting");
  let params = "?action=d&id=" + id;
  Request.get(SERVLET_URL + params, "text").then((response) => {

    document.body.classList.remove("waiting");
    switch (response.slice(0,1)) {

      case "S":
        callBack(id);
        break;

      case "N":
        showError(1);
        break;

      case "F":
        showError(2);
        break;

      default:
        throw new Error("Reposta incorreta recebida do Server.");
    }

  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });
}

/**
 * Pesquisa um Patrimonio no Server usando o ID recebido.
 * @param {int} id 
 * @param {CallBack} callBack 
 * @author Maria Eduarda Pasquel
 */
function searchById(id, callBack){
  let params = "?action=s&s=id&id=";
  Request.get(SERVLET_URL + params + id, "text").then((response) => {

    document.body.classList.remove("waiting");
    let patrimonios = [];

    if (response.slice(0,1) !== "N") {

      for (const current of response) {
        patrimonios.push(encapsulateJSON(JSON.parse(current)));
      }
    }
    callBack(patrimonios);
    
  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });
}

/**
 * Pesquisa Patrimonios no Server usando o Nome recebido.
 * @param {int} id 
 * @param {CallBack} callBack 
 * @author Maria Eduarda Pasquel
 */
function searchByNome(nome, callBack){
  let params = "?action=s&s=nome&nome=";
  Request.get(SERVLET_URL + params + nome, "text").then((response) => {

    document.body.classList.remove("waiting");
    let patrimonios = [];

    if (response.slice(0,1) !== "N") {

      for (const current of response) {
        patrimonios.push(encapsulateJSON(JSON.parse(current)));
      }
    }
    callBack(patrimonios);

  }, (reason) => {
    document.body.classList.remove("waiting");
    showError(0);
  });
}

/**
 * Encapsula as informações de um JSON em um objeto Patrimonio
 * @param {JSON} json 
 * @returns {Patrimonio} Retorna o objeto Patrimonio resultante;
 * @author Mei Fagundes
 */
function encapsulateJSON(json){

  patrimonio = new Patrimonio();
  patrimonio.id = json.idPatrimonio;

  if (json.hasOwnProperty('nomePatrimonio'))
    patrimonio.nome = json.nomePatrimonio;

  if (json.hasOwnProperty('tipoPatrimonio'))
    patrimonio.tipo = json.tipoPatrimonio;

  if (json.hasOwnProperty('finalidadePatrimonio'))
    patrimonio.finalidade = json.finalidadePatrimonio;

  if (json.hasOwnProperty('statusPatrimonio'))
    patrimonio.status = json.statusPatrimonio;

  if (json.hasOwnProperty('indDeprecPatrimonio'))
    patrimonio.indiceDepreciacao = json.indDeprecPatrimonio;

  if (json.hasOwnProperty('valorCompraPatrimonio'))
    patrimonio.valorCompra = json.valorCompraPatrimonio;

  if (json.hasOwnProperty('dataRetornoPatrimonio')) {
    patrimonio.dataRetorno = new Date(parseInt(json.dataRetornoPatrimonio.year),
      parseInt(json.dataRetornoPatrimonio.month), parseInt(json.dataRetornoPatrimonio.dayOfMonth));
  }
  if (json.hasOwnProperty('dataCompraPatrimonio')){
    patrimonio.dataCompra = new Date(parseInt(json.dataCompraPatrimonio.year),
      parseInt(json.dataCompraPatrimonio.month), parseInt(json.dataCompraPatrimonio.dayOfMonth));
  }
  if (json.hasOwnProperty('dataBaixaPatrimonio')){
    patrimonio.dataBaixa = new Date(parseInt(json.dataBaixaPatrimonio.year),
      parseInt(json.dataBaixaPatrimonio.month), parseInt(json.dataBaixaPatrimonio.dayOfMonth));
  }
  if (json.hasOwnProperty('dataSaidaPatrimonio')){
    patrimonio.dataSaida = new Date(parseInt(json.dataSaidaPatrimonio.year),
      parseInt(json.dataSaidaPatrimonio.month), parseInt(json.dataSaidaPatrimonio.dayOfMonth));
  }
  return patrimonio;
}