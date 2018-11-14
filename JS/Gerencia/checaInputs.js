// Recebe as informações do formulário  de login
let btnEntrarLoginEl = document.querySelector("#cadastro > button:first-of-type");

btnEntrarLoginEl.addEventListener("click", function() {

  let emailInputEl = document.querySelector("#cadastro > label:first-of-type > input"),
      senhaInputEl = document.querySelector("#cadastro > label:last-of-type > input");

  Request.get("http://localhost:8080/logarusuario?login=" + emailInputEl.value
              + "&senha=" + senhaInputEl.value)
         .then(function(){window.location.redirect("index.html")})
         .catch(function(){
           alert("Erro ao logar o servidor");
         });

});

// Mostra mensagem caso o email digitado não for válido
function checaEmail() {

  let emailUsuario = inputEmailEl.value,
      btnConfirmarEl = document.querySelector('#btnConfirmar')
      labelEl = document.querySelector("#cadastro > label:nth-child(4)");

  if(emailUsuario == "" && labelEl.contains(labelEl.querySelector("span"))) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
      btnConfirmarEl.disable = "false";
      btnConfirmarEl.classList.remove("botaoDesab");
    }
  }
  else {
    if((emailUsuario.indexOf("@") === -1 || emailUsuario.indexOf(".com") === -1) && labelEl.querySelector("span") === null) {
      btnConfirmarEl.disable = "true";
      btnConfirmarEl.classList.add("botaoDesab");
      labelEl.insertBefore(escreveMensagemErro(" (E-mail inválido)"), labelEl.querySelector("input"));
    }
    else if((emailUsuario.indexOf("@") > -1 && emailUsuario.indexOf(".com") > -1) && labelEl.querySelector("span") !== null) {
      labelEl.removeChild(labelEl.querySelector("span"));
      if(document.querySelectorAll("#editaInfoUsuario > form .mensagemErro").length === 0) {
        btnConfirmarEl.disable = "false";
        btnConfirmarEl.classList.remove("botaoDesab");
      }
    }
  }

}

// Testa se as senhas inseridas são iguais
function checarSenhas() {

  let senha = document.querySelector("#cadastro input[name='senhaUsuario']").value,
      labelEl = document.querySelector("#cadastro > label:last-of-type"),
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

// Testa se os inputs são válidos ou não
let inputConfSenhaEl = document.querySelector("#cadastro input[name='confSenhaUsuario']"),
    inputSenhaEl = document.querySelector("#cadastro input[name='senhaUsuario']"),
    inputEmailEl = document.querySelector("#cadastro input[name='emailUsuario']");

inputConfSenhaEl.addEventListener("change", checarSenhas);
inputSenhaEl.addEventListener("change", checarSenhas);
inputEmailEl.addEventListener("change", checaEmail);
