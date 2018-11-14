// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#cadastro > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

  let nomeUsuario = document.querySelector("#cadastro input[name='nomeUsuario']").value,
      cnpjUsuario = document.querySelector("#cadastro input[name='cnpjUsuario']").value,
      saldoUsuario = document.querySelector("#cadastro input[name='saldoUsuario']").value,
      emailUsuario = document.querySelector("#cadastro input[name='emailUsuario']").value,
      senhaUsuario = document.querySelector("#cadastro input[name='senhaUsuario']").value;

  Request.get("http://localhost:8080/StayGreen/UpdateUsuarioServlet?nome="
              + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario
              + "&login=" + emailUsuario + "&senha=" + senhaUsuario);

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
