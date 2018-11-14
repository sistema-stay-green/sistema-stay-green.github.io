// Recebe as informações do formulário  de login
let btnEntrarLoginEl = document.querySelector("#btnEntrar");

btnEntrarLoginEl.addEventListener("click", function() {

  let emailInputEl = document.querySelector("#cadastro > label:first-of-type > input"),
      senhaInputEl = document.querySelector("#cadastro > label:last-of-type > input");

  Request.get("http://localhost:8080/logarusuario?login=" + emailInputEl.value
              + "&senha=" + senhaInputEl.value)
      .then(() => window.location.redirect("index.html"))
      .catch(() => alert("Erro ao logar o servidor"));

});

// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#cadastro > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

  let nomeUsuario = document.querySelector("#cadastro input[name='nomeUsuario']").value,
      cnpjUsuario = document.querySelector("#cadastro input[name='cnpjUsuario']").value,
      saldoUsuario = document.querySelector("#cadastro input[name='saldoUsuario']").value,
      emailUsuario = document.querySelector("#cadastro input[name='emailUsuario']").value,
      senhaUsuario = document.querySelector("#cadastro input[name='senhaUsuario']").value;

  Request.get("http://localhost:8080/StayGreen/cadastrarusuario?nome="
              + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario
              + "&email=" + emailUsuario + "&senha=" + senhaUsuario);
      .then(() => window.location.redirect("index.html"))
      .catch(() => alert("Erro ao cadastrar"));

  // TODO: Criar classe para o usuário e salvá-lo no sessionStorage (objeto global será criado e lido)

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
