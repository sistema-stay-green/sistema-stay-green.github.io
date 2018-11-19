// Recebe as informações do formulário  de login
let btnEntrarLoginEl = document.querySelector("#login > form:first-of-type > button:first-of-type");

btnEntrarLoginEl.addEventListener("click", function() {

  let emailInputEl = document.querySelector("#login > form > label:first-of-type > input"),
      senhaInputEl = document.querySelector("#login > form > label:last-of-type > input");
      //usuario = new Usuario();

  Request.get("http://localhost:8080/logarusuario?login=" + emailInputEl.value
              + "&senha=" + senhaInputEl.value)
         .then(() => { window.location.redirect("index.html") })
         .catch(() => { alert("Erro ao logar o servidor") });

});

// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#login > form:last-of-type > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

  let nomeUsuario = document.querySelector("#login > form:last-of-type input[name='nomeUsuario']").value,
      cnpjUsuario = document.querySelector("#login > form:last-of-type input[name='cnpjUsuario']").value,
      saldoUsuario = document.querySelector("#login > form:last-of-type input[name='saldoUsuario']").value,
      emailUsuario = document.querySelector("#login > form:last-of-type input[name='emailUsuario']").value,
      senhaUsuario = document.querySelector("#login > form:last-of-type input[name='senhaUsuario']").value;

      usuario = new Usuario(null);
      usuario.nome(nomeUsuario);
      usuario.cnpj(cnpjUsuario);
      usuario.saldo(saldoUsuario);
      usuario.email(emailUsuario);
      usuario.senha(senhaUsuario);

      Request.get("http://localhost:8080/StayGreen/UpdateUsuarioServlet?nome="
                  + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario
                  + "&login=" + emailUsuario + "&senha=" + senhaUsuario)
             .then(() => {
               localStorage.setItem("usuario", usuario.toJSON());
               window.location.redirect("index.html");
             })
             .catch(() => { alert("Erro ao cadastrar os dados no servidor"); });

});

// Troca o formulário para o de cadastro ao invés do login
let btnCadastrarEl = document.querySelector("#login > section > button");

btnCadastrarEl.addEventListener("click", function() {

  let forms = document.querySelectorAll("#login > form"),
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

// Remove mensagens de erro dos inputs ao clicar em limpar
let btnLimparEl = document.querySelector("#cadastro > button:last-of-type");

btnLimparEl.addEventListener("click", function(){

  let spanErros = document.querySelectorAll("#cadastro .mensagemErro");

  for (const erroEl of spanErros)
    erroEl.parentElement.removeChild(erroEl);

});
