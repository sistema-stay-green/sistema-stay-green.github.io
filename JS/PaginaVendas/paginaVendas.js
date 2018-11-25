let mainEl = document.querySelector("main");
let carrinhoEl = document.querySelector("#carrinho");
let divCarrinhoEl = document.querySelector("#div-carrinho");
let quantidadeCarrinhoEl = document.querySelector("#quantidade-carrinho");
let divBototesCarrinhoEl = document.querySelector("#div-carrinho > .div-botoes");
let mascaraEl = document.querySelector("#mascara");
let divModalEl = document.querySelector("#div-modal");
let cancelaCarrinhoEl = document.querySelector("#cancelaCarrinho");
let confirmaCarrinhoEl = document.querySelector("#confirmaCarrinho");
let cancelaModalEl = document.querySelector("#cancelaModal");
let confirmaModalEl = document.querySelector("#confirmaModal");
let arrayProdutos = new Array();
let arrayCarrinho;

/**
 * Faz a requisição AJAX para adicionar produtos na tela
 * @author Guilherme Silva
 */
window.onload = function recebeJSON() {
	Request.get('http://localhost:8080/StayGreen/ProdutosVendaServlet')
		.then((resp) => {
			try {
				resp.forEach(addArrayProdutos);
				addProdutosPagina(arrayProdutos);
			} catch (e) {
				console.log("Erro ao exibir produtos");
			}
		});
}

/**
 * Adiciona um produto ao array de produtos da página
 * @author Vinicius Gabriel
 * @param {*} objetoProduto objeto contendo os dados do produto
 */
function addArrayProdutos({ idProduto: id, nomeProduto: nome, descrProduto: descricao, valorUnitProduto: preco, quantEstoqueProduto: estoque, fotoMercadoria: img }) {
	let produto = {
		nome: "",
		descricao: "",
		preco: 0,
		estoque: 0,
		img: ""
	};
	produto.nome = nome;
	produto.id = id;
	produto.descricao = descricao;
	produto.preco = preco;
	produto.estoque = estoque;
	produto.img = img;
	arrayProdutos.push(produto); // dps da push no array
	console.log(arrayProdutos);
}

/**
 * Adiciona os produtos na página
 * @author Vinicius Gabriel
 * @param {Array} produtos Array contendo os produto a serem adicionados na página
 */
function addProdutosPagina(produtos) {
	for (produto of produtos) {
		let sectionProduto = document.createElement("section");
		sectionProduto.dataset.id = produto.id;

		let nomeProduto = document.createElement("h1");
		nomeProduto.innerHTML = produto.nome;
		sectionProduto.appendChild(nomeProduto);

		let imgProduto = document.createElement("img");
		imgProduto.src = produto.img;
		sectionProduto.appendChild(imgProduto);

		let descricaoProduto = document.createElement('p');
		descricaoProduto.innerHTML = produto.descricao;
		descricaoProduto.classList.add("descricao-estoque");
		sectionProduto.appendChild(descricaoProduto);

		let estoqueProduto = document.createElement('p');
		estoqueProduto.innerHTML = "Estoque: " + produto.estoque + " unidades.";
		estoqueProduto.classList.add("descricao-estoque");
		sectionProduto.appendChild(estoqueProduto);

		let precoProduto = document.createElement('p');
		precoProduto.innerHTML = "R$ " + produto.preco;
		precoProduto.innerHTML = precoProduto.innerHTML.replace(".", ",");
		precoProduto.classList.add("preco");
		sectionProduto.appendChild(precoProduto);

		let labelQuantidade = document.createElement("label");
		labelQuantidade.innerHTML = "Quantidade: ";
		let inputQuantidade = document.createElement("input");
		inputQuantidade.type = "number";
		inputQuantidade.max = produto.estoque;
		inputQuantidade.min = 0;
		labelQuantidade.appendChild(inputQuantidade);
		sectionProduto.appendChild(labelQuantidade);

		let botaoComprar = document.createElement("button");
		botaoComprar.innerHTML = "Comprar";
		botaoComprar.addEventListener('click', addCarrinho);
		sectionProduto.appendChild(botaoComprar);

		mainEl.appendChild(sectionProduto);
	}
}

/**
 * Adiciona os produtos no carrinho
 * @author Vinicius Gabriel
 * @param {*} evt
 */
function addCarrinho(evt) {
	let id, descricao, preco, quantidade, quantidadeMax, clicadoEl, paiEl, filhos,
		quantidadeItensCarrinho, boolIdIgual = false;
	clicadoEl = evt.currentTarget;
	paiEl = clicadoEl.parentElement;
	id = paiEl.dataset.id;
	filhos = paiEl.children;
	console.log(filhos);
	descricao = filhos[2].innerHTML;
	preco = parseFloat(filhos[4].innerHTML.split(" ")[1].replace(',', '.'));
	quantidade = parseInt(filhos[5].children[0].value);
	quantidadeMax = parseInt(filhos[5].children[0].max);
	quantidadeItensCarrinho = document.querySelector("#quantidade-carrinho");
	if (quantidadeItensCarrinho.innerHTML > 0) {
		let articlesCarrinho = document.querySelectorAll("#div-carrinho > article");
		for (let articleIdAtual of articlesCarrinho) {
			if (articleIdAtual.dataset.id == id &&
				quantidade + parseInt(articleIdAtual.querySelector("label > input").value) < quantidadeMax) {
				boolIdIgual = true;
				let quantVal = articleIdAtual.querySelector("label > input");
				let quantInt = parseInt(quantVal.value);
				quantVal.value = quantInt + quantidade;
				let precoTotal = articleIdAtual.querySelector("p:last-of-type");
				precoTotal.innerHTML = "preco total: R$ " + preco * (quantInt + quantidade);
			}
		}
	}
	if ((quantidade > 0 && quantidade < quantidadeMax) && boolIdIgual === false) {
		let article = document.createElement("article");
		let descricaoCarrinho = document.createElement("p");
		descricaoCarrinho.innerHTML = descricao;
		article.dataset.id = id;
		article.appendChild(descricaoCarrinho);

		let valorUnidade = document.createElement("p");
		valorUnidade.innerHTML = "Valor por unidade: R$ " + preco;
		article.appendChild(valorUnidade);

		let labelQuantidade = document.createElement("label");
		labelQuantidade.innerHTML = "Quantidade: ";
		let inputQuantidade = document.createElement("input");
		inputQuantidade.type = "number";
		inputQuantidade.max = quantidadeMax;
		inputQuantidade.min = 1;
		inputQuantidade.value = quantidade;
		inputQuantidade.addEventListener('input', function (evt) {
			let quantidadeInp = parseInt(evt.currentTarget.value);
			precoTotal.innerHTML = "Valor total: R$" + quantidadeInp * preco;
			precoTotal.dataset.preco = quantidadeInp * preco;
			let label = evt.currentTarget.parentElement;
			if ((quantidadeInp <= 0 || quantidadeInp > parseInt(evt.currentTarget.max) ||
				isNaN(quantidadeInp)) &&
				label.children.length == 1) {
				let span = document.createElement("span");
				span.innerHTML = " * a quantidade precisa ser maior que zero e menor que o estoque * ";
				span.style.color = "red";
				label.appendChild(span);
			} else if ((quantidadeInp > 0 && quantidadeInp < parseInt(evt.currentTarget.max)) &&
				label.children.length > 1) {
				console.log(label.lastChild);
				label.removeChild(label.lastChild);
			}
		});
		labelQuantidade.appendChild(inputQuantidade);
		article.appendChild(labelQuantidade);

		let precoTotal = document.createElement("p");
		precoTotal.innerHTML = "Valor total: R$" + quantidade * preco;
		precoTotal.dataset.preco = quantidade * preco;
		article.appendChild(precoTotal);

		let botaoRemover = document.createElement("button");
		botaoRemover.innerHTML = "Remover";
		botaoRemover.addEventListener('click', removeItem);
		article.appendChild(botaoRemover);

		divCarrinhoEl.insertBefore(article, divBototesCarrinhoEl);

		quantidadeCarrinhoEl.innerHTML++;
		quantidadeCarrinhoEl.classList.add("aparece");
		carrinhoEl.addEventListener('click', apareceCarrinho);
	}
}

/**
 * Remove um produto do carrinho
 * @param {} evt
 */
function removeItem(evt) {
	clicadoEl = evt.currentTarget;
	articlePaiEl = clicadoEl.parentElement;
	divCarrinhoEl.removeChild(articlePaiEl);
	quantidadeCarrinhoEl.innerHTML--;

	if (quantidadeCarrinhoEl.innerHTML == 0) {
		quantidadeCarrinhoEl.classList.remove("aparece");
		mascaraEl.classList.remove("aparece");
		divCarrinhoEl.classList.remove("aparece");
		carrinhoEl.removeEventListener('click', apareceCarrinho);
	}
}

/**
 * Mostra o carrinho na tela
 * @author Vinicius Gabriel
 */
function apareceCarrinho() {
	mascaraEl.classList.add("aparece");
	divCarrinhoEl.classList.add("aparece");
};

/**
 * Retira o carrinho da tela
 * @author Vinicius Gabriel
 */
function cancelaCarrinho() {
	mascaraEl.classList.remove("aparece");
	divCarrinhoEl.classList.remove("aparece");
}

/**
 * Passa para a modal de confirmação de compra
 * @author Vinicius Gabriel
 */
function confirmaCarrinho() {
	let articlesCarrinho = document.querySelectorAll("#div-carrinho > article");
	let boolManda = true;
	arrayCarrinho = new Array();
	for (let article of articlesCarrinho) {
		if (parseInt(article.querySelector("label > input").value) <= 0 ||
			parseInt(article.querySelector("label > input").value) > parseInt(article.querySelector("label > input").max))
			boolManda = false;
		console.log(article);
		arrayCarrinho.push({
			id: parseInt(article.dataset.id),
			quantidade: parseInt(article.querySelector('input').value),
			valor: parseFloat(article.querySelector('p[data-preco]').dataset.preco),
		});
	}

	if (boolManda) {
		divCarrinhoEl.classList.remove("aparece");
		divModalEl.classList.add("aparece");
	}

};

function cancelaModal() {
	mascaraEl.classList.remove("aparece");
	divModalEl.classList.remove("aparece");
};

/**
 * @author Vinicius Gabriel
 */
function limpaCarrinho() {
	let elementosCarrinho = divCarrinhoEl.querySelectorAll('article');
	elementosCarrinho.forEach(el => {
		divCarrinhoEl.removeChild(el)
		quantidadeCarrinhoEl.innerHTML--;

		if (quantidadeCarrinhoEl.innerHTML == 0) {
			quantidadeCarrinhoEl.classList.remove("aparece");
			mascaraEl.classList.remove("aparece");
			divCarrinhoEl.classList.remove("aparece");
			carrinhoEl.removeEventListener('click', apareceCarrinho);
		}
	});
}

function confirmaModal() {
	mascaraEl.classList.remove("aparece");
	divModalEl.classList.remove("aparece");
};

cancelaCarrinhoEl.addEventListener('click', cancelaCarrinho);
confirmaCarrinhoEl.addEventListener('click', confirmaCarrinho);
cancelaModalEl.addEventListener('click', cancelaModal);

//Formata o input de cep
let padrao = '#####-###';

let inputCep = divModalEl.querySelector("label:last-of-type > input");
inputCep.addEventListener('input', e => {
	let entrada = inputCep.value;
	if (isNaN(entrada[entrada.length - 1])) {
		entrada = entrada.replace(entrada.slice(entrada.length - 1), '');
	}

	let padraoIndex = 0, resultado = '';
	for (let i = 0; padraoIndex < padrao.length && i < entrada.length; i++ , padraoIndex++) {
		if (padrao[padraoIndex] != '#') {
			while (padrao[padraoIndex] != '#' && entrada[i] != padrao[padraoIndex] && padraoIndex != padrao.length - 1) {
				resultado += padrao[padraoIndex];
				padraoIndex++;
			}
		}
		resultado += entrada[i];
	}
	inputCep.value = resultado;
});

cancelaModal();

//Realiza venda
const modalConfirma = document.getElementById('div-modal');
const nomeInput = modalConfirma.querySelector('input[name=nome]');
const modoPagamentoSelect = modalConfirma.querySelector('select[name=modoPagamento]');
const dataEntregaInput = modalConfirma.querySelector('input[name=dataEntrega]');
const regiaoSelect = modalConfirma.querySelector('select[name=regiao]');
const enderecoInput = modalConfirma.querySelector('input[name=endereco]');
const cepInput = modalConfirma.querySelector('input[name=cep]');
const confirmaButton = modalConfirma.querySelector('#confirmaModal');
const regexCEP = /(\d{5})-?(\d{3})/;

confirmaButton.addEventListener('click', e => {
	let dataTransacao = new DataTransacao();
	let cepExp = regexCEP.exec(cepInput.value);
	//teste dados
	if (dataEntregaInput.valueAsDate > new Date() && //confere se a data é maior que atual
		nomeInput.value != "" && //nome não pode ser vazio
		enderecoInput.value != "" &&//endereco não pode ser vazio
		cepExp != null //cep deve estar em formato válido
	) {
		let venda = new Venda(fretes[regiaoSelect.value],
			dataEntregaInput.valueAsDate);

		let comprador = new Comprador(nomeInput.value, enderecoInput.value, cepExp[1] + cepExp[2], modoPagamentoSelect.value);

		let transacoes = Array();
		for (const objeto of arrayCarrinho) {
			transacoes.push(new Transacao(objeto.id, objeto.valor, objeto.quantidade));
		}

		fazVenda(dataTransacao,
			venda,
			comprador,
			...transacoes
		);
		confirmaModal();
		limpaCarrinho();
		cepInput.value = null;
		dataEntregaInput.value = null;
		nomeInput.value = null;
		enderecoInput.value = null;
	} else {
		/**
		 * @author Vinicius
		 */
		if (!(dataEntregaInput.valueAsDate > new Date()) && dataEntregaInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * a data de entrega deve ser após a data atual * ";
			span.style.color = "red";
			dataEntregaInput.parentElement.appendChild(span);
		} else if ((dataEntregaInput.valueAsDate > new Date()) && dataEntregaInput.parentElement.childElementCount > 1) {
			dataEntregaInput.parentElement.lastChild.remove();
		}
		if (!(nomeInput.value != "") && nomeInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * escreva seu nome * ";
			span.style.color = "red";
			nomeInput.parentElement.appendChild(span);
		} else if ((nomeInput.value != "") && nomeInput.parentElement.childElementCount > 1) {
			nomeInput.parentElement.lastChild.remove();
		}
		if (!(enderecoInput.value != "") && enderecoInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insira seu endereço * ";
			span.style.color = "red";
			enderecoInput.parentElement.appendChild(span);
		} else if ((enderecoInput.value != "") && enderecoInput.parentElement.childElementCount > 1) {
			enderecoInput.parentElement.lastChild.remove();
		}
		if (!(cepExp != null) && cepInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insire seu CEP * ";
			span.style.color = "red";
			cepInput.parentElement.appendChild(span);
		} else if ((cepExp != null) && cepInput.parentElement.childElementCount > 1) {
			cepInput.parentElement.lastChild.remove();
		}
	}
});