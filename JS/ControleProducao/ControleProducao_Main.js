/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */


 var divModalEl = document.querySelector("#divModal");
 var divMascaraEl = document.querySelector("#divMascara");
 var divModalInsumo = document.querySelector('#divModalInsumo');
 var divModalInsumo2 = document.querySelector('#divModalInsumo2');
 var divModalCerteza = document.querySelector('#divModalCerteza');
 var divModalCerteza2 = document.querySelector('#divModalCerteza2');
 var divModalEditarProduto = document.querySelector('#divModalEditarProduto');
 var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
 var divModalEditarInsumo = document.querySelector('#divModalEditarInsumo');
 var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
 var divModalAvisos = document.querySelector('#divModalAvisos');
 var divModalAvisos2 = document.querySelector('#divModalAvisos2');
 var modalRelatorioHistoricoEl = document.querySelector("#modalRelatorioHistorico");
 var modalRelatorioProducaoEl = document.querySelector("#modalRelatorioProducao");
 var btnCriaRelatorioEl = document.querySelector("#btnCriaRelatorio");
 var btnFechaModalEl = document.querySelector("#btnFechaModal");
 var btnRelatorioHistoricoEl = document.querySelector("#btnRelatorioHistorico");
 var btnVoltaRelatorioHEl = document.querySelector("#btnVoltaRelatorioH");
 var btnFechaRelatorioHEl = document.querySelector("#btnFechaRelatorioH");
 var btnRelatorioProducaoEl = document.querySelector("#btnRelatorioProducao");
 var btnVoltaRelatorioPEl = document.querySelector("#btnVoltaRelatorioP");
 var btnFechaRelatorioPEl = document.querySelector("#btnFechaRelatorioP");
 var btnAbrirModalInsumo = document.querySelector('#btnAbrirModalInsumo');
 var btnFecharModalInsumo = document.querySelector('#btnFecharModalInsumo');
 var btnLimparModalInsumo = document.querySelector('#btnLimparModalInsumo');
 var btnSimModalCerteza = document.querySelector('#btnSimModalCerteza');
 var btnNaoModalCerteza = document.querySelector('#btnNaoModalCerteza');
 var btnCancelaEditarProduto = document.querySelector('#btnCancelaEditarProduto');
 var btnConfirmarEditarProduto = document.querySelector('#btnConfirmarEditarProduto');
 var btnCancelarEditarInsumo = document.querySelector('#btnCancelarEditarInsumo');
 var btnConfirmarEditarInsumo = document.querySelector('#btnConfirmarEditarInsumo');
 var selFiltroP = document.getElementById('selFiltroP');
 var selFiltroI = document.getElementById('selFiltroI');
 var tabelaLeite = document.getElementById('tabelaRelLeite');
 var tabelaCafeA= document.getElementById('tabelaRelCafeA');
 var tabelaCafeB = document.getElementById('tabelaRelCafeB');
 var tabelaCafeR = document.getElementById('tabelaRelCafeR');




 btnCriaRelatorioEl.addEventListener( 'click' , mostraDivModal );
 btnFechaModalEl.addEventListener( 'click' ,  mostraDivModal );
 btnRelatorioHistoricoEl.addEventListener( 'click' , mostraRelatorioHistorico );
 btnVoltaRelatorioHEl.addEventListener( 'click' , mostraRelatorioHistorico );
 btnFechaRelatorioHEl.addEventListener( 'click' , fechaRelatorioHistorico );
 btnRelatorioProducaoEl.addEventListener( 'click' , mostraRelatorioProducao );
 btnVoltaRelatorioPEl.addEventListener( 'click' , mostraRelatorioProducao );
 btnFechaRelatorioPEl.addEventListener( 'click' , fechaRelatorioProducao );
 btnAbrirModalInsumo.addEventListener( 'click' , abreInsumoModal );
 btnFecharModalInsumo.addEventListener( 'click' , fechaInsumoModal );
 btnLimparModalInsumo.addEventListener( 'click' , limpaInsumoModal );
 btnSimModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
 btnNaoModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
 btnCancelaEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
 btnConfirmarEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
 btnCancelarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
 btnConfirmarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
 btnVoltaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
 btnFechaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
 btnVoltaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );
 btnFechaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );
 selFiltroP.addEventListener( 'change' , filtrarTabelas );
 selFiltroI.addEventListener( 'change' , filtrarTabelas );




 function mostraDivModal() {
   divModalEl.classList.toggle("esconde");
   divModalEl.classList.toggle("posDivModal");
   divMascaraEl.classList.toggle("ocultar");
 }

 function mostraRelatorioHistorico() {
   divModalEl.classList.toggle("esconde");
   divModalEl.classList.toggle("posDivModal");
   modalRelatorioHistoricoEl.classList.toggle("esconde");
   modalRelatorioHistoricoEl.classList.toggle("posDivModal");
 }

 function fechaRelatorioHistorico() {
   modalRelatorioHistoricoEl.classList.toggle("esconde");
   modalRelatorioHistoricoEl.classList.toggle("posDivModal");
   divMascaraEl.classList.toggle("ocultar");
 }

 function mostraRelatorioProducao() {
   divModalEl.classList.toggle("esconde");
   divModalEl.classList.toggle("posDivModal");
   modalRelatorioProducaoEl.classList.toggle("esconde");
   modalRelatorioProducaoEl.classList.toggle("posDivModal");
 }

 function fechaRelatorioProducao() {
   modalRelatorioProducaoEl.classList.toggle("esconde");
   modalRelatorioProducaoEl.classList.toggle("posDivModal");
   divMascaraEl.classList.toggle("ocultar");
 }

 function abreInsumoModal() {
   divModalInsumo.classList.remove("esconde");
   divMascaraEl.classList.remove("ocultar");
 }

 function fechaInsumoModal() {
   divModalInsumo.classList.add("esconde");
   divMascaraEl.classList.add("ocultar");
 }

 function limpaInsumoModal() {
   var inputs = document.querySelectorAll('input');
   for (var i = 0; i < inputs.length; i++) {
       if (inputs[i].clientHeight > 0) {
           inputs[i].value = "";
       }
   }
 }

 function funcaoModalCerteza() {
   divModalCerteza.classList.add("esconde");
   divMascaraEl.classList.add("ocultar");
 }

 function funcaoEditarProduto(e) {
 if (e) {
   if (e.target.id == "btnCancelaEditarProduto") {
     divModalEditarProduto.classList.add("esconde");
     divMascaraEl.classList.add("ocultar");
   }else {
     if (checarInputs()) {
       divModalEditarProduto.classList.add("esconde");
       divMascaraEl.classList.add("ocultar");
     }
   }
 } else {
     if (checarInputs()) {
       divModalEditarProduto.classList.add("esconde");
       divMascaraEl.classList.add("ocultar");
       return true;
     }else {
       return false;
     }
   }
 }

 function funcaoEditarInsumo(e){
 if (e) {
   if (e.target.id == "btnCancelarEditarInsumo") {
     divModalEditarInsumo.classList.add("esconde");
     divMascaraEl.classList.add("ocultar");
   }else {
     if (checarInputs()) {
       divModalEditarInsumo.classList.add("esconde");
       divMascaraEl.classList.add("ocultar");
     }
   }
 } else {
     if (checarInputs()) {
       divModalEditarInsumo.classList.add("esconde");
       divMascaraEl.classList.add("ocultar");
       return true;
     }else {
       return false;
     }
   }
 }


 function limpaRelatorio(){
   var aux = tabelaLeite.innerHTML.slice(0, tabelaLeite.innerHTML.indexOf("<tbody>"));
   aux += "<tbody>" +
        "<tr>" +
        "</tr>" +
        "</tbody>"
   tabelaLeite.innerHTML = aux;
   var aux = tabelaCafeA.innerHTML.slice(0, tabelaCafeA.innerHTML.indexOf("<tbody>"));
   aux += "<tbody>" +
        "<tr>" +
        "</tr>" +
        "</tbody>"
   tabelaCafeA.innerHTML = aux;
   var aux = tabelaCafeB.innerHTML.slice(0, tabelaCafeB.innerHTML.indexOf("<tbody>"));
   aux += "<tbody>" +
        "<tr>" +
        "</tr>" +
        "</tbody>"
   tabelaCafeB.innerHTML = aux;
   var aux = tabelaCafeR.innerHTML.slice(0, tabelaCafeR.innerHTML.indexOf("<tbody>"));
   aux += "<tbody>" +
        "<tr>" +
        "</tr>" +
        "</tbody>"
   tabelaCafeR.innerHTML = aux;
   var aux = tabelaInsumo.innerHTML.slice(0, tabelaInsumo.innerHTML.indexOf("<tbody>"));
   aux += "<tbody>" +
        "<tr>" +
        "</tr>" +
        "</tbody>"
   tabelaInsumo.innerHTML = aux;
 }

 function filtrarTabelas(e) {
   if (e.target.id == "selFiltroP") {
     var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=filtro&tipo=produto&id=" + e.target.value;
     Request.get(url)
     .then(function(res) {
     console.log(res);
      criaTabela(res, "produto");
      avisos("SUCESSO");
     })
     .catch(function(erro){
       avisos("FALHA");
     });
   }else {
     var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=filtro&tipo=insumo&id=" + e.target.value;
     Request.get(url)
     .then(function(res) {
      criaTabela(res, "insumo");
      avisos("SUCESSO");
     })
     .catch(function(erro){
       avisos("FALHA");
     });
   }
 }

 /**
  * @author Diego Demétrio e Mei Fagundes
  * Abre uma janela para impressão dos relatórios
  * @param relatorio
  */
 document.querySelector("#btnPrintProducao").onclick = function () {
   printRelatorio("producao");
 };
 document.querySelector("#btnPrintPeriodo").onclick = function () {
   printRelatorio("periodo");

 }
 function printRelatorio(relatorio) {
     let aux;
     let content;
     if(relatorio == "periodo"){
       content = document.querySelector("#tabelaRelLeite").outerHTML +
                 document.querySelector("#tabelaRelCafeR").outerHTML +
                 document.querySelector("#tabelaRelCafeB").outerHTML +
                 document.querySelector("#tabelaRelCafeA").outerHTML;
     }
     else if(relatorio == "producao"){
       content = document.querySelector("#modalRelatorioProducao").cloneNode(true);
       aux = content.firstElementChild;
       content.innerHTML = aux.outerHTML;
       content = content.outerHTML;
     }

     let printWindow = window.open('', 'Print', 'height=768,width=1024');
     printWindow.document.write('<html><head><title>Print</title>');
     printWindow.document.write('<link rel="stylesheet" type="text/css" href="CSS/ControleProducao/ControleProducao_estilo.css"/>');
     printWindow.document.write('</head><body onafterprint="self.close()">');
     printWindow.document.write(content);
     printWindow.document.write('<script type="text/javascript">' + 'window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 2000) };' + '</script>');
     printWindow.document.write('</body></html>');

     printWindow.document.close();
     printWindow.focus();
 }



 /**
 * @author Diego Demétrio
 * Chama a função que cria as tabelas e atrela um evento ao botão de registrar insumos
 */
 window.onload = function () {
    fazRequisicaoTabela("produto");
    fazRequisicaoTabela("insumo");
    var produtoTabela = document.getElementById("secProduto");
    var insumoTabela = document.getElementById("secInsumo");
    var produto;
    var promises;
    document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
        if (checarInputs()) {
            insumo = encapsulaDados("insumo", "adicionar");
            insumo.fazRequisicao();
						desativarBotoes(true);
            setTimeout(function () {
							desativarBotoes(false);
                fazRequisicaoTabela("insumo");
								avisos("SUCESSO_ADICIONAR");
                limparInputs();
            }, 1000);
        }
    });
 };

 function mostraTabela(tipo, acao){
   let sufixo = (tipo ==  "produto") ? "Produtos" : "Insumos";
   let tabela = document.querySelector("#tab" + sufixo + "Registrados");
   let mensagem = document.querySelector("#mensagem" + sufixo);
   if(acao == "mostrar"){
     mensagem.classList.add("ocultar");
   }
   else if(acao == "ocultar"){
     mensagem.classList.remove("ocultar");
   }else{
		 mensagem.classList.remove("ocultar");
		 avisos("FALHA");
	 }
 }

 /**
 * @author Diego Demétrio
 * Faz a requisição AJAX para criar as tabelas
 * @param tipo produto ou insumo
 */
 function fazRequisicaoTabela(tipo){
    let url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=" + tipo;
    Request.get(url)
           .then(function(res){
            criaTabela(res, tipo);

           })
           .catch(function(error){
             mostraTabela(tipo, "ocultar");
						 avisos("FALHA");
           });
 }

 /**
 * @author Diego Demétrio
 * Cria um objeto produto ou insumo com os dados JSON
 * @param tipo produto ou insumo
 * @param obj objeto em JSON
 * @return item(objeto insumo ou produto)
 */
 function encapsulaDadosJSON(tipo, obj){
    var item;
    if(tipo == "produto"){
        item = new Produto();
        item._nomeProduto = obj._nomeProduto;
        item._descrProduto = obj._descrProduto;
        item._unidMedProduto = obj._unidMedProduto;
        item._valorUnitProduto = obj._valorUnitProduto;
        item._quantEstoqueProduto = obj._quantEstoqueProduto;
        item._pontoAvisoProduto = obj._pontoAvisoProduto;
        item.toJSON();
    }
    else {
        item = new Insumo();
        item._nomeInsumo = obj.nomeInsumo;
        item._finalidadeInsumo = obj.finalidadeInsumo;
        item._valorCompraInsumo = obj.valorCompraInsumo;
        item._quantEstoqueInsumo = obj.quantEstoqueInsumo;
        item._pontoAvisoInsumo = obj.pontoAvisoInsumo;
        item.toJSON();
    }
    return item;
 }

 /**
  * @author Diego Demétrio
  * Cria um objeto produto ou insumo com os dados das inputs
  * @param tipo insumo ou produto
  * @param operacao adicionar ou editar
  * @return item(objeto insumo ou produto)
 */
 function encapsulaDados(tipo, operacao) {
    var item;
    if (operacao == "adicionar") {
              item = new Insumo();
              item.nomeInsumo = document.querySelector("#inpNomeInsumo").value;
              item.finalidadeInsumo = document.querySelector("#inpFinalidadeInsumo").value;
              item.valorCompraInsumo = parseFloat(document.querySelector("#valorCompraInsumo").value);
              item.quantEstoqueInsumo = parseInt(document.querySelector("#inpQuantEstoqueInsumo").value);

              //verifica se há um ponto de aviso
              let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo").value);
              item.pontoAvisoInsumo = (aux == null) ? "" : aux;
    }else {
      if(tipo == "produto"){
              item = new Produto();
              let nome  = document.querySelector("#inpNomeProduto").value;
              if (nome == "Leite") {
                  item.nomeProduto = "LEITE";
              }else if (nome == "Café Bourbon") {
                  item.nomeProduto = "CAFE_BOURBON"
              }else if (nome == "Café Robusta") {
                  item.nomeProduto = "CAFE_ROBUSTA";
              }else {
                  item.nomeProduto = "CAFE_ARABICA";
              }
              item.descrProduto = document.querySelector("#inpDescricaoProduto").value;
              item.unidadeMedidaProduto = document.querySelector("#inpUnidadeMedidaProduto").value;
              item.valorUnitProduto = parseFloat(document.querySelector("#inpValorProduto").value);
              item.quantEstoqueProduto = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);

              //verifica se há um ponto de aviso (valor opcional);
              let aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
              item.pontoAvisoProduto = (aux == null) ? "" : aux;
      }
      else{
              item = new Insumo();
              item.nomeInsumo = document.querySelector("#inpNomeInsumo2").value;
              item.finalidadeInsumo = document.querySelector("#inpFinalidadeInsumo2").value;
              item.valorCompraInsumo = parseFloat(document.querySelector("#valorCompraInsumo2").value);
              item.quantEstoqueInsumo = parseInt(document.querySelector("#inpQuantEstoqueInsumo2").value);

              //verifica se há um ponto de aviso
              let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo2").value);
              item.pontoAvisoInsumo = (aux == null) ? "" : aux;
      }
    }
    return item;
 }





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
	if(itens != null && itens.resultado != "FALHA") {
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
	}else if (itens.resultado == "FALHA") {
		mostraTabela(tipo, "avisar");
	}else {
		console.log(itens);
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
							 desativarBotoes(true);
		 					 setTimeout(function () {
							 		avisos("SUCESSO_REMOVER");
		 					 		desativarBotoes(false);
		 							fazRequisicaoTabela("produto");
		 					 }, 1000);
						 }
					 }).catch(function(erro){
						 avisos("ERRO_REMOVER");
					 });

			 }
			 else{
				 url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=remover&tipo=insumo&id=" + id.substring(16);;
				 Request.get(url)
				 .then(function(res) {
					 desativarBotoes(true);
					 setTimeout(function () {
					 	desativarBotoes(false);
						avisos("SUCESSO_REMOVER");
						fazRequisicaoTabela("insumo");
					 }, 1000);

				 })
				 .catch(function(erro){
					 avisos("ERRO_REMOVER")
				 });
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
	divModalAvisos.classList.remove("esconde");
		switch (i) {
				case "SUCESSO":
					divModalAvisos2.innerHTML = "Operação realizada com sucesso!!";
					divModalAvisos2.style.color = "green";
					break;

					case "SUCESSO_ADICIONAR":
						divModalAvisos2.innerHTML = "Mercadoria adicionada ao banco de dados com sucesso!!";
						divModalAvisos2.style.color = "green";
						break;

						case "SUCESSO_REMOVER":
							divModalAvisos2.innerHTML = "Mercadoria removida do banco de dados com sucesso!!";
							divModalAvisos2.style.color = "green";
							break;

				case "INPUT_INVALIDO":
					divModalAvisos2.innerHTML = "<p>Por favor, preencha os campos obrigatórios para continuar...</p>";
					divModalAvisos2.style.color = "red";
					break;

				case "FALHA":
					divModalAvisos2.style.color = "red";
					if (res) {
						if (res.target.statusText) {
								divModalAvisos2.innerHTML = "<p>Houve uma falha</p><p>Motivo:"+ res.target.statusText +"</p>";
						}
					}else {
						divModalAvisos2.innerHTML = "<p>Houve uma falha.</p>";
					}
					break;

					case "FALHA_RELATORIO":
						divModalAvisos2.style.color = "red";
						divModalAvisos2.innerHTML = "<p>Não foram encontradas transações nesse período.</p>";
						break;

				case "ERRO_REMOVER":
					divModalAvisos2.innerHTML = "<p>Houve uma falha durante a remoção desta mercadoria</p>";
					divModalAvisos2.style.color = "red";
					break;

				case "ERRO_ADICIONAR":
					divModalAvisos2.innerHTML = "<p>Houve uma falha durante a a edição ou adição desta mercadoria</p>";
					divModalAvisos2.style.color = "red";
					break;

				default:
					break;
		}
		setTimeout(function(){ divModalAvisos.style.top = "110%"; divModalAvisos.style.opacity = "0"; }, 3000);
		setTimeout(function(){ 		divModalAvisos.classList.add("esconde"); divModalAvisos.style.opacity = "1"; divModalAvisos.style.top = "70%"; }, 3200);
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
					 Request.get(url)
					 .then(function(res) {
						 desativarBotoes(true);
						setTimeout(function () {
						 desativarBotoes(false);
						  avisos("SUCESSO_REMOVER");
						 fazRequisicaoTabela("insumo");
						}, 1000);
					 })
					 .catch(function(erro){
						 avisos("ERRO_REMOVER")
					 });
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
						avisos("ERRO_ADICIONAR");
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
												desativarBotoes(true);
	 										setTimeout(function () {
	 											desativarBotoes(false);
												avisos("SUCESSO_ADICIONAR");
	 											fazRequisicaoTabela("produto");
	 										}, 1000);

											})
											.catch(function(erro){
											 avisos("ERRO_ADICIONAR");
											});
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
						valorCompraInsumo2.value = res.valorCompraInsumo == -1 ? "" : res.valorCompraInsumo
						inpQuantEstoqueInsumo2.value = res.quantEstoqueInsumo == -1 ? "" : res.quantEstoqueInsumo
						inpPontoAvisoInsumo2.value = res.pontoAvisoInsumo == -1 ? "" : res.pontoAvisoInsumo
					})
					.catch(function(erro){
					 avisos("FALHA");
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

												desativarBotoes(true);
	  										setTimeout(function () {
													avisos("SUCESSO_ADICIONAR");
	  										 desativarBotoes(false);
	  											fazRequisicaoTabela("insumo");
	  										}, 1000);

  										})
  										.catch(function(erro){
  											avisos("ERRO_ADICIONAR");
  										});


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
