// Declaração de variáveis
let btnEditarEl = document.querySelector("#btnEditar"),
    btnConfirmarEl = document.querySelector('#btnConfirmar')
    btnCancelarEl = document.querySelector('#btnCancelar'),
    formEditaEl = document.querySelector("#infoUsuario > article:nth-child(2)"),
    articleMostraEl = document.querySelector("#mostraInfoUsuario");

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

// Chama funções relacionadas a cada botão
btnEditarEl.addEventListener("click", alternaArticles);
btnCancelarEl.addEventListener("click", alternaArticles);

function alternaArticles(){
  formEditaEl.classList.toggle("ocultar");
  articleMostraEl.classList.toggle("ocultar");
  btnEditarEl.classList.toggle("ocultar");
}

// Função que escreve mensagem de errono formulário
function escreveMensagemErro(mensagem) {

  let mensagemEl = document.createElement("span");

  mensagemEl.innerHTML = mensagem;
  mensagemEl.classList.add("mensagemErro");

  return mensagemEl;

}
