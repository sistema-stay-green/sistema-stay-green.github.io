function criaTabela(itens, tipo){

		var sufixo = tipo ==  "produto" ? "Produtos" : "Insumos";
		var tabela = document.getElementById("tabela" + sufixo);
		var rows = tabela.insertRow(1);
		for (var i = 0; i < 6; i++) {
			var rows = tabela.insertRow(1);
		  var celula = rows.insertCell(i);
			celula.innerHTML = itens[i].nomeProduto;
		}


}
