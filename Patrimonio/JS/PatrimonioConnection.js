/**
 * Script para comunicação com o servlet PatrimonioServlet no backend.
 * @author Duda
 */

const SERVLET_URL = "http://localhost:8080/StayGreen/PatrimonioServlet";

/**
 * Função para gerar datas no formato correto antes de mandar para o servlet
 * @author Duda
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


function sendNewPatrimonio(patrimonio){

  let params = "?action=c&patrimonio=" + patrimonio.toJSON();
  params += "&" + getDataParam(patrimonio);
  Request.get(SERVLET_URL + params).then((response) => {

    console.log(response);
    
  });
}

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

function sendDelete(id){

  let params = "?action=d&id=" + id;
  Request.get(SERVLET_URL + params);
}

function receiveAllPatrimonios(){

  let params = "?action=r";
  Request.get(SERVLET_URL + params).then((response) => {

    console.log(response);

  });

}