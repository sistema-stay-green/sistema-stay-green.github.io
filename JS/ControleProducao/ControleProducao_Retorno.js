function criaTabela(tipo){
	var url = "ControleProducaoServlet?json=0&botao=buscar&tipo=0";
	Request.get(url)
		   .then(function(res){ itens = JSON.parse(res); })
		   .catch(function(erro){ console.log(erro); });

    var tabela = document.querySelector("tabelaBD");
    if(tabela == null){
    	var tabela = document.createElement("table");
    	tabela.id = "tabelaBD";
    }
    if(tipo == "produto"){
    	tabela.innerHTML = "<thead>" +
    						  "<tr> " +
    							  "<th>Nome do produto</th>" + 
    							  "<th>Descrição</th>" + 
    							  "<th>Unidade de medida</th>" + 
    							  "<th>Valor</th>" + 
    							  "<th>Quantidade em estoque</th>" + 
    							  "<th>Ponto de aviso</th>" + 
    						  "</tr>" + 
    						"</thead>" +
    						"<tbody>";
    }
    else {
    	tabela.innerHTML = "<thead>" + 
    							"<tr>" + 
    								"<th>Nome do insumo</th>" + 
    								"<th>Finalidade</th>" + 
    								"<th>Valor unitário</th>" + 
    								"<th>Quantidade em estoque</th>" + 
    								"<th>Ponto de aviso</th>" + 
    							"</tr>" + 
    						"</thead>" +
    						"<tbody>";
    }
    
    var itens;
	for(item of itens){
		if(item.tipo == tipo){
			tabela.innerHTML += "<tr>" + 
									"<td>" + item.nome + "</td>" + 
									"<td>" + item.descricao + "</td>" + 
									"<td>" + item.unMedida + "</td>" + 
									"<td>" + item.valorProduto + "</td>" + 
									"<td>" + item.estoque + "</td>" + 
									"<td>" + item.pontoAviso + "</td>" +
								"</tr>";
		}
		else{
			tabela.innerHTML += "<tr>" + 
									"<td>" + item.nome + "</td>" + 
									"<td>" + item.finalidade + "</td>" + 
									"<td>" + item.valorUnidade + "</td>" + 
									"<td>" + item.estoque + "</td>" + 
									"<td>" + item.pontoAviso + "</td>" +
								"</tr>";
		}
	}
	tabela.innerHTML += "</tbody>";
	document.querySelector(".conteudo").appendChild(tabela);
}
