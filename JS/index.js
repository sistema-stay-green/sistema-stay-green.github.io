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

//transition
document.querySelector('#comecar').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
  });
});
