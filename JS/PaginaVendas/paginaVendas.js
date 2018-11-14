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

 //Variável que recebe o JSON do servlet
 let dadosJSON;

// window.onload = function recebeJSON(){
//   Request.get('http://localhost:8080/StayGreen/ProdutosVendaServlet', )
//     .then(function(resposta){
//         try {
//           dadosJSON = JSON.parse(resposta);
//           addArrayProdutos(dadosJSON);
//           addProdutosPagina(arrayProdutos);
//         } catch(e) {
//           eval("dadosJSON = (" + resposta + ");");
//           addArrayProdutos(dadosJSON);
//           addProdutosPagina(arrayProdutos);
//         }
//     });
// }

//Caso a função acima dê erro
  // window.onload = function recebeJSON(){
  //   let xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function(){
  //       if (xhttp.readyState === 4 && xhttp.status === 200) {
  //         try {
  //           dadosJSON = JSON.parse(xmlhttp.responseText);
  //           addArrayProdutos(dadosJSON);
  //           addProdutosPagina(arrayProdutos);
  //         } catch(e) {
  //           eval("dadosJSON = (" + xmlhttp.responseText + ");");
  //           addArrayProdutos(dadosJSON);
  //           addProdutosPagina(arrayProdutos);
  //         }
  //       }
  //   };
  //   xhttp.open("POST", 'http://localhost:8080/StayGreen/ProdutosVendaServlet', true);
  //   xhttp.send();
  // }

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
    arrayProdutos.push(produto); // dps da push no array
    console.log(arrayProdutos);
   }
function addProdutosPagina(produtos){

   for(produto of produtos){
     let sectionProduto = document.createElement("section");
     sectionProduto.dataset.id = produto.id;

     let imgProduto  = document.createElement("img");
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
     precoProduto.classList.add("preco");
     sectionProduto.appendChild(precoProduto);

     let labelQuantidade = document.createElement("label");
     labelQuantidade.innerHTML = "Quantidade: ";
     let inputQuantidade  = document.createElement("input");
     inputQuantidade.type = "number";
     inputQuantidade.max = produto.estoque;
     inputQuantidade.min = 1;
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
   let id, descricao, preco, quantidade, quantidadeMax, clicadoEl, paiEl, filhos,
   quantidadeItensCarrinho, boolIdIgual = false;
   clicadoEl = evt.currentTarget;
   paiEl = clicadoEl.parentElement;
   id = paiEl.dataset.id;
   filhos = paiEl.children;
   console.log(filhos);
   descricao = filhos[1].innerHTML;
   preco = parseFloat(filhos[3].innerHTML.split(" ")[1]);
   quantidade  = parseInt(filhos[4].children[0].value);
   quantidadeMax = parseInt(filhos[4].children[0].max);
   quantidadeItensCarrinho = document.querySelector("#quantidade-carrinho");
   if(quantidadeItensCarrinho.innerHTML > 0){
     let articlesCarrinho = document.querySelectorAll("#div-carrinho > article");
      for( let articleIdAtual of articlesCarrinho ){
        if(articleIdAtual.dataset.id == id &&
          quantidade + parseInt(articleIdAtual.querySelector("label > input").value) < quantidadeMax){
           boolIdIgual = true;
           let quantVal = articleIdAtual.querySelector("label > input");
           let quantInt = parseInt(quantVal.value);
           quantVal.value = quantInt + quantidade;
           let precoTotal = articleIdAtual.querySelector("p:last-of-type");
           precoTotal.innerHTML = "preco total: R$ " + preco * (quantInt + quantidade) ;
        }
      }
    }
   if((quantidade > 0 && quantidade < quantidadeMax ) && boolIdIgual === false){
     let article = document.createElement("article");
     let descricaoCarrinho = document.createElement("p");
     descricaoCarrinho.innerHTML =  descricao;
     article.dataset.id = id;
     article.appendChild(descricaoCarrinho);

     let valorUnidade = document.createElement("p");
     valorUnidade.innerHTML = "Valor por unidade: R$ " + preco;
     article.appendChild(valorUnidade);

     let labelQuantidade = document.createElement("label");
     labelQuantidade.innerHTML = "Quantidade: ";
     let inputQuantidade  = document.createElement("input");
     inputQuantidade.type = "number";
     inputQuantidade.max = quantidadeMax ;
     inputQuantidade.min = 1;
     inputQuantidade.value = quantidade;
     inputQuantidade.addEventListener('input', function(evt){
       let quantidadeInp = parseInt(evt.currentTarget.value);
       precoTotal.innerHTML = "Valor total: R$" + quantidadeInp * preco;
       let label = evt.currentTarget.parentElement;
       if(( quantidadeInp <= 0 || quantidadeInp > parseInt(evt.currentTarget.max)  || isNaN(quantidadeInp)) && label.children.length == 1  ){
         let span = document.createElement("span");
         span.innerHTML = " * a quantidade precisa ser maior que zero e menor que o estoque * ";
         span.style.color = "red";
         label.appendChild(span);
       }else if((quantidadeInp > 0 && quantidadeInp < parseInt(evt.currentTarget.max) ) && label.children.length > 1){
         console.log(label.lastChild);
         label.removeChild(label.lastChild);
       }
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

function apareceCarrinho(){
   mascaraEl.classList.add("aparece");
   divCarrinhoEl.classList.add("aparece");
 };
function cancelaCarrinho(){
  mascaraEl.classList.remove("aparece");
  divCarrinhoEl.classList.remove("aparece");
}
function confirmaCarrinho(){
  let articlesCarrinho = document.querySelectorAll("#div-carrinho > article");
  let boolManda = true;
  for(let article of articlesCarrinho){
    if(article.querySelector("label > input").value <= 0 ||
       article.querySelector("label > input").value >  article.querySelector("label > input").max)
      boolManda = false;
  }
  if (boolManda) {
    divCarrinhoEl.classList.remove("aparece");
    divModalEl.classList.add("aparece");
  }
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
