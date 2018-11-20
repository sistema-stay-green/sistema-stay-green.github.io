function mudaUrl(url){
  window.location = url;
}

//transition
document.querySelector('#comecar').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector("main").scrollIntoView({
      behavior: 'smooth'
  });
});

// Verifica e altera a página se o usuário estiver logado ou não
let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

if(dadosUsuario === null){ //não logado

  let cards = document.querySelectorAll("main > article");

  for (let cardEl of cards) {

    if (cardEl.id === "perfil") {
        cardEl.classList.add("articleDeslogado");
        cardEl.addEventListener('click', function(){ mudaUrl("login.html"); });
        cardEl.querySelector('p').innerHTML = "Caso seja um adiminstrador, faça login no sistema para ter acesso as outras funcionalidades.";
        cardEl.querySelector('h3').innerHTML = "Login ou Cadastro";
    }
    else if (cardEl.id === "vendas") {
        cardEl.classList.add("articleDeslogado");
        cardEl.addEventListener('click', function(){ mudaUrl("paginaVendas.html"); });
        cardEl.querySelector('p').innerHTML = "Caso seja um comprador, acesse essa página para pedir nosso produtos.";
        cardEl.querySelector('h3').innerHTML = "Site de vendas";
    }
    else
        cardEl.classList.add("oculta");

  }

  let linksMenu = document.querySelectorAll("nav > a");

  for (let linkMenuEl of linksMenu) {

      if (linkMenuEl.href.slice(linkMenuEl.href.lastIndexOf('/')) === "/perfil.html") {}
      else if (linkMenuEl.href.slice(linkMenuEl.href.lastIndexOf('/')) === "/paginaVendasProdutor.html") {
          linkMenuEl.href = "paginaVendas.html";
      }

      else {
        if (linkMenuEl.href.slice(linkMenuEl.href.lastIndexOf('/')) === "/index.html"){} //caso nao seja o link para home
        else{
          linkMenuEl.classList.add("oculta");
        }
      }

  }

}
else{ //logado
  let cardAgenda = document.querySelector("#agenda");
      cardProducao = document.querySelector("#producao"),
      cardPatrimonio = document.querySelector("#patrimonio"),
      cardMaquinas = document.querySelector("#maquinas"),
      cardVendas = document.querySelector("#vendas"),
      cardPerfil = document.querySelector("#perfil");

  let cards = document.querySelectorAll("main > article");

  for (let cardEl of cards) {
      cardEl.classList.remove("articleDeslogado");
  }

  cardAgenda.addEventListener('click', function(){ mudaUrl("agendaEletronica.html"); });
  cardVendas.addEventListener('click', function(){ mudaUrl("paginaVendasProdutor.html"); });
  cardPatrimonio.addEventListener('click', function(){ mudaUrl("Patrimonio.html"); });
  cardMaquinas.addEventListener('click', function(){ mudaUrl("controleMaquinas.html"); });
  cardProducao.addEventListener('click', function(){ mudaUrl("controleProducao.html"); });
  cardPerfil.addEventListener('click', function(){ mudaUrl("perfil.html"); });
}
