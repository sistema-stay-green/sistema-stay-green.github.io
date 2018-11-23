// Testa se os inputs são válidos ou não
let inputConfSenhaEl = document.querySelector("#cadastro input[name='confSenhaUsuario']"),
    inputSenhaEl = document.querySelector("#cadastro input[name='senhaUsuario']"),
    inputEmailEl = document.querySelector("#cadastro input[name='emailUsuario']"),
    inputCNPJEl = document.querySelector("#cadastro input[name='cnpjUsuario']");

inputConfSenhaEl.addEventListener("input", checarSenhas);
inputSenhaEl.addEventListener("input", checarSenhas);
inputEmailEl.addEventListener("input", checaEmail);
inputCNPJEl.addEventListener("focusout", checaCNPJ);

// Remove mensagens de erro dos inputs ao clicar em limpar
let btnLimparEl = document.querySelector("#cadastro > button:nth-of-type(2)");

btnLimparEl.addEventListener("click", function(){

  let spanErros = document.querySelectorAll("#cadastro .mensagemErro");

  for (const erroEl of spanErros)
    erroEl.parentElement.removeChild(erroEl);

});

let inputs = document.querySelectorAll("#cadastro input");

for (let inputEl of inputs) {
  inputEl.addEventListener("input", function(evt){

    let inputAlvoEl = evt.currentTarget;

    if (inputAlvoEl.value === ""){

      let labelEl = inputAlvoEl.parentElement,
          btnConfirmarEl = document.querySelector("#cadastro > button:first-of-type");

      if (labelEl.querySelector("span") === null) {
        labelEl.insertBefore(escreveMensagemErro(" (Campo obrigatório)"), labelEl.querySelector("input"));
        btnConfirmarEl.disable = "true";
        btnConfirmarEl.classList.add("botaoDesab");
      }

    }
    else {

      let labelEl = inputAlvoEl.parentElement;
      if(labelEl.querySelector("span") !== null)
        labelEl.removeChild(labelEl.querySelector("span"));

      if (document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
        btnConfirmarEl.disable = "false";
        btnConfirmarEl.classList.remove("botaoDesab");
      }

    }

  });
}

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

// Checa vetorCNPJ
function checaCNPJ() {

    let btnConfirmarEl = document.querySelector('#cadastro > button:first-of-type'),
        labelEl = document.querySelector("#cadastro > label:nth-of-type(2)"),
        cnpj = inputCNPJEl.value;

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj === ''){
      while(labelEl.querySelector("span") !== null) {
        labelEl.removeChild(labelEl.querySelector("span"));
        if(document.querySelectorAll("#cadastro .mensagemErro").length != 0) {
          btnConfirmarEl.disable = "false";
          btnConfirmarEl.classList.remove("botaoDesab");
        }
      }
      btnConfirmarEl.disable = "true";
      btnConfirmarEl.classList.add("botaoDesab");
      labelEl.insertBefore(escreveMensagemErro(" (CNPJ obrigatório)"), labelEl.querySelector("input"));
      return false;
    }

    if(cnpj.length != 14 ||
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"){
          while(labelEl.querySelector("span") !== null) {
            labelEl.removeChild(labelEl.querySelector("span"));
            if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
              btnConfirmarEl.disable = "false";
              btnConfirmarEl.classList.remove("botaoDesab");
            }
          }
          btnConfirmarEl.disable = "true";
          btnConfirmarEl.classList.add("botaoDesab");
          labelEl.insertBefore(escreveMensagemErro(" (CNPJ inválido)"), labelEl.querySelector("input"));
          return false;
        }

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)){
      while(labelEl.querySelector("span") !== null) {
        labelEl.removeChild(labelEl.querySelector("span"));
        if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
          btnConfirmarEl.disable = "false";
          btnConfirmarEl.classList.remove("botaoDesab");
        }
      }
      btnConfirmarEl.disable = "true";
      btnConfirmarEl.classList.add("botaoDesab");
      labelEl.insertBefore(escreveMensagemErro(" (CNPJ inválido)"), labelEl.querySelector("input"));
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
      while(labelEl.querySelector("span") !== null) {
        labelEl.removeChild(labelEl.querySelector("span"));
        if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
          btnConfirmarEl.disable = "false";
          btnConfirmarEl.classList.remove("botaoDesab");
        }
      }
      btnConfirmarEl.disable = "true";
      btnConfirmarEl.classList.add("botaoDesab");
      labelEl.insertBefore(escreveMensagemErro(" (CNPJ inválido)"), labelEl.querySelector("input"));
      return false;
    }

    while(labelEl.querySelector("span") !== null) {
      labelEl.removeChild(labelEl.querySelector("span"));
      if(document.querySelectorAll("#cadastro .mensagemErro").length === 0) {
        btnConfirmarEl.disable = "false";
        btnConfirmarEl.classList.remove("botaoDesab");
      }
    }

    return true;

}

// Função que escreve mensagem de errono formulário
function escreveMensagemErro(mensagem) {

  let mensagemEl = document.createElement("span");

  mensagemEl.innerHTML = mensagem;
  mensagemEl.classList.add("mensagemErro");

  return mensagemEl;

}
