let mainEl = document.querySelector("main");
let divBotoesEl = document.querySelector(".div-botoes");
let mascaraEl = document.querySelector("#mascara");
let botaoEncaEl = document.querySelector("#botaoEnc");
let botaoFatuEl = document.querySelector("#botaoFat");
let botaoResulEl = document.querySelector("#botaoRes");
let botaoRegistraEl = document.querySelector("#botaoRegistra");
let divEncaEl = document.querySelector("#div-encaminhamentos");
let divFatuEl = document.querySelector("#div-faturamentos");
let divResulEl = document.querySelector("#div-resultados");
let divRegistraEl = document.querySelector("#div-registra");

let arrayProdutos = new Array();
window.onload = function recebeJSON(){
  Request.get('http://localhost:8080/StayGreen/ProdutosVendaServlet')
    .then(function(resposta){
      for (var i = 0; i < resposta.length; i++) {
        dadosJSON = resposta;
        addArrayProdutos(dadosJSON[i]);
      }
      addProdutosPagina(arrayProdutos);
    });
}

function addArrayProdutos(json){
    let produto = {
       nome:"",
       descricao:"",
       preco: 0,
       estoque:0,
       img:""
   };
    produto.nome = json.nomeProduto;
    produto.descricao = json.descrProduto;
    produto.preco = json.valorUnitProduto;
    produto.estoque = json.quantEstoqueProduto;
    produto.img = json.fotoMercadoria;
    arrayProdutos.push(produto); // dps da push no array
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
botaoRegistraEl.addEventListener('click',mostraRegistra);
botaoEncaEl.addEventListener('click',mostraEncaminhamentos);
botaoFatuEl.addEventListener('click',mostraFaturamentos);
botaoResulEl.addEventListener('click',mostraResultados);
mascaraEl.addEventListener('click',escondeTudo);

//compra é valor negativo
function relatorioResultados(){
  Request.get('http://localhost:8080/StayGreen/RelatorioResultadoServlet')
     .then(function(resposta){
       if(resposta < 0)
         resposta = "Produtor está tendo prejuízo";
       else if(resposta > 0)
         resposta = "Produtor está tendo lucro";
       else
         resposta = "Indiferente";

       console.log("resultado="+resposta);
     });
}
