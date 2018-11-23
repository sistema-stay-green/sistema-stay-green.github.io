// Recebe as informações do formulário  de login
let btnEntrarLoginEl = document.querySelector("#login form:first-of-type > button:first-of-type");

btnEntrarLoginEl.addEventListener("click", function() {

  let emailInputEl = document.querySelector("#login > form > label:first-of-type > input"),
      senhaInputEl = document.querySelector("#login > form > label:last-of-type > input");

      Request.get("http://localhost:8080/StayGreen/LoginUsuarioServlet?login=" + emailInputEl.value
                  + "&senha=" + senhaInputEl.value)
             .then((resposta) => {
                    let usuario = new Usuario(null);

                    usuario.nome = resposta.nomeUsuario;
                    usuario.cnpj = resposta.cnpjUsuario;
                    usuario.saldo = resposta.saldoUsuario;
                    usuario.email = resposta.emailUsuario;
                    
                    localStorage.setItem("usuario", usuario.toJSON());
                    window.location.href = "index.html";
             })
             .catch(() => { alert("Erro ao logar o servidor") });

});

// Troca o formulário para o de cadastro ao invés do login
let btnCadastrarEl = document.querySelector("#login > section > button");

btnCadastrarEl.addEventListener("click", function() {

  let forms = document.querySelectorAll("#login form"),
      mensagemCadastroEl = document.querySelector("#login > section > p:first-of-type");

  for(let formEl of forms)
    formEl.classList.toggle("ocultar");

  if(forms[0].classList.contains("ocultar")) {
    mensagemCadastroEl.innerHTML = "Faça o login no botão abaixo caso já tenha uma conta no sistema";
    btnCadastrarEl.innerHTML = "Login";
  }
  else {
    mensagemCadastroEl.innerHTML = "Cadastre-se aqui, caso necessite acessar as partes administrativas do sistema";
    btnCadastrarEl.innerHTML = "Cadastrar";
  }

});

// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#login form:last-of-type > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

    let nomeUsuario = document.querySelector("input[name='nomeUsuario']").value,
        cnpjUsuario = document.querySelector("#login form:last-of-type input[name='cnpjUsuario']").value,
        saldoUsuario = document.querySelector("#login form:last-of-type input[name='saldoUsuario']").value,
        emailUsuario = document.querySelector("#login form:last-of-type input[name='emailUsuario']").value,
        senhaUsuario = document.querySelector("#login form:last-of-type input[name='senhaUsuario']").value;

    usuario = new Usuario(null);
    usuario.nome = nomeUsuario;
    usuario.cnpj = cnpjUsuario;
    usuario.saldo = saldoUsuario;
    usuario.email = emailUsuario;
    usuario.senha = null;

    Request.get("http://localhost:8080/StayGreen/CadastroUsuarioServlet?nome="
                + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario
                + "&login=" + emailUsuario + "&senha=" + senhaUsuario)
           .then(() => {
              localStorage.setItem("usuario", usuario.toJSON());
              window.location.href = "index.html";
           })
           .catch(() => { alert("Erro ao cadastrar os dados no servidor"); });

});

// Atualiza o header
let linksMenu = document.querySelectorAll("nav > a");

  for (let linkMenuEl of linksMenu) {

      if (linkMenuEl.href.slice(linkMenuEl.href.lastIndexOf('/')) === "/perfil.html") {
        linkMenuEl.innerHTML = "Cadastrar";
      }
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
