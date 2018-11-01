// Recebe as informações do formulário de login
let btnEntrarLoginEl = document.querySelector("#login > form:first-of-type > button:first-of-type");

btnEntrarLoginEl.addEventListener("click", function() {

  let emailInputEl = document.querySelector("#login > form > label:first-of-type > input"),
      senhaInputEl = document.querySelector("#login > form > label:last-of-type > input");

  Request.get("http://localhost:8080/logarusuario?login=" + emailInputEl.value + "&senha=" + senhaInputEl.value)
         .then(function(){window.location.redirect("index.html")})
         .catch(function(){
           alert("Erro ao logar o servidor");
         });

});

// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#login > form:last-of-type > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

  let nomeUsuario = document.querySelector("#login > form:last-of-type input[name='nomeUsuario']").value,
      cnpjUsuario = document.querySelector("#login > form:last-of-type input[name='cnpjUsuario']").value,
      saldoUsuario = document.querySelector("#login > form:last-of-type input[name='saldoUsuario']").value,
      emailUsuario = document.querySelector("#login > form:last-of-type input[name='emailUsuario']").value,
      senhaUsuario = document.querySelector("#login > form:last-of-type input[name='senhaUsuario']").value;

  Request.get("http://localhost:8080/cadastrarusuario?nome=" + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario + "&login=" + emailUsuario + "&senha=" + senhaUsuario);

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
  } else {
    mensagemCadastroEl.innerHTML = "Cadastre-se aqui, caso necessite acessar as partes administrativas do sistema";
    btnCadastrarEl.innerHTML = "Cadastrar";
  }

});

// Mostra mensagem caso as senhas digitadas são diferentes no cadastro
let inputConfSenhaEl = document.querySelector("#login > form:last-of-type input[name='confSenhaUsuario']");
let inputSenhaEl = document.querySelector("#login > form:last-of-type input[name='senhaUsuario']");

inputConfSenhaEl.addEventListener("change", checarSenhas);
inputSenhaEl.addEventListener("change", checarSenhas);

// Mostra mensagem caso o email digitado não for válido
let inputEmailEl = document.querySelector("#login > form:last-of-type input[name='emailUsuario']");

inputEmailEl.addEventListener("change", function() {

  let emailUsuario = inputEmailEl.value;
  let labelEl = document.querySelector("#login > form:last-of-type > label:nth-child(4)");

  if((emailUsuario.indexOf("@") === -1 || emailUsuario.indexOf(".com") === -1) && labelEl.querySelector("span") === null) {
    btnConfimarCadastroEl.disable = "true";
    btnConfimarCadastroEl.classList.add("botaoDesab");
    labelEl.insertBefore(escreveMensagemErro(" (E-mail inválido)"), labelEl.querySelector("input"));
  }
  else if((emailUsuario.indexOf("@") > -1 && emailUsuario.indexOf(".com") > -1) && labelEl.querySelector("span") !== null) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#login > form .mensagemErro").length === 0) {
      btnConfimarCadastroEl.disable = "false";
      btnConfimarCadastroEl.classList.remove("botaoDesab");
    }
  }

});

function escreveMensagemErro(mensagem) {

  let mensagemEl = document.createElement("span");

  mensagemEl.innerHTML = mensagem;
  mensagemEl.classList.add("mensagemErro");

  return mensagemEl;

}

function checarSenhas() {

  let senha = document.querySelector("#login > form:last-of-type input[name='senhaUsuario']").value,
      labelEl = document.querySelector("#login > form:last-of-type > label:last-of-type"),
      senhaConfirmar = inputConfSenhaEl.value;

  if(senha !== senhaConfirmar && labelEl.querySelector("span") === null) {
    btnConfimarCadastroEl.disable = "true";
    btnConfimarCadastroEl.classList.add("botaoDesab");
    labelEl.insertBefore(escreveMensagemErro(" (Senhas não são iguais)"), labelEl.querySelector("input"));
  }
  else if(senha === senhaConfirmar && labelEl.querySelector("span") !== null) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#login > form .mensagemErro").length === 0) {
      btnConfimarCadastroEl.disable = "false";
      btnConfimarCadastroEl.classList.remove("botaoDesab");
    }
  }

}
