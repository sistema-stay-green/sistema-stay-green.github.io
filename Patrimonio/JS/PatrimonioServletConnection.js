/**
 * Script para comunicação com o servlet PatrimonioServlet no backend.
 * @author Duda
 */

const servletUrl = "http://localhost:8080/StayGreen/PatrimonioServlet";

function saidaPatrimonio(id, tipoSaida){
  //TODO: Receber a data do campo da tela
  let data = [2018, 10, 28];
  let params = "?action=s&id=" + id + "&tipoSaida=" + tipoSaida +
               "&ano=" + data[0] + "&mes=" + data[1] + "&dia=" + data[2];

  Request.post(servletUrl + params, "teste");
  //TODO: Receber o resultado do servlet através do método GET
  //let response = Request.get(url);
}

function sendAddPatrimonioToServlet(patrimonio){
  let params = "?action=c&patrimonio=" + JSON.stringify(patrimonio);
  Request.post(servletUrl + params, "teste");

  //TODO: Receber o resultado do servlet através do método GET
  //let response = Request.get(url);
}
