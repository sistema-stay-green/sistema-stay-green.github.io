// Mostra mensagem caso o email digitado não for válido
function checaEmail() {

  let emailUsuario = inputEmailEl.value,
      btnConfirmarEl = document.querySelector('#cadastro > button:first-of-type'),
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
      if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
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
      btnConfirmarEl = document.querySelector('#cadastro > button:first-of-type'),
      senhaConfirmar = inputConfSenhaEl.value;

  if(senha !== senhaConfirmar && labelEl.querySelector("span") === null) {
    btnConfirmarEl.disable = "true";
    btnConfirmarEl.classList.add("botaoDesab");
    labelEl.insertBefore(escreveMensagemErro(" (Senhas não são iguais)"), labelEl.querySelector("input"));
  }
  else if(senha === senhaConfirmar && labelEl.querySelector("span") !== null) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
      btnConfirmarEl.disable = "false";
      btnConfirmarEl.classList.remove("botaoDesab");
    }
  }

}

// Função que escreve mensagem de errono formulário
function escreveMensagemErro(mensagem) {

  let mensagemEl = document.createElement("span");

  mensagemEl.innerHTML = mensagem;
  mensagemEl.classList.add("mensagemErro");

  return mensagemEl;

}

// Testa se os inputs são válidos ou não
let inputConfSenhaEl = document.querySelector("#cadastro input[name='confSenhaUsuario']"),
    inputSenhaEl = document.querySelector("#cadastro input[name='senhaUsuario']"),
    inputEmailEl = document.querySelector("#cadastro input[name='emailUsuario']");

inputConfSenhaEl.addEventListener("change", checarSenhas);
inputSenhaEl.addEventListener("change", checarSenhas);
inputEmailEl.addEventListener("change", checaEmail);

// Remove mensagens de erro dos inputs ao clicar em limpar
let btnLimparEl = document.querySelector("#cadastro > button:nth-of-type(2)");

btnLimparEl.addEventListener("click", function(){

  let spanErros = document.querySelectorAll("#cadastro .mensagemErro");

  for (const erroEl of spanErros)
    erroEl.parentElement.removeChild(erroEl);

});
