/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

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
						if (itens[i].nomeProduto == "LEITE") {
							celula.innerHTML = "Leite";
						}
						else if (itens[i].nomeProduto == "CAFE_BOURBON") {
							celula.innerHTML = "Café Bourbon"
						}
						else if (itens[i].nomeProduto == "CAFE_ROBUSTA") {
							celula.innerHTML = "Café Robusta";
						}
						else {
							celula.innerHTML = "Café Arábica";
						}
						break;
						case 1:
						celula.innerHTML = (itens[i].descrProduto);
						break;
						case 2:
						celula.innerHTML = itens[i].unidMedProduto;
						break;
						case 3:
						celula.innerHTML = itens[i].valorUnitProduto;
						break;
						case 4:
						celula.innerHTML = itens[i].quantEstoqueProduto;
						if(itens[i].quantEstoqueProduto < itens[i].pontoAvisoProduto){
							celula.innerHTML += " <img src=\"imgs/ControleProducao/aviso1.png\" title=\"Estoque menor que o ponto de aviso!\" class=\"aviso\">";
						}
						else if(itens[i].quantEstoqueProduto == itens[i].pontoAvisoProduto){
							celula.innerHTML += " <img src=\"imgs/ControleProducao/aviso2.png\" title=\"Estoque igual ao ponto de aviso!\" class=\"aviso\">";
						}
						else {
							celula.style.border = "";
						}
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
						if(itens[i].quantEstoqueInsumo < itens[i].pontoAvisoInsumo){
							celula.innerHTML += " <img src=\"imgs/ControleProducao/aviso1.png\" title=\"Estoque menor que o ponto de aviso!\" class=\"aviso\">";
						}
						else if(itens[i].quantEstoqueInsumo == itens[i].pontoAvisoInsumo){
							celula.innerHTML += " <img src=\"imgs/ControleProducao/aviso2.png\" title=\"Estoque igual ao ponto de aviso!\" class=\"aviso\">";
						}
						else {
							celula.style.border = "";
						}
						break;
						case 4:
						celula.innerHTML = itens[i].pontoAvisoInsumo;
						break;
						case 5:
						celula.innerHTML = "<button id='btnEditarInsumo" + itens[i].idInsumo + "'>Editar</button><button id='btnRemoverInsumo" + itens[i].idInsumo + "'>Remover</button>"
						break;
					}

				}
			}
			linha.innerHTML += "<input type=\"hidden\" value=\"" + itens[i].idProduto + "\" class=\"idsProdutos\">";

		}
	}
	adicionarEventos();
}

function adicionarEventos() {
	var aux;
	var botoes = document.querySelectorAll("table button");
	for (botao of botoes) {
		aux = botao;
		if (botao.title == "") {
			if(botao.id.includes("Editar")){
				botao.addEventListener('click', function(e){ editarMercadoria(e.target.id); });
				botao.title = "Click aqui para editar";
			}
			else if(botao.id.includes("Remover")){
				botao.addEventListener('click', function(e){ removerMercadoria(e.target.id); });
				botao.title = "Click aqui para remover";
			}
		}
	}

}


function removerMercadoria(id){
	let url;
	funcaoCerteza(function (confirmar) {
			if (confirmar) {
				if(id.includes("Produto")){
					 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=produto&id=" + id.substring(17);;
					 Request.get(url).then(function(res) { console.log(res);	}).catch(function(erro){console.log(erro);});
					 document.querySelector("body").style.cursor = "progress";
					 setTimeout(function () {
					  	document.querySelector("body").style.cursor = "default";
							 fazRequisicaoTabela("produto");
					 }, 1000);
			 }
			 else{
				 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=insumo&id=" + id.substring(16);;
				 Request.get(url).then(function(res) { console.log(res);	}).catch(function(erro){console.log(erro);});
				 document.querySelector("body").style.cursor = "progress";
				 setTimeout(function () {
						document.querySelector("body").style.cursor = "default";
						 fazRequisicaoTabela("insumo");
				 }, 1000);
			 }
			}
	});


}

function editarMercadoria(id){
				if(id.includes("Produto")){
					var inpNomeProduto =	document.getElementById('inpNomeProduto');
					var inpDescricaoProduto =	document.getElementById('inpDescricaoProduto');
					inpDescricaoProduto.onfocus = function(){this.select()};
					var inpUnidadeMedidaProduto =	document.getElementById('inpUnidadeMedidaProduto');
					var inpValorProduto =	document.getElementById('inpValorProduto');
					inpValorProduto.onfocus = function(){this.select()};
					var inpQuantEstoqueProduto =	document.getElementById('inpQuantEstoqueProduto');
					inpQuantEstoqueProduto.onfocus = function(){this.select()};
					var inpPontoAvisoProduto =	document.getElementById('inpPontoAvisoProduto');
					inpPontoAvisoProduto.onfocus = function(){this.select()};
					var link = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&tipo=produto&id=" + id.substring(16);
					Request.get(link)
					.then(function(res) {
						inpNomeProduto.style.border = 'none';
						inpNomeProduto.style.cursor = 'no-drop';
						inpDescricaoProduto.value = res.descrProduto;
						inpUnidadeMedidaProduto.value = res.unidMedProduto;
						inpUnidadeMedidaProduto.style.border = 'none';
						inpUnidadeMedidaProduto.style.cursor = 'no-drop';
						inpUnidadeMedidaProduto.style.width = "8%";
						inpValorProduto.value = res.valorUnitProduto;
						inpQuantEstoqueProduto.value = res.quantEstoqueProduto;
						inpPontoAvisoProduto.value = res.pontoAvisoProduto;

						if (res.nomeProduto == "LEITE") {
							inpNomeProduto.value = "Leite";
							inpNomeProduto.style.width = "13%";
							inpUnidadeMedidaProduto.style.width = "5%";
						}else if (res.nomeProduto == "CAFE_BOURBON") {
							inpNomeProduto.value = "Café Bourbon"
							inpNomeProduto.style.width = "32%";
						}else if (res.nomeProduto == "CAFE_ROBUSTA") {
							inpNomeProduto.value = "Café Roubusta";
							inpNomeProduto.style.width = "33%";
						}else {
						inpNomeProduto.value = "Café Arabica";
						inpNomeProduto.style.width = "31%";
						}


					})
					.catch(function(erro){
					 console.log(erro);
					});
					editarProduto(function (confirmar) {
						if (confirmar) {
							funcaoCerteza(function (certeza) {
								 if (certeza) {
									 var produto = encapsulaDados("produto", "editar");
									 produto.idProduto = id.substring(16);
										url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(produto)+ "&operacao=atualizar&tipo=produto&id=" + id.substring(15);
										Request.get(url)
										.then(function(res) {
											console.log(res);

										})
										.catch(function(erro){
										 console.log(erro);
										});
									 document.querySelector("body").style.cursor = "progress";
									setTimeout(function () {
										 document.querySelector("body").style.cursor = "default";
											fazRequisicaoTabela("produto");
									}, 1000);
								 }
								 });
								}
					 });
			 }else{
					var inpNomeInsumo2 =	document.getElementById('inpNomeInsumo2');
					inpNomeInsumo2.onfocus = function(){this.select()};
					var inpFinalidadeInsumo2 =	document.getElementById('inpFinalidadeInsumo2');
					inpFinalidadeInsumo2.onfocus = function(){this.select()};
					var valorCompraInsumo2 =	document.getElementById('valorCompraInsumo2');
					valorCompraInsumo2.onfocus = function(){this.select()};
					var inpQuantEstoqueInsumo2 =	document.getElementById('inpQuantEstoqueInsumo2');
					inpQuantEstoqueInsumo2.onfocus = function(){this.select()};
					var inpPontoAvisoInsumo2 =	document.getElementById('inpPontoAvisoInsumo2');
					inpPontoAvisoInsumo2.onfocus = function(){this.select()};
					var link = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscar&tipo=insumo&id=" + id.substring(15);
					Request.get(link)
					.then(function(res) {
						inpNomeInsumo2.value = res.nomeInsumo;
						inpFinalidadeInsumo2.value = res.finalidadeInsumo;
						valorCompraInsumo2.value = res.valorCompraInsumo;
						inpQuantEstoqueInsumo2.value = res.quantEstoqueInsumo;
						inpPontoAvisoInsumo2.value = res.pontoAvisoInsumo;
					})
					.catch(function(erro){
					 console.log(erro);
					});

					 editarInsumo(function (confirmar) {
						 if (confirmar) {
							 funcaoCerteza(function (certeza) {
						 			if (certeza) {
										var insumo = encapsulaDados("insumo", "editar");
										insumo.idInsumo = id.substring(15);
										url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(insumo)+ "&operacao=atualizar&tipo=insumo&id=" + id.substring(15);
										Request.get(url)
										.then(function(res) {
										 console.log(res);

										})
										.catch(function(erro){
										console.log(erro);
										});
										document.querySelector("body").style.cursor = "progress";
										setTimeout(function () {
										 document.querySelector("body").style.cursor = "default";
											fazRequisicaoTabela("insumo");
										}, 1000);

						 			}

							});
						}
			 });
		 }
}


function funcaoCerteza(callback) {
		divModalCerteza.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnSimModalCerteza.onclick = function() { callback(true); };
    btnNaoModalCerteza.onclick = function() { callback(false); };
}

function editarInsumo(callback) {
		divModalEditarInsumo.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnConfirmarEditarInsumo.onclick = function() { callback(true); };
    btnCancelarEditarInsumo.onclick = function() { callback(false); };
}

function editarProduto(callback) {
		divModalEditarProduto.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnConfirmarEditarProduto.onclick = function() { callback(true); };
    btnCancelaEditarProduto.onclick = function() { callback(false); };
}
