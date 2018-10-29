/**
 * Script para comunicação com o servlet PatrimonioServlet no backend.
 * @author Duda
 */

const SERVLET_URL = "http://localhost:8080/StayGreen/PatrimonioServlet";

function saidaPatrimonio(patrimonio = new Patrimonio(), key){

  let params;

  switch (key) {
    case 'Compra':
      params = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
      break;
  
    default:
      break;
  }

  params = "data" + key + "=" + params;

  console.log(params);
}

function sendAddPatrimonioToServlet(patrimonio){
  let params = "action=c&patrimonio=" + JSON.stringify(patrimonio);
  params += "&" + saidaPatrimonio(patrimonio);

  Request.post(SERVLET_URL, params);

  //TODO: Receber o resultado do servlet através do método GET
  //let response = Request.get(url);
}