function criaTabela(itens, tipo){
	var sufixo = (tipo ==  "produto") ? "Produtos" : "Insumos";
	var tabela = document.querySelector("#tab" + sufixo + "Registrados");
	var aux = tabela.innerHTML.slice(0, tabela.innerHTML.indexOf("<tbody>"));
	aux += "<tbody>" +
			 "<tr>" + 
			 "</tr>" + 
		   "</tbody>"
	tabela.innerHTML = aux;
	
	if(itens != null) {
		for (var i = 0; i < itens.length; i++) {
			var linha = tabela.insertRow(i+1);
			if(tipo == "produto"){

				for (var j = 0; j < 7; j++) {

					var celula = linha.insertCell(j);

					switch (j) {
						case 0:
						celula.innerHTML = itens[i].nomeProduto;
						break;
						case 1:
						celula.innerHTML = itens[i].descrProduto;
						break;
						case 2:
						celula.innerHTML = itens[i].unidMedProduto;
						break;
						case 3:
						celula.innerHTML = itens[i].valorUnitProduto;
						break;
						case 4:
						celula.innerHTML = itens[i].quantEstoqueProduto;
						break;
						case 5:
						celula.innerHTML = itens[i].pontoAvisoProduto;
						break;
						case 6:
						celula.innerHTML = "<button id='btnEditarProduto" + itens[i].idProduto + "'>Editar</button><button id='btnRemoverProduto" + itens[i].idProduto + "'>Remover</button>"
						break;

					}
				}
			}
			else {
				for(var j = 0; j < 6; j++){
					
					var celula = linha.insertCell(j);

					switch (j) {
						case 0:
						celula.innerHTML = itens[i].nomeInsumo;
						break;
						case 1:
						celula.innerHTML = itens[i].finalidadeInsumo;
						break;
						case 2:
						celula.innerHTML = itens[i].valorCompraInsumo;
						break;
						case 3:
						celula.innerHTML = itens[i].quantEstoqueInsumo;
						break;
						case 4:
						celula.innerHTML = itens[i].pontoAvisoInsumo;
						break;
						case 5:
						celula.innerHTML = "<button id='btnEditarInsumo" + itens[i].idInsumo + "'>Editar</button><button id='btnRemoverInsumo" + itens[i].idProduto + "'>Remover</button>"
						break;
					}

				}
			}
			linha.innerHTML += "<input type=\"hidden\" value=\"" + itens[i].idProduto + "\" class=\"idsProdutos\">";
			
		}
	}
	adicionarEventos(itens);
}
var aux;
function adicionarEventos(vet) {
	var itens = vet;
	var botoes = document.querySelectorAll("table button");
	for (botao of botoes) {
		aux = botao;
		if(botao.id.includes("Editar")){
			botao.addEventListener('click', function(){ editaLinha(aux); })
		}
		else if(botao.id.includes("Remover")){
			botao.addEventListener('click', function(){ removeLinha(aux) });
		}
	}

}

function removeLinha(botao){
	let id = botao.id.slice(17, botao.id.length);
	let url; 
	console.log(botao);
	if(botao.id.includes("Produto")){
		//remove do BD
		url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=produto&id" + id;
		Request.get(url).then(function(res) { console.log(res);	}).catch(function(erro){console.log(erro);});
		fazRequisicaoTabela("produto");
	}
	else{
		//remove do BD
		url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=insumo&id" + id;
		Request.get(url).then(function(res) { console.log(res);	}).catch(function(erro){console.log(erro);});
		fazRequisicaoTabela("insumo");
	}

}
