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

let arrayProdutos = new Array();
let cafe = {
   id:"1",
   nome:"café",
   descricao:"uma saca de café",
   preco: 15,
   estoque:44,
   img:"http://s2.glbimg.com/P6Nn4AXYPq-K1Xek4cCKyONYYyA=/e.glbimg.com/og/ed/f/original/2014/01/15/cafe.jpg"
};
let leite = {
  id:"2",
  nome:"leite",
  descricao:"um copão de leite daqls bem tope memo ta lgd? tipo mt nice como giga noias",
  preco: 10,
  estoque:50,
  img:"http://camby.com.br/imagens/noticia/leite280813.jpg"
};
addArrayProdutos(cafe);
addArrayProdutos(leite);
addArrayProdutos(cafe);
addArrayProdutos(leite);
addArrayProdutos(cafe);
addArrayProdutos(leite);
addArrayProdutos(cafe);
addArrayProdutos(leite);
addArrayProdutos(cafe);
addArrayProdutos(leite);
addProdutosPagina(arrayProdutos);

function addArrayProdutos({id,nome,descricao,preco,estoque,img}){
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
botaoRegistraEl.addEventListener('click',mostraRegistra);
botaoEncaEl.addEventListener('click',mostraEncaminhamentos);
botaoFatuEl.addEventListener('click',mostraFaturamentos);
botaoResulEl.addEventListener('click',mostraResultados);
mascaraEl.addEventListener('click',escondeTudo);
