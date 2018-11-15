function criaTabela(itens, tipo){
	var sufixo = (tipo ==  "produto") ? "Produtos" : "Insumos";
	console.log(sufixo);
	var tabela = document.querySelector("#tab" + sufixo + "Registrados");
	if(tipo == "produto") {
		tabela.innerHTML = "<thead>"
												+ "<tr>"
												+ "<th>Nome do produto</th>"
												+ "<th>Descrição</th>"
												+ "<th>Unidade de medida</th>"
												+ "<th>Valor</th>"
												+ "<th>Quantidade em estoque</th>"
												+ "<th>Ponto de aviso</th>"
												+ "<th>Opções</th>"
												+ "</tr>"
												+ "</thead>"
												+ "<tbody>"
												+ "<tr>"
												+ "</tr>"
												+ "</tbody>";
	}

	else {
		tabela.innerHTML =  "<thead>"
												+ "<tr>"
												+ "<th>Nome do insumo</th>"
												+ "<th>Finalidade</th>"
												+ "<th>Valor unitário/th>"
												+ "<th>Quantidade em estoque</th>"
												+ "<th>Ponto de aviso</th>"
												+ "<th>Opções</th>"
												+ "</tr>"
												+ "</thead>"
												+ "<tbody>"
												+ "<tr>"
												+ "</tr>"
												+ "</tbody>";
	}
	console.log(itens);
	if(itens != null) {
		for (var i = 0; i < itens.length; i++) {
			var linha = tabela.insertRow(i+1);
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
					celula.innerHTML = "<button id='btnEditar"+itens[i].idProduto+"'>Editar</button><button id='btnRemover"+itens[i].idProduto+"'>Remover</button>"
					break;

				}
			}
		}
	}
	adicionarEventos(itens);
}

function adicionarEventos(vet) {
	var itens = vet;
	var botoes = document.querySelectorAll("table button");
	for (var i = 0; i < botoes.length; i++) {
		if (botoes[i].id.match(/btnRemover*/)) {
			botoes[i].addEventListener('click', function () {

			})
		}else {
			botoes[i].addEventListener('click', function () {

			})

		}
	}

}
