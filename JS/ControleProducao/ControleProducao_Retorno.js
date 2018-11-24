/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

/**
* @author Diego Demétrio e Arthur Marcolino
* Cria a tabela com os dados do BD
* @param itens array recebido do servlet (Ajax)
* @param tipo produto ou insumo
*/
function criaTabela(itens, tipo){
	var sufixo = (tipo ==  "produto") ? "Produtos" : "Insumos";
	var tabela = document.querySelector("#tab" + sufixo + "Registrados");
	if (tabela.rows.length > 2) {
		for (var i = 0; 2 != tabela.rows.length; i++) {
			tabela.deleteRow(1);
		}
	}
	/* Para testes
	itens = [];
	itens[0] = {
		nomeProduto: "LEITE",
		descrProduto: "jair",
		unidMedProduto: "L",
		valorUnitProduto: "50",
		quantEstoqueProduto: "500",
		pontoAvisoProduto: "100"
	};
	itens[1] = {
		nomeProduto: "CAFE_BOURBON",
		descrProduto: "jair",
		unidMedProduto: "KG",
		valorUnitProduto: "50",
		quantEstoqueProduto: "500",
		pontoAvisoProduto: "100"
	}
	itens[2] = {
		nomeProduto: "CAFE_ROBUSTA",
		descrProduto: "jair",
		unidMedProduto: "KG",
		valorUnitProduto: "50",
		quantEstoqueProduto: "500",
		pontoAvisoProduto: "100"
	}
	itens[3] = {
		nomeProduto: "CAFE_ARABICA",
		descrProduto: "jair",
		unidMedProduto: "KG",
		valorUnitProduto: "50",
		quantEstoqueProduto: "49",
		pontoAvisoProduto: "50"
	}
	*/
	if(itens != null) {
		mostraTabela(tipo, "mostrar");
		for (var i = 0; i < itens.length; i++) {
			var linha = tabela.insertRow(i+1);
			itens[i].quantEstoqueProduto = parseInt(itens[i].quantEstoqueProduto);
			itens[i].pontoAvisoProduto = parseInt(itens[i].pontoAvisoProduto);
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
						celula.style.wordBreak = "break-all";
						break;
						case 2:
						celula.innerHTML = itens[i].unidMedProduto;
						break;
						case 3:
						celula.innerHTML = itens[i].valorUnitProduto;
						break;
						case 4:
						celula.innerHTML = itens[i].quantEstoqueProduto;
						if (itens[i].pontoAvisoProduto != 0) {
							if(itens[i].quantEstoqueProduto < itens[i].pontoAvisoProduto){
								celula.innerHTML += " <img src=\"imgs/ControleProducao/estoqueMenor.png\" title=\"Estoque menor que o ponto de aviso!\" class=\"aviso\">";
							}
							else if(itens[i].quantEstoqueProduto == itens[i].pontoAvisoProduto){
								celula.innerHTML += " <img src=\"imgs/ControleProducao/estoqueBaixo.png\" title=\"Estoque igual ao ponto de aviso!\" class=\"aviso\">";
							}
							else if(((itens[i].quantEstoqueProduto) * 0.9) <= itens[i].pontoAvisoProduto){
								celula.innerHTML += " <img src=\"imgs/ControleProducao/estoquePerto.png\" title=\"Estoque próximo ao ponto de aviso!\" class=\"aviso\">";
							}
						}
						break;
						case 5:
						celula.innerHTML = itens[i].pontoAvisoProduto;
						break;
						case 6:
						celula.innerHTML = "<button id='btnEditarProduto" + itens[i].idProduto + "'>Atualizar</button><button id='btnRemoverProduto" + itens[i].idProduto + "'>Descartar</button>"
						break;

					}
				}
			}
			else {
				if (itens[i].valorCompraInsumo >= 0) {
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
							if (itens[i].pontoAvisoInsumo != 0) {
								if(itens[i].quantEstoqueInsumo < itens[i].pontoAvisoInsumo){
									celula.innerHTML += " <img src=\"imgs/ControleProducao/estoqueMenor.png\" title=\"Estoque menor que o ponto de aviso!\" class=\"aviso\">";
								}
								else if(itens[i].quantEstoqueInsumo == itens[i].pontoAvisoInsumo){
									celula.innerHTML += " <img src=\"imgs/ControleProducao/estoqueBaixo.png\" title=\"Estoque igual ao ponto de aviso!\" class=\"aviso\">";
								}
								else if(((itens[i].quantEstoqueInsumo) - (itens[i].quantEstoqueInsumo) * 0.25) <= itens[i].pontoAvisoInsumo){
									celula.innerHTML += " <img src=\"imgs/ControleProducao/estoquePerto.png\" title=\"Estoque próximo ao ponto de aviso!\" class=\"aviso\">";
								}
							}
							break;
							case 4:
							celula.innerHTML = itens[i].pontoAvisoInsumo;
							break;
							case 5:
							celula.innerHTML = "<button id='btnEditarInsumo" + itens[i].idInsumo + "'>Atualizar</button><button id='btnRemoverInsumo" + itens[i].idInsumo + "'>Descartar</button><button id='btnDefinitivoInsumo" + itens[i].idInsumo + "'>Deletar</button>"
							break;
						}
					}
				}else{
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
							celula.innerHTML = "-";
							break;
							case 3:
							celula.innerHTML = "-";
							break;
							case 4:
							celula.innerHTML = "-";
							break;
							case 5:
							celula.innerHTML = "<button id='btnEditarInsumo" + itens[i].idInsumo + "'>Atualizar</button><button id='btnRemoverInsumo" + itens[i].idInsumo + "'>Descartar</button><button id='btnDefinitivoInsumo" + itens[i].idInsumo + "'>Deletar</button>"
							break;
						}

					}
				}

			}
		}
	}

	else if(itens == null){

		mostraTabela(tipo, "ocultar");
	}
	adicionarEventos();
}

/**
* @author Arthur Marcolino
* Atrela eventos a cada um dos botões da tabela
*/
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
			}else if(botao.id.includes("Definitivo")){
				botao.addEventListener('click', function(e){ deletarMercadoria(e.target.id); });
				botao.title = "Click aqui para deletar";
			}
		}
	}

}

/**
* @author Arthur Marcolino
* Remove alguma mercadoria baseado em seu id
* @param id
*/
function removerMercadoria(id){
	let url;
	funcaoCerteza(function (confirmar) {
			if (confirmar) {
				if(id.includes("Produto")){
					 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=produto&id=" + id.substring(17);
					 Request.get(url).then(function(res){
						 if (res.resultado == "SUCESSO") {

						 }
					 }).catch(function(erro){
						 console.log(erro);
					 });
					 desativarBotoes(true);
					 setTimeout(function () {
					 		desativarBotoes(false);
							fazRequisicaoTabela("produto");
					 }, 1000);
			 }
			 else{
				 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=insumo&id=" + id.substring(16);;
				 Request.get(url).then(function(res) { 	}).catch(function(erro){console.log(erro);});
				 desativarBotoes(true);
				 setTimeout(function () {
				 	desativarBotoes(false);
					fazRequisicaoTabela("insumo");
				 }, 1000);
			 }
			}
	});

}

/**
* @author Arthur Marcolino
* Remove alguma mercadoria baseado em seu id
* @param i
* @param res
*/
function avisos(i, res) {
	divModalAvisos2.innerHTML = "";
	divModalAvisos2.style.color = "black";
	divModalAvisos2.classList.remove("esconde");
	divModalAvisos.classList.remove("esconde");
		switch (i) {
				case "SUCESSO":
						divModalAvisos2.innerHTML = "Operação realizada com sucesso!!";
						divModalAvisos2.style.color = "green";
						break;
				case "INPUT_INVALIDO":
						divModalAvisos2.innerHTML = "<p>Por favor, preencha os campos obrigatórios para continuar...</p>";
						divModalAvisos2.style.color = "red";

						divModalAvisos.style.right = "10px";
;
						break;
				case "FALHA":
						divModalAvisos2.style.color = "red";
						if (res.target.statusText) {
							divModalAvisos2.innerHTML = "<p>Houve uma falha</p><p>Motivo:"+ res.target.statusText +"</p>";
						}else {
							 divModalAvisos2.innerHTML = "<p>Houve uma falha</p><p>Motivo: Falha ao conectar com banco de dados.</p>";
						}
						break;
				case "FALHA":
						divModalAvisos2.innerHTML = "<p>Houve uma falha</p>";
						divModalAvisos2.style.color = "red";
						break;
				default:
						break;
		}
		setTimeout(function(){ divModalAvisos2.classList.add("esconde"); divModalAvisos.classList.add("esconde"); }, 5000);
}

/**
* @author Arthur Marcolino
* Checa se todas as inputs foram preenchidas
* @param i
* @param res
*/
function checarInputs() {
		var inputs = document.querySelectorAll('input');
		var cont = 0;
		for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].clientHeight > 0) {
						if (inputs[i].value === "" || inputs[i].validity.valid === false || inputs[i].value === "NaN") {
								inputs[i].style.border = "1px solid red";
								cont++;
						} else {
								inputs[i].style.border = "none";
								if (inputs[i].readOnly == false) {
									inputs[i].style.borderBottom = "1px solid black";
								}
						}
				}
		}
		if (cont > 0) {
				cont = 0;
				avisos("INPUT_INVALIDO");
				return false;
		} else {
				cont = 0;
				return true;
		}
}

/**
* @author Arthur Marcolino
* Limpa todas as inputs
*/
function limparInputs() {
		var inputs = document.querySelectorAll('input');
		var cont = 0;
		for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].clientHeight > 0) {
						inputs[i].value = "";
				}
		}
}


/**
* @author Arthur Marcolino
* Deleta um insumo baseado em seu id
* @param id
*/
	function deletarMercadoria(id){
		let url;
		funcaoCerteza(function (confirmar) {
				if (confirmar) {
					 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=removerDefinitivo&id=" + id.substring(19);
					 Request.get(url).then(function(res) { 	}).catch(function(erro){console.log(erro);});
					 desativarBotoes(true);
					 setTimeout(function () {
					 	desativarBotoes(false);
						fazRequisicaoTabela("insumo");
					 }, 1000);
				}
		});
}

/**
* @author Arthur Marcolino
* Edita um produto ou insumo baseado em seu id
* @param id
*/
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
							inpNomeProduto.value = "Café Robusta";
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
							if (funcaoEditarProduto()) {
								funcaoCerteza(function (certeza) {
									 if (certeza) {
										 var produto = encapsulaDados("produto", "editar");
										 produto.idProduto = id.substring(16);
											url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(produto)+ "&operacao=atualizar&tipo=produto&id=" + id.substring(16);
											Request.get(url)
											.then(function(res) {

											})
											.catch(function(erro){
											 console.log(erro);
											});
										 desativarBotoes(true);
										setTimeout(function () {
											desativarBotoes(false);
											fazRequisicaoTabela("produto");
										}, 1000);
									 }
									 });
							}
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
							 if (funcaoEditarInsumo()) {
								 funcaoCerteza(function (certeza) {
  						 			if (certeza) {
  										var insumo = encapsulaDados("insumo", "editar");
  										insumo.idInsumo = id.substring(15);
  										url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(insumo)+ "&operacao=atualizar&tipo=insumo&id=" + id.substring(15);
  										Request.get(url)
  										.then(function(res) {

  										})
  										.catch(function(erro){
  										console.log(erro);
  										});
  										desativarBotoes(true);
  										setTimeout(function () {
  										 desativarBotoes(false);
  											fazRequisicaoTabela("insumo");
  										}, 1000);

  						 			}

  							});
							 }
						}
			 });
		 }
}

/**
* @author Arthur Marcolino
* Pede confirmação ao usuário
* @param callback
*/
function funcaoCerteza(callback) {
		divModalCerteza.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnSimModalCerteza.onclick = function() { callback(true); };
    btnNaoModalCerteza.onclick = function() { callback(false); };
}

/**
* @author Arthur Marcolino
* Abre a modal de edição do insumo
* @param callback
*/
function editarInsumo(callback) {
		divModalEditarInsumo.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnConfirmarEditarInsumo.onclick = function() { callback(true); };
    btnCancelarEditarInsumo.onclick = function() { callback(false); };
}

/**
* @author Arthur Marcolino
* Abre a modal de edição do produto
* @param callback
*/
function editarProduto(callback) {
		divModalEditarProduto.classList.remove("esconde");
		divMascaraEl.classList.remove("ocultar");
    btnConfirmarEditarProduto.onclick = function() { callback(true); };
    btnCancelaEditarProduto.onclick = function() { callback(false); };
}

/**
* @author Arthur Marcolino
* Ativa ou desativa botões se alguma input não foi preenchida
* @param valor
*/
function desativarBotoes(valor) {
	var botoes = document.querySelectorAll("button");
	var selects =  document.querySelectorAll("select");
	var body = document.querySelector("body");
	if (valor) {
		for (var i = 0; i < botoes.length; i++) {
			 botoes[i].disabled = true;
			 botoes[i].style.cursor = "no-drop";
			 body.style.cursor = "wait";
		}
		for (var i = 0; i < selects.length; i++) {
			selects[i].disabled = true;
			selects[i].style.cursor = "no-drop";
		}
	}else {
		for (var i = 0; i < botoes.length; i++) {
			 botoes[i].disabled = false;
			 botoes[i].style.cursor = "pointer";
			 body.style.cursor = "default";
		}
		for (var i = 0; i < selects.length; i++) {
			selects[i].disabled = false;
			selects[i].style.cursor = "pointer";
		}
	}
}
