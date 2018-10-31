 let mainEl = document.querySelector("main");
 let carrinhoEl = document.querySelector("#carrinho");
 let divCarrinhoEl = document.querySelector("#div-carrinho");
 let quantidadeCarrinhoEl = document.querySelector("#quantidade-carrinho");
 let divBototesCarrinhoEl = document.querySelector("#div-carrinho > .div-botoes");
 let mascaraEl = document.querySelector("#mascara");
 let divModalEl = document.querySelector("#div-modal");
 let cancelaCarrinhoEl  = document.querySelector("#cancelaCarrinho");
 let confirmaCarrinhoEl = document.querySelector("#confirmaCarrinho");
 let cancelaModalEl  = document.querySelector("#cancelaModal");
 let confirmaModalEl = document.querySelector("#confirmaModal");
 let arrayProdutos = new Array();


 function addProdutosPagina(produtos){
   mainEl.height =  90 * produtos.length + "vh";
   for(produto of produtos){
     let sectionProduto = document.createElement("section");

     let imgProduto  = document.createElement("img");
     imgProduto.src = produto.img;
     sectionProduto.appendChild(imgProduto);

     let descricaoProduto = document.createElement('p');
     descricaoProduto.innerHTML = produto.descricao;
     descricaoProduto.classList.add("descricao");
     sectionProduto.appendChild(descricaoProduto);

     let precoProduto = document.createElement('p');
     precoProduto.innerHTML = "R$ " + produto.preco;
     precoProduto.classList.add("preco");
     sectionProduto.appendChild(precoProduto);

     let labelQuantidade = document.createElement("label");
     labelQuantidade.innerHTML = "Quantidade: ";
     let inputQuantidade  = document.createElement("input");
     inputQuantidade.type = "number";
     inputQuantidade.max = produto.estoque;
     inputQuantidade.min = 0;
     labelQuantidade.appendChild(inputQuantidade);
     sectionProduto.appendChild(labelQuantidade);

     let botaoComprar = document.createElement("button");
     botaoComprar.innerHTML = "Comprar";
     botaoComprar.addEventListener('click',addCarrinho);
     sectionProduto.appendChild(botaoComprar);

     mainEl.appendChild(sectionProduto);
   }
 }
 function addCarrinho(evt){
   let clicadoEl = evt.currentTarget;
   let paiEl = clicadoEl.parentElement;
   let filhos = paiEl.children;
   console.log(filhos);
   let descricao = filhos[1].innerHTML;
   let preco = filhos[2].innerHTML.split(" ")[1];
   preco = parseFloat(preco);
   let quantidade  = filhos[3].children[0].value;
   let quantidadeMax = filhos[3].children[0].max;
   if(quantidade > 0){
     let article = document.createElement("article");

     let descricaoCarrinho = document.createElement("p");
     descricaoCarrinho.innerHTML =  descricao;
     article.appendChild(descricaoCarrinho);

     let valorUnidade = document.createElement("p");
     valorUnidade.innerHTML = "Valor por unidade: R$ " + preco;
     article.appendChild(valorUnidade);

     let labelQuantidade = document.createElement("label");
     labelQuantidade.innerHTML = "Quantidade: ";
     let inputQuantidade  = document.createElement("input");
     inputQuantidade.type = "number";
     inputQuantidade.max = quantidadeMax ;
     inputQuantidade.min = 0;
     inputQuantidade.value = quantidade;
     inputQuantidade.addEventListener('input', function(){
       quantidade = inputQuantidade.value;
       precoTotal.innerHTML = "Valor total: R$" + quantidade * preco;
     });
     labelQuantidade.appendChild(inputQuantidade);
     article.appendChild(labelQuantidade);

     let precoTotal = document.createElement("p");
     precoTotal.innerHTML = "Valor total: R$" + quantidade * preco;
     article.appendChild(precoTotal);

     let botaoRemover = document.createElement("button");
     botaoRemover.innerHTML = "Remover";
     botaoRemover.addEventListener('click',removeItem);
     article.appendChild(botaoRemover);

     divCarrinhoEl.insertBefore(article,divBototesCarrinhoEl);

     quantidadeCarrinhoEl.innerHTML++;
     quantidadeCarrinhoEl.classList.add("aparece");
     carrinhoEl.addEventListener('click',apareceCarrinho);
    }
 }
 function removeItem(evt){
   clicadoEl = evt.currentTarget;
   articlePaiEl = clicadoEl.parentElement;
   divCarrinhoEl.removeChild(articlePaiEl);
   quantidadeCarrinhoEl.innerHTML--;

   if(quantidadeCarrinhoEl.innerHTML == 0){
     quantidadeCarrinhoEl.classList.remove("aparece");
     mascaraEl.classList.remove("aparece");
     divCarrinhoEl.classList.remove("aparece");
     carrinhoEl.removeEventListener('click',apareceCarrinho);
   }
 }

// essa funcao é de teste, na hr eh so mandar no json
 function addArrayProdutos(nome,descricao,preco,estoque,img){ // function addArrayProdutos(nome,descricao,preco,estoque,img){
  let produto = {
     nome:"",
     descricao:"",
     preco: 0,
     estoque:0,
     img:""
 };
  produto.nome = "notebook"; //produto.nome = nome; ..... pro resto
  produto.descricao = "Notebook Samsung Expert X22 Intel Core 7 i5 8GB 1TB Tela LED 15,6 Windows 10 - Branco";
  produto.preco = 1950.00;
  produto.estoque = 10;
  produto.img = "https://images-americanas.b2w.io/produtos/01/00/item/133621/7/133621741_1GG.png";
  arrayProdutos.push(produto); // dps da push no array
  console.log(arrayProdutos);
 }
 let produto = {
    nome:"",
    descricao:"",
    preco: 0,
    estoque:0,
    img:""
};
produto.nome = "notebook";
produto.descricao = "Notebook Dell Inspiron I15-3567-A10P Intel Core 6ª i3 4GB 1TB Tela LED 15,6 Windows 10 - Preto";
produto.preco = 2099.99;
produto.estoque = 8;
produto.img = "https://images-americanas.b2w.io/produtos/01/00/item/133276/5/133276561_1GG.png";

arrayProdutos.push(produto);
addArrayProdutos();
addProdutosPagina(arrayProdutos);
// o teste acaba aq

function apareceCarrinho(){
   mascaraEl.classList.add("aparece");
   divCarrinhoEl.classList.add("aparece");
 };
function cancelaCarrinho(){
  mascaraEl.classList.remove("aparece");
  divCarrinhoEl.classList.remove("aparece");
}
function confirmaCarrinho(){
  divCarrinhoEl.classList.remove("aparece");
  divModalEl.classList.add("aparece");
};
function cancelaModal(){
   mascaraEl.classList.remove("aparece");
   divModalEl.classList.remove("aparece");
 };
function confirmaModal(){
   mascaraEl.classList.remove("aparece");
   divModalEl.classList.remove("aparece");
 };

cancelaCarrinhoEl.addEventListener('click',cancelaCarrinho);
confirmaCarrinhoEl.addEventListener('click',confirmaCarrinho);
cancelaModalEl.addEventListener('click',cancelaModal);
confirmaModalEl.addEventListener('click',confirmaModal);
