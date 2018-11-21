let mainEl = document.querySelector("main");
let divBotoesEl = document.querySelector("main > .div-botoes");
let mascaraEl = document.querySelector("#mascara");
let botaoEncaEl = document.querySelector("#botaoEnc");
let botaoFatuEl = document.querySelector("#botaoFat");
let botaoResulEl = document.querySelector("#botaoRes");
let botaoRegistraEl = document.querySelector("#botaoRegistra");
let divEncaEl = document.querySelector("#div-encaminhamentos");
let divFatuEl = document.querySelector("#div-faturamentos");
let divResulEl = document.querySelector("#div-resultados");
let divRegistraEl = document.querySelector("#div-registra");
let botaoConfirmaEl = document.querySelector("#div-registra > .div-botoes > button:first-of-type");
let botaoCancelaEl = document.querySelector("#div-registra > .div-botoes > button:last-of-type");
let arrayProdutos = new Array();
let botaoRegiaoEl = document.querySelector('#regiaoFrete');
let valorBotaoRegiao = botaoRegiaoEl.options[botaoRegiaoEl.selectedIndex].value;//valor do <option> selecionado
let valorBotaoFrete = document.querySelector('#valorFrete').value;

window.onload = function recebeJSON(){
  Request.get('http://localhost:8080/StayGreen/ProdutosVendaServlet')
    .then(resposta => {
      resposta.forEach(addArrayProdutos);
      addProdutosPagina(arrayProdutos);
    });
}

function addArrayProdutos({idProduto: id, nomeProduto: nome, descrProduto: descricao, valorUnitProduto: preco, quantEstoqueProduto: estoque,fotoMercadoria: img}){
  let produto = {
     nome:"",
     descricao:"",
     preco: 0,
     estoque:0,
     img:""
 };
  produto.nome = nome;
  produto.id = id;
  produto.descricao = descricao;
  produto.preco = preco;
  produto.estoque = estoque;
  produto.img = img;
  arrayProdutos.push(produto);
  console.log(arrayProdutos);
 }

function addProdutosPagina(produtos){

   let tabela = document.createElement("table");

   let thead = document.createElement("thead");
   thead.innerHTML = "<th>ID</th> <th>Nome</th> <th>Preço</th> <th>Estoque</th>";
   tabela.appendChild(thead);

   let tbody = document.createElement("tbody");
   for( let produto of produtos){
     let tr = document.createElement("tr");
     tr.innerHTML = "<td>" + produto.id + "</td> " + "<td>" + produto.nome + "</td> " +
                    "<td>R$ " + produto.preco + "</td> " + "<td>" + produto.estoque + " unidades</td> ";
     tbody.appendChild(tr);
   }
   tabela.appendChild(tbody);
   mainEl.insertBefore(tabela,divBotoesEl);
}

function mostraEncaminhamentos(){
  mascaraEl.classList.add("aparece");
  divEncaEl.classList.add("aparece");
  divFatuEl.classList.remove("aparece");
  divResulEl.classList.remove("aparece");
  divRegistraEl.classList.remove("aparece");
}
function mostraFaturamentos(){
  mascaraEl.classList.add("aparece");
  divEncaEl.classList.remove("aparece");
  divFatuEl.classList.add("aparece");
  divResulEl.classList.remove("aparece");
  divRegistraEl.classList.remove("aparece");
}
function mostraResultados(){
  mascaraEl.classList.add("aparece");
  divEncaEl.classList.remove("aparece");
  divFatuEl.classList.remove("aparece");
  divResulEl.classList.add("aparece");
  divRegistraEl.classList.remove("aparece");
}
function mostraRegistra() {
  mascaraEl.classList.add("aparece");
  divEncaEl.classList.remove("aparece");
  divFatuEl.classList.remove("aparece");
  divResulEl.classList.remove("aparece");
  divRegistraEl.classList.add("aparece");
}
function escondeTudo(){
  mascaraEl.classList.remove("aparece");
  divEncaEl.classList.remove("aparece");
  divFatuEl.classList.remove("aparece");
  divResulEl.classList.remove("aparece");
  divRegistraEl.classList.remove("aparece");
}
function confirmaRegistraProduto(){
  divRegistraEl.classList.remove("aparece");
  mascaraEl.classList.remove("aparece");
}
function cancelaRegistraProduto(){
  divRegistraEl.classList.remove("aparece");
  mascaraEl.classList.remove("aparece");
}

botaoRegistraEl.addEventListener('click', mostraRegistra);
botaoEncaEl.addEventListener('click', mostraEncaminhamentos);
botaoFatuEl.addEventListener('click', mostraFaturamentos);
botaoResulEl.addEventListener('click', mostraResultados);
mascaraEl.addEventListener('click', escondeTudo);
botaoConfirmaEl.addEventListener('click', confirmaRegistraProduto);
botaoCancelaEl.addEventListener('click', cancelaRegistraProduto);

let padrao = '########';

let inputCep = divRegistraEl.querySelector("label:last-of-type > input");
  inputCep.addEventListener('input', e => {
    let entrada = inputCep.value;
    if(isNaN(entrada[entrada.length - 1])){
      entrada = entrada.replace(entrada.slice(entrada.length - 1), '');
    }

    let padraoIndex = 0, resultado = '';
    for (let i = 0; padraoIndex < padrao.length && i < entrada.length; i++, padraoIndex++) {
      if (padrao[padraoIndex] != '#') {
        while (padrao[padraoIndex] != '#' && entrada[i] != padrao[padraoIndex]  && padraoIndex != padrao.length - 1) {
          resultado += padrao[padraoIndex];
          padraoIndex++;
        }
      }
      resultado += entrada[i];
    }
    inputCep.value = resultado;
});

//compra é valor negativo
function relatorioResultados(){
  Request.get('http://localhost:8080/StayGreen/RelatorioResultadoServlet)
    .then(resposta => {
      if(resposta < 0)
        respostaMsg = "Produtor está tendo prejuízo";
      else if(resposta > 0)
        respostaMsg = "Produtor está tendo lucro";
      else
        respostaMsg = "Indiferente";

      if(tabelaAntiga = divResulEl.querySelector("table"))
        tabelaAntiga.remove();

      let tabela = document.createElement("table");

      let thead = document.createElement("thead");
      thead.innerHTML = "<th>Valor (Lucro/Prejuízo)</th> <th>Resultado</th>";
      tabela.appendChild(thead);

      let tbody = document.createElement("tbody");
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${resposta}</td> <td>${respostaMsg}</td>`;
      tbody.appendChild(tr);
      tabela.appendChild(tbody);
      divResulEl.append(tabela);

    });
}

function relatorioFaturamento(){
  Request.get('http://localhost:8080/StayGreen/RelatorioVendaServlet')
    .then(resposta => {
      if(tabelaAntiga = divFatuEl.querySelector("table"))
        tabelaAntiga.remove();

      let tabela = document.createElement("table");

      let thead = document.createElement("thead");
      thead.innerHTML = "<th>Produto</th> <th>Data</th> <th>Valor</th>";
      tabela.appendChild(thead);

      let tbody = document.createElement("tbody");
      resposta.forEach(res => {
        let {valor, nome, dia, mes, ano} = res;
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${nome}</td> <td>${dia}/${mes}/${ano}</td> <td>${valor}</td>`;
        tbody.appendChild(tr);
      });
      tabela.appendChild(tbody);
      divFatuEl.append(tabela);

    });
}

function relatorioEncaminhamento(){
  Request.get('http://localhost:8080/StayGreen/VendasEncaminhamentosServlet')
    .then(resposta => {
      console.table(resposta);
      if(tabelaAntiga = divEncaEl.querySelector("table"))
        tabelaAntiga.remove();

      let tabela = document.createElement("table");

      let thead = document.createElement("thead");
      thead.innerHTML = "<th>Cliente</th> <th>Data</th> <th>Faltam (Dias)</th>";
      tabela.appendChild(thead);

      let tbody = document.createElement("tbody");
      resposta.forEach(res => {
        let {nome, dia, mes, ano} = res;
        let falta = dia - (new Date()).getDate();
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${nome}</td> <td>${dia}/${mes}/${ano}</td> <td>${ falta > 0 ? falta : "Não"}</td>`;
        tbody.appendChild(tr);
      });
      tabela.appendChild(tbody);
      divEncaEl.append(tabela);
    });
}
relatorioEncaminhamento();

function mudaValorFrete(){
  if(valorBotaoFrete >= 0)
    Request.get('http://localhost:8080/StayGreen/FreteServlet?regiao='+valorBotaoRegiao+'&valorFrete='+valorBotaoFrete);
  else {
    alert("Valor do frete inválido");
  }
}
