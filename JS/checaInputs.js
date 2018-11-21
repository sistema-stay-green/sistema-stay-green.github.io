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

inputConfSenhaEl.addEventListener("input", checarSenhas);
inputSenhaEl.addEventListener("input", checarSenhas);
inputEmailEl.addEventListener("input", checaEmail);

// Remove mensagens de erro dos inputs ao clicar em limpar
let btnLimparEl = document.querySelector("#cadastro > button:nth-of-type(2)");

btnLimparEl.addEventListener("click", function(){

  let spanErros = document.querySelectorAll("#cadastro .mensagemErro");

  for (const erroEl of spanErros)
    erroEl.parentElement.removeChild(erroEl);

});

// Checa vetorCNPJ
function checarvetorCNPJ(cnpj){

  let v = ["", ""],
      vetorCNPJ = cnpj.split("");

  //Nota: Calcula o primeiro dígito de verificação.
  v[0] = 5*vetorCNPJ[0] + 4*vetorCNPJ[1]  + 3*vetorCNPJ[2]  + 2*vetorCNPJ[3];
  v[0] += 9*vetorCNPJ[4] + 8*vetorCNPJ[6]  + 7*vetorCNPJ[6]  + 6*vetorCNPJ[7];
  v[0] += 5*vetorCNPJ[8] + 4*vetorCNPJ[9] + 3*vetorCNPJ[10] + 2*vetorCNPJ[11];
  v[0] = 11 - (vetorCNPJ[0] % 11);
  if(v[0] >= 10) v[0] = 0;

  //Nota: Calcula o segundo dígito de verificação.
  v[1] = 6*vetorCNPJ[0] + 5*vetorCNPJ[1] + 4*vetorCNPJ[2] + 3*vetorCNPJ[3];
  v[1] += 2*vetorCNPJ[4] + 9*vetorCNPJ[5] + 8*vetorCNPJ[6] + 7*vetorCNPJ[7];
  v[1] += 6*vetorCNPJ[8] + 5*vetorCNPJ[9] + 4*vetorCNPJ[10] + 3*vetorCNPJ[11];
  v[1] += 2*vetorCNPJ[12];
  v[1] = 11 - (vetorCNPJ[1] % 11);
  if(v[1] >= 10) v[1] = 0;

  console.log(v[0]);
  console.log(v[1]);

  //Nota: Verdadeiro se os dígitos de verificação são os esperados.
  console.log((v[0] === vetorCNPJ[12]) && (v[1] === vetorCNPJ[13]));
  return ((v[0] === vetorCNPJ[12]) && (v[1] === vetorCNPJ[13]));

}

checarvetorCNPJ("19764353000196");
