// Declaração de variáveis
let btnEditarEl = document.querySelector("#btnEditar"),
    btnConfirmarEl = document.querySelector('#btnConfirmar')
    btnCancelarEl = document.querySelector('#btnCancelar'),
    formEditaEl = document.querySelector("#editaInfoUsuario"),
    articleMostraEl = document.querySelector("#mostraInfoUsuario"),
    inputConfSenhaEl = document.querySelector("#editaInfoUsuario > form:last-of-type input[name='confSenhaUsuario']"),
    inputSenhaEl = document.querySelector("#editaInfoUsuario > form:last-of-type input[name='senhaUsuario']"),
    inputEmailEl = document.querySelector("#editaInfoUsuario > form:last-of-type input[name='emailUsuario']");

// Chama funções relacionadas a cada botão
btnEditarEl.addEventListener("click", alternaArticles);
btnCancelarEl.addEventListener("click", alternaArticles);

// Testa se os inputs são válidos ou não
inputConfSenhaEl.addEventListener("change", checarSenhas);
inputSenhaEl.addEventListener("change", checarSenhas);
inputEmailEl.addEventListener("change", checaEmail);

function alternaArticles(){
  formEditaEl.classList.toggle("ocultar");
  articleMostraEl.classList.toggle("ocultar");
  btnEditarEl.classList.toggle("ocultar");
}

function checarSenhas() {

  let senha = document.querySelector("#editaInfoUsuario > form:last-of-type input[name='senhaUsuario']").value,
      labelEl = document.querySelector("#editaInfoUsuario > form:last-of-type > label:last-of-type"),
      senhaConfirmar = inputConfSenhaEl.value;

  if(senha !== senhaConfirmar && labelEl.querySelector("span") === null) {
    btnConfirmarEl.disable = "true";
    btnConfirmarEl.classList.add("botaoDesab");
    labelEl.insertBefore(escreveMensagemErro(" (Senhas não são iguais)"), labelEl.querySelector("input"));
  }
  else if(senha === senhaConfirmar && labelEl.querySelector("span") !== null) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#editaInfoUsuario > form .mensagemErro").length === 0) {
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

// Mostra mensagem caso o email digitado não for válido
function checaEmail() {

  let emailUsuario = inputEmailEl.value;
  let labelEl = document.querySelector("#editaInfoUsuario > form:last-of-type > label:nth-child(4)");

  if(emailUsuario == "" && labelEl.contains(labelEl.querySelector("span"))) {
    labelEl.removeChild(labelEl.querySelector("span"));
    if(document.querySelectorAll("#editaInfoUsuario > form .mensagemErro").length === 0) {
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
