function receberTodos(){

}

function cadastrar(id, nome, descricao, status, indiceDepreciacao, valorCompra,
  dataCompra){
  let maquinaJSON = encapsularCadastrar(id, nome, descricao, status,
    indiceDepreciacao, valorCompra);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquina+
              "acao="+"c"+
              "dataCompra="+dataCompra+
              "dataSaida="+null+
              "dataRetorno="+null+
              "dataBaixa="+null);
}

function vender(id){
  let maquinaJSON = encapsularVenda(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"v"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ new Date());
}

function descartar(id){
  let maquinaJSON = encapsularDescarte(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"d"+
              "&dataCompra="+null+
              "&dataSaida="+null+
              "&dataRetorno="+null+
              "&dataBaixa="+ new Date());
}

function alugar(id, dataRetorno, valorAluguel){
  let maquinaJSON = encapsularAluguel(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "maquinasJSON="+maquinaJSON+
              "&acao="+"a"+
              "&dataCompra="+null+
              "&dataSaida="+new Date()+
              "&dataRetorno="+dataRetorno+
              "&dataBaixa="+null+
              "&valorAluguel="+valorAluguel);
}

function manuntenir(id, dataRetorno){
  let maquinaJSON = encapsularManutencao(id);
  Request.get("http://localhost:8080/StayGreen/MaquinasServlet?"+
              "&maquinasJSON="+maquinaJSON+
              "&acao="+"m"+
              "&dataCompra="+null+
              "&dataSaida="+new Date()+
              "&dataRetorno="+dataRetorno+
              "&dataBaixa="+null);
}
