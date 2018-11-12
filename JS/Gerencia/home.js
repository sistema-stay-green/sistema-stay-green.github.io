let cardAgenda = document.querySelector("#agenda");
let cardProducao = document.querySelector("#producao");
let cardPatrimonio = document.querySelector("#patrimonio");
let cardMaquinas = document.querySelector("#maquinas");
let cardVendas = document.querySelector("#vendas");

function mudaUrl(url){
  window.location = url;
}

cardAgenda.addEventListener('click', function(){ mudaUrl("agendaEletronica.html"); });
cardVendas.addEventListener('click', function(){ mudaUrl("paginaVendasProdutor.html"); });
cardPatrimonio.addEventListener('click', function(){ mudaUrl("Patrimonio.html"); });
cardMaquinas.addEventListener('click', function(){ mudaUrl("controleMaquinas.html"); });
cardProducao.addEventListener('click', function(){ mudaUrl("controleProducao.html"); });
// trasicao

document.querySelector("#comecar").addEventListener("click", function(){
    scrollTo(main);
});

function scrollTo(hash) {
    location.hash = "#" + hash;
}
