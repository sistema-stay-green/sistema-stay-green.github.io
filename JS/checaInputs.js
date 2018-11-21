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

/*function checarCNPJ(cnpj = []){
  
  var v: int[2]
  //Nota: Calcula o primeiro dígito de verificação.
  v[1] := 5×cnpj[1] + 4×cnpj[2]  + 3×cnpj[3]  + 2×cnpj[4]
  v[1] += 9×cnpj[5] + 8×cnpj[6]  + 7×cnpj[7]  + 6×cnpj[8]
  v[1] += 5×cnpj[9] + 4×cnpj[10] + 3×cnpj[11] + 2×cnpj[12]
  v[1] := 11 - v[1] mod 11
  v[1] := 0 if v[1] ≥ 10
  
  //Nota: Calcula o segundo dígito de verificação.
  v[2] := 6×cnpj[1] + 5×cnpj[2]  + 4×cnpj[3]  + 3×cnpj[4]
  v[2] += 2×cnpj[5] + 9×cnpj[6]  + 8×cnpj[7]  + 7×cnpj[8]
  v[2] += 6×cnpj[9] + 5×cnpj[10] + 4×cnpj[11] + 3×cnpj[12]
  v[2] += 2×cnpj[13]
  v[2] := 11 - v[2] mod 11
  v[2] := 0 if v[2] ≥ 10
  
  //Nota: Verdadeiro se os dígitos de verificação são os esperados.
  return v[1] = cnpj[13] and v[2] = cnpj[14]


}*/
